import axios from 'axios';

const $host = axios.create({
  baseURL: 'http://178.154.222.147:8000'
})

const $authHost = axios.create({
  baseURL: 'http://178.154.222.147:8000'
})

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
  $host,
  $authHost
}