export function buildFormat(format: null, tokens: any): string {
  return `${tokens.remoteAddr} - ${tokens.remoteUser} [${tokens.date}] "${tokens.method} ${tokens.status} ${tokens.url} ${tokens.protocol}/${tokens.httpVersion}" "${tokens.responseTime} ${tokens.contentLength}" - "${tokens.referrer} ${tokens.userAgent}"`
}
