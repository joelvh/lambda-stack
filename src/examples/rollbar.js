import createErrorHandler from 'lambda-rollbar'

const { ROLLBAR_ACCESS_TOKEN, ROLLBAR_ENV } = process.env

export function withErrorHandling(handler) {
  const errorHandler = createErrorHandler({
    accessToken: ROLLBAR_ACCESS_TOKEN,
    environment: ROLLBAR_ENV,
    enabled: true,
    verbose: true,
    captureUncaught: true,
    captureUnhandledRejections: true
    // template: 'aws-sls-lambda-proxy'
  })

  return errorHandler.wrap(handler)
}

export default withErrorHandling(async (_event, _context) => {
  throw new Error('Rollbar will handle this error.')
})
