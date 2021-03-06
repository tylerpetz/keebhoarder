/**
 * Create an a query string from an object
 * @param {Object} params
 * @returns {string}
 */
export const queryStringify = params => Object.keys(params).map(key => key + '=' + params[key]).join('&')

/**
 * Remove empty object properties recursively
 * @param {Object} object
 * @returns {Object}
 */
export const removeEmpty = (obj) => {
  let isAllUndefined = true

  for (const k in obj) {
    if (typeof obj[k] === 'object') {
      obj[k] = removeEmpty(obj[k])
    }
    if (typeof obj[k] !== 'undefined' && obj[k] !== '') { isAllUndefined = false }
  }

  if (isAllUndefined) { obj = undefined }
  return obj
}
