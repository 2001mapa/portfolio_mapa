/** Public media lives in Cloudflare R2, outside the application deployment. */
const MEDIA_ORIGIN = "https://pub-ebb42d438e4f4650bd6064011ef8c638.r2.dev";

export function videoUrl(fileName: string) {
  return `${MEDIA_ORIGIN}/${encodeURIComponent(fileName)}`;
}
