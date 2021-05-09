/**
 * Create an a query string from an object
 * @param {Object} params
 * @returns {string}
 */
export const queryStringify = params => Object.keys(params).map(key => key + '=' + params[key]).join('&')

/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
export const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key]
    }
    return obj
  }, {})
}

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
