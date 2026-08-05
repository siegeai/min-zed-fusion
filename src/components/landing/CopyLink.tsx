import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

/** The demo capsule's canonical URL, used everywhere the link appears. */
export const CAPSULE_URL = "https://getmin.ai/c/jordan-lee";
export const CAPSULE_PATH = "/c/jordan-lee";

/**
 * A working "Copy link" affordance for the demo capsule. Copies the real URL
 * and confirms with a brief "Copied". Styling is passed in so it can sit in
 * the hero strip, the share dialog, and the full-page demo alike.
 */
export function CopyLink({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CAPSULE_URL);
    } catch {
      // Clipboard can be unavailable (permissions, old browsers); the
      // confirmation still teaches what the button does.
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex shrink-0 items-center gap-1 font-medium text-emerald-700 transition-colors hover:text-emerald-800 ${className}`}
    >
      {copied && <Check className="h-3 w-3" strokeWidth={2.5} />}
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
