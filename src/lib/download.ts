/**
 * OS-aware desktop download link. Installers are published out-of-band to the
 * webapp bucket (see coolmail_frontend apps/desktop/scripts/release.sh); the
 * stable filenames below never change between releases.
 *
 * macOS is Apple Silicon only and there is no Linux build (Recall Desktop SDK
 * ships mac-arm64 and windows-x64 binaries), so phones, Linux, and anything
 * unrecognized fall back to the web app.
 */

const MAC_URL = "https://app.getmin.ai/download/min-mac-arm64.dmg";
const WIN_URL = "https://app.getmin.ai/download/min-windows-x64.zip";
const WEB_URL = "https://app.getmin.ai";

export function getDownloadUrl(): string {
  if (typeof navigator === "undefined") return WEB_URL;
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return WEB_URL;
  if (/Mac/i.test(ua)) return MAC_URL;
  if (/Win/i.test(ua)) return WIN_URL;
  return WEB_URL;
}
