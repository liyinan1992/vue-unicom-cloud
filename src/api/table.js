import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params: data
  })
}

export function getChart(data) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params: data
  })
}
