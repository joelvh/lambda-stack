# lambda-stack

AWS Lambda toolkit for JavaScript and Node.js

## Features

* Middlewares - uses [middy](https://middy.js.org)
  * [serverless-offline](./middlewares/serverless-offline.js) middleware - replaces "offline" event values with local development (e.g. localhost) values for more accurate testing
  * [nestedQueryStringParameters](./middlewares/nestedQueryStringParameters.js) middleware - combines single- and multi-value query string parameters into nested objects (similar to Rails) using [`qs`](https://github.com/ljharb/qs)
* Error Handling
  * [Rollbar](./examples/rollbar.js) error handler - handler wrapper to capture errors
* Routing - uses [custom-router](https://github.com/joelvh/custom-router) for path matching and more
