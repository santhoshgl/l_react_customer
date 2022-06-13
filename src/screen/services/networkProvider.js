import Config from "react-native-config"
import axios from 'axios'
import qs from 'qs'
import authRefreshInterceptor from 'axios-auth-refresh'
import auth from '@react-native-firebase/auth';

const contentType = {
  json: 'application/json',
  form: 'multipart/form-data'
}

const axiosInstance = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Accept': contentType.json,
    'Content-Type': contentType.json
  },
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  },
  transformResponse: [
    apiResponse => {
      if (apiResponse) {
        const { data, meta, links } = JSON.parse(apiResponse)
        if (data) {
          if (meta || links) {
            return { data, meta, links }
          }
          return { data }
        } else return JSON.parse(apiResponse)
      }
      return apiResponse
    }
  ]
})

axiosInstance.interceptors.request.use(async config => {
  const token = await auth().currentUser?.getIdToken?.()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const refreshToken = failedRequest => {
  return auth().currentUser?.getIdToken?.(true).then(token => {
    failedRequest.response.config.headers['Authorization'] = `Bearer ${token}`
    return Promise.resolve()
  }).catch(error => {
    if (error) throw error
    return Promise.reject()
  })
}

authRefreshInterceptor(axiosInstance, refreshToken)

export const formRequest = {
  post: (url, data) =>
    axiosInstance.post(url, data, { 'Content-Type': contentType.form }),
  put: (url, data) =>
    axiosInstance.put(url, data, { 'Content-Type': contentType.form })
}

const request = {
  get: async (url, params) => axiosInstance.get(url, { params }),
  post: async (url, body) => { return await axiosInstance.post(url, body) },
  put: (url, body) => axiosInstance.put(url, body),
  patch: (url, body) => axiosInstance.patch(url, body),
  del: url => axiosInstance.delete(url),
  delWithData: (url, data) => axiosInstance.delete(url, { data })
}

export default request
