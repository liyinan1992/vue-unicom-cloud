import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/history',
    method: 'get',
    params
  })
}
