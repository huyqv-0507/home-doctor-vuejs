import axios from 'axios'
import { getToken } from './cookie'

// const baseDomain = "https://homedoctorfpt.com"

const baseDomain = 'http://45.76.186.233:8000'
const versionAPI = 'v1'

const baseUrl = `${baseDomain}/api/${versionAPI}`
const requestTimeout = 20000
const headers = ''

const request = axios.create({
  baseURL: baseUrl,
  headers: headers,
  timeout: requestTimeout
})

request.interceptors.request.use(function (config) {
// Do something before request is sent
  const token = getToken('hdr-key')
  if (token != null) {
    // config.headers.Authorization = 'Bearer' + token
  }
  console.log(`token: ${token}`)
  return config
}, function (error) {
// Do something with request error
  console.log(`error at request: ${error}`)
  return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
  // Do something with response data
  const status = response.status
  console.log(`status: ${status}`)
  return response
}, function (error) {
  // Do something with response error
  console.log(`error at response: ${error}`)
  return Promise.reject(error)
})

export default request
