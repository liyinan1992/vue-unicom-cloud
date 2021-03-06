import request from '@/utils/request'

export function getServerList(params) {
  return request({
    url: '/hostlist',
    method: 'get',
    params,
    baseURL: 'mypatrol'
  })
}

export function setServer(data) {
  return request({
    url: '/appendhost',
    method: 'post',
    data,
    baseURL: 'mypatrol'
  })
}
