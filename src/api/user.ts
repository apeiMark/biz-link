import { UserState } from '@/store/modules/user/types'
import { getToken } from '@/utils/auth'
import axios from 'axios'
import type { RouteRecordNormalized } from 'vue-router'
import { USER_SERVER_BASE_URL } from './baseUrl'

const baseUrl = USER_SERVER_BASE_URL

export interface LoginData {
  identityType: number
  identifier: string
  certificate: string
}

export interface HttpResponse<T = unknown> {
  flag: boolean
  msg: string
  code: number
  data: T
}

export interface RegisterData {
  identityType: number
  identifier: string
  certificate: string
}

export interface LoginRes {
  token: string
}

export interface RegisterRes {
  uid: string
}

export interface InfoRes {
  token: string
}
export function login(data: LoginData): Promise<HttpResponse<LoginRes>> {
  return axios.post(`${baseUrl}/login`, data)
}

export function register(data: RegisterData): Promise<HttpResponse<RegisterRes>> {
  return axios.post(`${baseUrl}/register`, data)
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout')
}

export function getUserInfo(data:InfoRes) {
  return axios.post<UserState>(`${baseUrl}/info`,data, {
    headers: {
      Authorization: getToken(), // 设置授权头
      // 添加其他需要的请求头
    },
  })
}

export function editUserInfo(data:UserState) {
  return axios.post<UserState>(`${baseUrl}/edit`,data, {
    headers: {
      Authorization: getToken(), // 设置授权头
      // 添加其他需要的请求头
    },
  })
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu')
}
