export const thenLogger = caption => (
  (...args) => {
    console.log(`[${caption}: OK]`, ...args)
    return Promise.resolve(...args)
  }
)

export const catchLogger = caption => (
  (...args) => {
    console.log(`[${caption}: ERR]`, ...args)
    return Promise.reject(...args)
  }
)

export const promiseLogger = (caption, promise) => (
  promise.then(thenLogger(caption)).catch(catchLogger(caption))
)
