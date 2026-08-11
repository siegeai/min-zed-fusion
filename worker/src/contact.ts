/**
 * Hand-off to a human, for the questions the bot cannot answer.
 *
 * Two endpoints. POST /draft turns the conversation so far into a subject and
 * body the visitor can edit. POST /contact delivers it.
 *
 * Delivery is optional by design. With no credentials configured, /contact
 * answers 501 and the client falls back to opening a prefilled mailto, so the
 * feature works the day it ships and starts sending the moment secrets are
 * added, with no code change. That kept a marketing-site Worker from having to
 * hold credentials just to exist.
 */
import type Anthropic from "@anthropic-ai/sdk";
import { AwsClient } from "aws4fetch";

export const CONTACT_TO = "hello@getmin.ai";

const DRAFT_TOOL = {
  name: "write_email",
  description: "Write the visitor's question up as an email to the min. team.",
  input_schema: {
    type: "object" as const,
    properties: {
      subject: { type: "string", description: "Under 60 characters, specific, no greeting" },
      body: {
        type: "string",
        description:
          "The email itself, first person as the visitor, 2 to 4 short sentences, no signature and no greeting line",
      },
    },
    required: ["subject", "body"],
  },
};

const DRAFT_PROMPT = `You turn a visitor's conversation with min.'s site assistant into a short email to the min. team.

Write as the visitor, in their voice, first person. Your job is to state their question clearly enough that a person can answer it in one reply.

- Two to four short sentences. No greeting, no sign off, no name.
- Lead with the actual question. If they gave context about their work, keep the one line of it that helps the team answer, and drop everything else.
- Use their own words where you can. Do not make them sound like a press release, and do not add enthusiasm they did not have.
- Never invent details about them, their company, their team size, or their timeline.
- No em dashes, no en dashes, no exclamation marks, no emoji, no markdown.
- If several questions went unanswered, cover the most recent one and mention the others in a final clause.

Call write_email once. No prose.`;

export type Draft = { subject: string; body: string };

export async function draftEmail(
  client: Anthropic,
  messages: { role: "user" | "assistant"; content: string }[],
): Promise<Draft | null> {
  const transcript = messages
    .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
    .join("\n\n");

  const res = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 400,
    system: [{ type: "text", text: DRAFT_PROMPT, cache_control: { type: "ephemeral" } }],
    tools: [DRAFT_TOOL],
    tool_choice: { type: "tool", name: DRAFT_TOOL.name },
    messages: [{ role: "user", content: `The conversation:\n\n${transcript}` }],
  });

  const block = res.content.find((b) => b.type === "tool_use");
  if (!block || block.type !== "tool_use") return null;
  const { subject, body } = (block.input ?? {}) as Record<string, unknown>;
  if (typeof subject !== "string" || typeof body !== "string") return null;
  if (!subject.trim() || !body.trim() || subject.length > 200 || body.length > 2_000) return null;

  const fix = (s: string) => s.replace(/\s*[—–]\s*/g, ", ").trim();
  return { subject: fix(subject), body: fix(body) };
}

/** Deliberately permissive: rejecting a real address is worse than accepting a junk one. */
export function looksLikeEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/.test(v) && v.length <= 254;
}

export type SendResult = { ok: true } | { ok: false; status: number; error: string };

export type MailEnv = {
  AWS_ACCESS_KEY_ID?: string;
  AWS_SECRET_ACCESS_KEY?: string;
  AWS_REGION?: string;
  CONTACT_FROM?: string;
};

/**
 * Sends through Amazon SES v2, signed with SigV4.
 *
 * Workers have no AWS SDK and no Node crypto, so aws4fetch does the signing
 * against WebCrypto. It is a few kB and does nothing else, which is the whole
 * reason it is here rather than the SDK.
 *
 * Returns 501 when no credentials are configured, which the client reads as
 * "open their mail client instead". That is what lets this Worker be useful
 * while holding no credentials at all.
 */
export async function sendContactEmail(
  env: MailEnv,
  msg: { email: string; subject: string; body: string },
): Promise<SendResult> {
  const { AWS_ACCESS_KEY_ID: keyId, AWS_SECRET_ACCESS_KEY: secret } = env;
  // Names only, never values. "not_configured" with nothing else is a dead end
  // when three of four secrets are set and the fourth silently is not.
  if (!keyId || !secret || !env.CONTACT_FROM) {
    const missing = (
      [
        ["AWS_ACCESS_KEY_ID", keyId],
        ["AWS_SECRET_ACCESS_KEY", secret],
        ["CONTACT_FROM", env.CONTACT_FROM],
      ] as const
    )
      .filter(([, v]) => !v)
      .map(([k]) => k)
      .join(", ");
    console.error("ses not configured, missing:", missing);
    return { ok: false, status: 501, error: `not_configured: ${missing}` };
  }

  const region = env.AWS_REGION ?? "us-east-1";
  const aws = new AwsClient({
    accessKeyId: keyId,
    secretAccessKey: secret,
    region,
    // SES v2 still signs under the "ses" service name, not "sesv2".
    service: "ses",
  });

  const res = await aws.fetch(
    `https://email.${region}.amazonaws.com/v2/email/outbound-emails`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        FromEmailAddress: env.CONTACT_FROM,
        Destination: { ToAddresses: [CONTACT_TO] },
        // Answering is one click from the inbox rather than a copy and paste.
        ReplyToAddresses: [msg.email],
        Content: {
          Simple: {
            Subject: { Data: msg.subject, Charset: "UTF-8" },
            Body: {
              Text: {
                // Marked as bot-originated so nobody mistakes it for a direct
                // email, with the sender stated rather than only in ReplyTo.
                Data: `${msg.body}\n\n----\nSent from the Ask min. widget on getmin.ai\nReply to: ${msg.email}`,
                Charset: "UTF-8",
              },
            },
          },
        },
      }),
    },
  );

  if (!res.ok) {
    // SES failures are almost always configuration rather than transient: an
    // unverified FromEmailAddress, or a sandboxed account that may only send to
    // verified recipients. Log the body, it names which.
    const detail = await res.text().catch(() => "");
    console.error("ses failed:", res.status, detail);
    return { ok: false, status: 502, error: "send_failed" };
  }
  return { ok: true };
}
