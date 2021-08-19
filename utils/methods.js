/**
 * Create an a query string from an object
 * @param {Object} params
 * @returns {string}
 */
export const queryStringify = (params) =>
  Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&')

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
    if (typeof obj[k] !== 'undefined' && obj[k] !== '') {
      isAllUndefined = false
    }
  }

  if (isAllUndefined) {
    obj = undefined
  }
  return obj
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const cleanTableObject = (obj) => {
  const newObj = Object.assign({}, obj)

  Array.from([
    'user',
    'id',
    'vgt_id',
    'originalIndex',
    'createdAt',
    'updatedAt',
  ]).forEach((type) => {
    delete newObj[type]
  })

  return newObj
}
