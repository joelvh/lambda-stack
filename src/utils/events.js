export function eventToBaseUrl ({ headers, requestContext: { domainName, path, resourcePath, resourceId } }) {
  const protocol = headers['X-Forwarded-Proto'] || 'https'
  const port = headers['X-Forwarded-Port']
  const segments = [protocol, '://', domainName]

  if (!['80', '443'].includes(port)) {
    segments.push(':', port)
  }

  const prefix = path.substr(0, path.length - resourcePath.length)

  if (prefix && resourceId !== 'offlineContext_resourceId') {
    segments.push(prefix)
  }

  return segments.join('')
}
