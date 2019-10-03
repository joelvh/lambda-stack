import qs from 'qs'

export default function () {
  return {
    before ({ event }, next) {
      const query = Object.entries(event.multiValueQueryStringParameters)
        .reduce((unwrapped, [key, value]) => {
          unwrapped[key] = Array.isArray(value) && value.length > 1 ? value : value[0]
          return unwrapped
        }, {})
  
      // stringify-then-parse only leaves multi-values as arrays
      event.nestedQueryStringParameters = qs.parse(qs.stringify(query))
  
      return next()
    }
  }
}
