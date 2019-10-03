import customRouter from 'custom-router'
import createEventParser from './routing/eventParser'
import { withDefaultMiddleware } from './middlewares'

// pass function that receives a router configuration
export function createRouteHandler (configure) {
  const eventParser = createEventParser({ queryString: 'nestedQueryStringParameters' })
  const router = customRouter(eventParser)

  configure(router)

  return withDefaultMiddleware(router.handle)
}
