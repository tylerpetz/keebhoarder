/**
 * Create an a query string from an object
 * @param {Object} params
 * @returns {string}
 */
export const queryStringify = (params) =>
  Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&')

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

export const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}
