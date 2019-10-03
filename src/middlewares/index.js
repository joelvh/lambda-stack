import middy from 'middy'
import {
  doNotWaitForEmptyEventLoop,
  httpHeaderNormalizer,
  httpEventNormalizer,
  jsonBodyParser,
  httpMultipartBodyParser,
  urlEncodeBodyParser
} from 'middy/middlewares'
import serverlessOffline from './serverless-offline'
import nestedQueryStringParameters from './nestedQueryStringParameters'

export function withDefaultMiddleware (handler) {
  return middy(handler)
    .use(serverlessOffline())
    .use(doNotWaitForEmptyEventLoop())
    .use(httpHeaderNormalizer())
    .use(httpEventNormalizer())
    .use(nestedQueryStringParameters())
    .use(jsonBodyParser())
    .use(httpMultipartBodyParser())
    .use(urlEncodeBodyParser({ extended: true }))
}
