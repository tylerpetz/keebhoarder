import Client from './index'
const resource = '/auth'

export const register = (requestBody) => Client.post(`${resource}/register`, requestBody)
