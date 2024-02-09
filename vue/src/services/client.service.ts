import axios, { AxiosError } from 'axios'

export type ClientError = AxiosError

export const client = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_ENDPOINT}`,
  timeout: 10000,
})
export default client
