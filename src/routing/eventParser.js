export default function (event, _context) {
  const {
    path,
    headers,
    httpMethod: method,
    multiValueQueryStringParameters: query,
    requestContext: {
      // NOTE: Lambda event paths are templates, not request paths:
      // { path: '/dev/connect/{proxy*}', resourcePath: '/connect/{proxy*}' }
      domainName: domain, path: templatePath, resourcePath
    }
  } = event

  const pathPrefix = templatePath.substr(0, templatePath.length - resourcePath.length)

  return {
    method,
    path,
    pathPrefix,
    originalPath: `${pathPrefix}${path}`,
    query,
    headers,
    domain
  }
}
