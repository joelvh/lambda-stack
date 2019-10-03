import customRouter from 'custom-router'
import eventParser from './routing/eventParser'
import { withDefaultMiddleware } from './middlewares'

// pass function that receives a router configuration
export function createRouteHandler (configure) {
  const router = customRouter(eventParser)

  configure(router)

  return withDefaultMiddleware(router.handle)
}
