import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/results',
    method: 'get',
    params
  })
}

export function getChart(params) {
  return request({
    url: '/ratio',
    method: 'get',
    params
  })
}
