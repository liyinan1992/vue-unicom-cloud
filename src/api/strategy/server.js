import request from '@/utils/request'

export function getServerList(params) {
  return request({
    url: '/abcd',
    method: 'get',
    params
  })
}

export function setServer(data) {
  return request({
    url: '/abc',
    method: 'post',
    data
  })
}
