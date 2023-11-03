import axios, { type AxiosInstance } from 'axios'

export const getApi: () => Promise<AxiosInstance> = async () => {
  const api = axios.create()

  api.interceptors.request.use(
    (config) => {
      config.headers['X-Riot-Token'] = 'RGAPI-7d8836ef-4857-4d95-b920-24ece503587f'

      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )

  return api
}
