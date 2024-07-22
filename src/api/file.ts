import { getToken } from '@/utils/auth'
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface'
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface'
import axios from 'axios'
import baseUrls from './baseUrl'

const baseUrl = baseUrls.FILE_SERVER_BASE_URL

export interface FileRecord {
  id: string
  name: string
  documentType: string
  documentSize: number
  libraryId: string
  createTime: string
  src: string
}


export interface FileListRes {
  list: FileRecord[]
  total: number
}

export interface FileParams extends Partial<FileListRes> {
  current: number
  pageSize: number
}


export interface ServiceRecord {
  id: string
  title: string
  createTime: string
  description: string
  data?: DescData[]
}

export interface ServiceRes {
  list: ServiceRecord[]
  total: number
}

export interface optionList {
  list: SelectOptionData[]
  total: number
}



export interface HttpResponse<T = unknown> {
  flag: boolean
  msg: string
  code: number
  data: T
}

export function editFileLibrary(data:ServiceRecord) : Promise<HttpResponse<string>> {
  return axios.post(`${baseUrl}/library/edit`,data, {
    headers: {
      Authorization: getToken(), // 设置授权头
      // 添加其他需要的请求头
    },
  })
}

export function getFileLibraryList() : Promise<HttpResponse<ServiceRes>>  {
  return axios.post(`${baseUrl}/library/list`, null,{
    headers: {
      Authorization: getToken(), // 设置授权头
      // 添加其他需要的请求头
    },
  })
}

export function createFileLibrary(data:{title: string,description: string}) : Promise<HttpResponse<string>>  {
  return axios.post(`${baseUrl}/library/create`,data, {
    headers: {
      Authorization: getToken(), // 设置授权头
      // 添加其他需要的请求头
    },
  })
}

export function deleteFileLibrary({ id }: { id: string }): Promise<HttpResponse<string>> {
  return axios.get(`${baseUrl}/library/delete`, {
    params: { id }, // 参数简写形式
    headers: {
      Authorization: getToken(), // 设置授权头
      // 添加其他需要的请求头
    },
  })
}


export function getLibraryOptionList(): Promise<HttpResponse<optionList>> {
  return axios.get(`${baseUrl}/library/optionList`, {
    headers: {
      Authorization: getToken(), // 设置授权头
      // 添加其他需要的请求头
    },
  })
}

export function getFileList(params: FileParams) {
  return axios.post<FileListRes>(`${baseUrl}/document/list`, params, {
    headers: {
      Authorization: getToken(), // 设置授权头
      // 添加其他需要的请求头
    },
  })
}

export function uploadFile(params: FormData) : Promise<HttpResponse<string>> {
  return axios.post(`${baseUrl}/document/upload`, params, {
    headers: {
      Authorization: getToken(), // 设置授权头
      // 添加其他需要的请求头
    },
  })
}

export function deleteFile({ id }: { id: string }): Promise<HttpResponse<string>> {
  return axios.get(`${baseUrl}/document/delete`, {
    params: { id }, // 参数简写形式
    headers: {
      Authorization: getToken(), // 设置授权头
      // 添加其他需要的请求头
    },
  })
}
