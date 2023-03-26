import { defineStore } from 'pinia'
import { getToken, getUser, getUserAuthToken, removeToken, setToken, setUser} from './helper'
import { store } from '@/store'
import { fetchSession } from '@/api'

interface SessionResponse {
  auth: boolean
  model: 'ChatGPTAPI' | 'ChatGPTUnofficialProxyAPI'
}

export interface AuthState {
  token: string | undefined
  user: string | undefined
  userToken: string | undefined
  session: SessionResponse | null
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    token: getToken(),
    user: getUser(),
    userToken: getUserAuthToken(),
    session: null,
  }),

  getters: {
    isChatGPTAPI(state): boolean {
      return state.session?.model === 'ChatGPTAPI'
    },
  },

  actions: {
    async getSession() {
      try {
        const { data } = await fetchSession<SessionResponse>()
        this.session = { ...data }
        return Promise.resolve(data)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    setUser(username: string, password: string) {
      setUser(username, password)
      setToken(password)
      this.user = username
      this.userToken = getUserAuthToken()
    },

    setToken(token: string) {
      this.token = token
      setToken(token)
    },

    removeToken() {
      this.token = undefined
      removeToken()
    },

    removeUser() {
      this.user = undefined
      this.token = undefined
    },
  },
})

export function useAuthStoreWithout() {
  return useAuthStore(store)
}
