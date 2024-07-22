import { HttpResponse, LoginData, LoginRes, getUserInfo, login as userLogin, logout as userLogout } from '@/api/user'
import { clearToken, getToken, setToken } from '@/utils/auth'
import { removeRouteListener } from '@/utils/route-listener'
import { defineStore } from 'pinia'
import useAppStore from '../app'
import { UserState } from './types'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    uid: undefined,
    nickName: undefined,
    avatar: undefined,
    gender: undefined,
    birthday: undefined,
    signature: undefined,
    mobile: undefined,
    email: undefined,
    createTime: undefined,
    role: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user'
        resolve(this.role)
      })
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },

    // Reset user's information
    resetInfo() {
      this.$reset()
    },

    // Get user's information
    async info() {
      const token = getToken()
      const res = await getUserInfo({token: token! })
      this.setInfo(res.data)
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res: HttpResponse<LoginRes> = await userLogin(loginForm)
        /* eslint-disable no-console */
        if (!res || res.flag === false) {
          const errorMsg = res.msg
          throw new Error(errorMsg)
        }
        setToken(res.data.token)
      } catch (err) {
        clearToken()
        throw err // 重新抛出错误以便在调用处捕获
      }
    },
    logoutCallBack() {
      const appStore = useAppStore()
      this.resetInfo()
      clearToken()
      removeRouteListener()
      appStore.clearServerMenu()
    },
    // Logout
    async logout() {
      try {
        await userLogout()
      } finally {
        this.logoutCallBack()
      }
    },
  },
})

export default useUserStore
