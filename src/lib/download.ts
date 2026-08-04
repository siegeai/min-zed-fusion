/**
 * OS-aware desktop download link. Installers are published out-of-band to the
 * webapp bucket (see coolmail_frontend apps/desktop/scripts/release.sh); the
 * stable filenames below never change between releases.
 *
 * macOS is Apple Silicon only and there is no Linux build (Recall Desktop SDK
 * ships mac-arm64 and windows-x64 binaries), so phones, Linux, and anything
 * unrecognized fall back to the web app, with a label to match.
 */

const MAC_URL = "https://app.getmin.ai/download/min-mac-arm64.dmg";
const WIN_URL = "https://app.getmin.ai/download/min-windows-x64.zip";
const WEB_URL = "https://app.getmin.ai";

export type DownloadTarget = { href: string; label: string };

export function getDownloadTarget(): DownloadTarget {
  if (typeof navigator !== "undefined") {
    const ua = navigator.userAgent;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
    if (!isMobile && /Mac/i.test(ua)) {
      return { href: MAC_URL, label: "Download for macOS" };
    }
    if (!isMobile && /Win/i.test(ua)) {
      return { href: WIN_URL, label: "Download for Windows" };
    }
  }
  return { href: WEB_URL, label: "Open the web app" };
}
