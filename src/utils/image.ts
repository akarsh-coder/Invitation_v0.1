export function resolvePhoto(customUrl: string | undefined, dummyUrl: string): string {
  if (customUrl && customUrl.trim().length > 0) {
    return customUrl;
  }
  return dummyUrl;
}
