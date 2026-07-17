import { useState } from "react";
import { ChevronDown, Video, Mail } from "lucide-react";

/**
 * Click-to-expand row for capsule items (insights, action items, history),
 * mirroring the product: every AI-generated line opens into its underlying
 * context, the source interaction and the fuller story behind the summary.
 * Pure CSS grid-rows height animation; respects reduced motion.
 */

export type Detail = {
  kind: "call" | "email";
  source: string; // "Call · Jun 8"
  body: string;
};

export function ExpandableRow({
  leading,
  children,
  detail,
  className = "",
}: {
  leading: React.ReactNode;
  children: React.ReactNode;
  detail: Detail;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const SourceIcon = detail.kind === "call" ? Video : Mail;

  return (
    <li className={className}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group -mx-1.5 flex w-full items-start gap-2 rounded-lg px-1.5 py-1.5 text-left transition-colors hover:bg-gray-50 sm:py-1"
      >
        {leading}
        <span className="min-w-0 flex-1">{children}</span>
        <ChevronDown
          className={[
            "mt-[5px] h-3.5 w-3.5 shrink-0 text-gray-300 transition-transform duration-200 group-hover:text-gray-400",
            open ? "rotate-180" : "",
          ].join(" ")}
          strokeWidth={2}
        />
      </button>
      <div
        className={[
          "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div className="mb-1 ml-5 mt-1 rounded-lg border border-gray-100 bg-gray-50/80 px-3 py-2">
            <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-gray-400">
              <SourceIcon className="h-3 w-3" strokeWidth={2} />
              {detail.source}
            </span>
            <p className="mt-1 text-[12.5px] leading-relaxed text-gray-600">{detail.body}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
