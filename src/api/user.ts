import { UserState } from '@/store/modules/user/types'
import axios from 'axios'
import type { RouteRecordNormalized } from 'vue-router'

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

export interface LoginRes {
  token: string
}
export function login(data: LoginData): Promise<HttpResponse<LoginRes>> {
  return axios.post('/api/login', data)
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout')
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info')
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu')
}
