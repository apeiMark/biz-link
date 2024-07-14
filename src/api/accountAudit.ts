import { getToken } from '@/utils/auth'
import axios from 'axios'
import { USER_SERVER_BASE_URL } from './baseUrl'

const baseUrl = USER_SERVER_BASE_URL

export interface UserAuth {
  id: number
  uid: string
  identityType: number
  identifier: string
  status: number
  createTime: string
}

export interface UserAuthParams extends Partial<UserAuth> {
  current: number
  pageSize: number
}

export interface UserAuthListRes {
  list: UserAuth[]
  total: number
}

export interface HttpResponse<T = unknown> {
  flag: boolean
  msg: string
  code: number
  data: T
}

export function AuditAccountPageList(params: UserAuthParams) {
  return axios.post<UserAuthListRes>(`${baseUrl}/audit/account`, params, {
    headers: {
      Authorization: getToken(), // 设置授权头
      // 添加其他需要的请求头
    },
  })
}

export function AcceptAudit({ uid }: { uid: string }): Promise<HttpResponse<string>> {
  return axios.get(`${baseUrl}/audit/acceptAccount`, {
    params: { uid }, // 参数简写形式
    headers: {
      Authorization: getToken(), // 设置授权头
      // 添加其他需要的请求头
    },
  })
}

export function RejectAudit({ uid }: { uid: string }): Promise<HttpResponse<string>> {
  return axios.get(`${baseUrl}/audit/rejectAccount`, {
    params: { uid }, // 参数简写形式
    headers: {
      Authorization: getToken(), // 设置授权头
      // 添加其他需要的请求头
    },
  })
}
