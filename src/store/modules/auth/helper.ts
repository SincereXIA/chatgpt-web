import { ss } from '@/utils/storage'

const LOCAL_NAME = 'SECRET_TOKEN'
const LOCAL_USER_NAME = 'USER_NAME'
const LOCAL_USER_PASSWORD = 'USER_PASSWORD'

export function getToken() {
  const token = getUserAuthToken()
  if (token)
    return token
  return ss.get(LOCAL_NAME)
}

export function setToken(token: string) {
  return ss.set(LOCAL_NAME, token)
}

export function removeToken() {
  return ss.remove(LOCAL_NAME)
}

export function setUser(userName: string, password: string) {
  ss.set(LOCAL_USER_NAME, userName)
  ss.set(LOCAL_USER_PASSWORD, password)
}

export function getUser() {
  return ss.get(LOCAL_USER_NAME)
}

export function getUserAuthToken() {
  // username:password
  const userName = ss.get(LOCAL_USER_NAME)
  const password = ss.get(LOCAL_USER_PASSWORD)
  if (!userName || !password) {
    console.log('no user')
    return undefined
  }
  const raw = `${userName}:${password}`
  // base64 encode
  return btoa(raw)
}
