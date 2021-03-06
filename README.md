# lambda-stack

AWS Lambda toolkit for JavaScript and Node.js

## Install

```bash
yarn add lambda-stack
```

### Publish

This package is published by first converting to ES5 modules in a `dist` folder. The `package.json` is copied to `dist` folder and published from there to allow importing modules from `lambda-stack/middlewares` instead of `lambda-stack/dist/middlewares`.

```bash
yarn dist && npm publish dist
```

## Features

* Middlewares - uses [middy](https://middy.js.org)
  * [serverless-offline](./src/middlewares/serverless-offline.js) middleware - replaces "offline" event values with local development (e.g. localhost) values for more accurate testing
  * [nestedQueryStringParameters](./src/middlewares/nestedQueryStringParameters.js) middleware - combines single- and multi-value query string parameters into a nested object as necessary (similar to Rails) using [`qs`](https://github.com/ljharb/qs) - accessible as `event.nestedQueryStringParameters`
* Routing - uses [custom-router](https://github.com/joelvh/custom-router) for path matching and more

## Usage

Use the default [middy](https://middy.js.org) middleware we've setup, along with:

* [serverless-offline](./src/middlewares/serverless-offline.js)
* [nestedQueryStringParameters](./src/middlewares/nestedQueryStringParameters.js)

```es6
import { withDefaultMiddleware } from 'lambda-stack/middlewares'

export default withDefaultMiddleware(async (event, context) => {
  // do something
})
```

### Router

You can match paths to different handlers. Using the [Serverless Framework](https://serverless.com), your `serverless.yml` might have a wildcard path configured like this.

```yaml
functions:
  integrationsConnect:
    handler: handlers.default
    events:
      - http:
          path: connect/{path+}
          method: any
```

You would then define a single handler function which will invoke different responses based on matching the request path. This handler would be in `handlers.js` as the `default` export, based on the `serverless.yml` above.

```es6
import { createRouteHandler } from 'lambda-stack'

// Returns a Lambda handler, which matches the request path and invokes the proper response.
// Uses the default middleware.
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
    // response handler
    async (_event, _context) => ({
      status: 200,
      body: 'Called back'
    })
  )

  // default response
  router.unknown(async (_event, _context) => ({
    status: 404,
    body: 'Not Found'
  }))
})
```

See [custom-router](https://github.com/joelvh/custom-router) for more router options.
