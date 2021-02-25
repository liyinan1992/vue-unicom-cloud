import request from '@/utils/request'

export function getResult() {
  return request({
    url: '/situation',
    method: 'get'
  })
}

export function getChart() {
  return request({
    url: '/totalratio',
    method: 'get'
  })
}

export function getAvb() {
  return request({
    url: '/currentratio',
    method: 'get'
  })
}
