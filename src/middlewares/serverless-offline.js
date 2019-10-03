const X_FORWARDED_PORT = 'X-Forwarded-Port'

const PATCHES = [{
  // patch domain and port
  match ({ requestContext: { domainName } }) {
    return domainName === 'offlineContext_domainName'
  },
  patch ({ headers, multiValueHeaders }) {
    const [ domainName, port = '80' ] = headers.Host.split(':')

    requestContext.domainName = domainName
    headers[X_FORWARDED_PORT] = port
    multiValueHeaders[X_FORWARDED_PORT] = [port]
  }
}]

// Patch serverless-offline
export default function () {
  return {
    before ({ event }, next) {
      PATCHES.filter(({ match }) => match(event)).map(async ({ patch }) => patch(event))
      return next()
    }
  }
}
