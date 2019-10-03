import { createRouteHandler } from '../src/index'

export default createRouteHandler(router => {
  // specify the request method
  router.post(
    // path pattern
    '/connect/:integration/callback',
    // path parameter constraints
    {
      constraints: {
        integration: ['shop', 'gateway']
      }
    },
    // handler
    async (_event, _context) => ({
      status: 200,
      body: 'Called back'
    })
  )
})
