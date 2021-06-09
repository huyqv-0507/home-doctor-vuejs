import axios from 'axios'
import { getToken } from './cookie'

// const baseDomain = "https://homedoctorfpt.com"

const baseDomain = 'http://45.76.186.233:8000'
const versionAPI = 'v1'

const baseUrl = `${baseDomain}/api/${versionAPI}`
const requestTimeout = 20000

const request = axios.create({
  baseURL: baseUrl,
  timeout: requestTimeout
})

request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const hdrKey = getToken('hdr-key')
  const fbKey = getToken('firebase-key')
  if (hdrKey != null) {
    config.headers.Authorization = 'Bearer ' + hdrKey
  }
  if (fbKey != null) {
    // config.headers.Authorization = 'Bearer' + token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  let { message } = error
  if (message === 'Network Error') {
    message = 'Vui lòng kiểm tra kết nối mạng.'
  } else if (message.includes('timeout')) {
    message = 'Quá thời gian tải trang.'
  } else if (message.includes('404')) {
    message = null
  } else if (message.includes('5')) {
    message = 'Không thể tải dữ liệu.'
  } else if (message !== null) {
    console.log('API error: ', message)
  }
  return Promise.reject(error)
})

export default request
