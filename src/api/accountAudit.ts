import { getToken } from '@/utils/auth'
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface'
import axios from 'axios'

export interface PolicyRecord {
  id: string
  number: number
  name: string
  contentType: 'img' | 'horizontalVideo' | 'verticalVideo'
  filterType: 'artificial' | 'rules'
  count: number
  status: 'online' | 'offline'
  createdTime: string
}

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

export interface PolicyParams extends Partial<PolicyRecord> {
  current: number
  pageSize: number
}

export interface PolicyListRes {
  list: PolicyRecord[]
  total: number
}

export interface HttpResponse<T = unknown> {
  flag: boolean
  msg: string
  code: number
  data: T
}

export function AuditAccountPageList(params: UserAuthParams) {
  return axios.post<UserAuthListRes>('/api/audit/account', params, {
    headers: {
      Authorization: getToken(), // 设置授权头
      // 添加其他需要的请求头
    },
  })
}

export function AcceptAudit({ uid }: { uid: string }): Promise<HttpResponse<string>> {
  return axios.get('/api/audit/acceptAccount', {
    params: { uid }, // 参数简写形式
    headers: {
      Authorization: getToken(), // 设置授权头
      // 添加其他需要的请求头
    },
  })
}

export function RejectAudit({ uid }: { uid: string }): Promise<HttpResponse<string>> {
  return axios.get('/api/audit/rejectAccount', {
    params: { uid }, // 参数简写形式
    headers: {
      Authorization: getToken(), // 设置授权头
      // 添加其他需要的请求头
    },
  })
}


export interface ServiceRecord {
  id: number
  title: string
  description: string
  name?: string
  actionType?: string
  icon?: string
  data?: DescData[]
  enable?: boolean
  expires?: boolean
}
export function queryInspectionList() {
  return axios.get('/api/list/quality-inspection')
}

export function queryTheServiceList() {
  return axios.get('/api/list/the-service')
}

export function queryRulesPresetList() {
  return axios.get('/api/list/rules-preset')
}
