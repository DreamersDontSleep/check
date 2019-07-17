import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/auth/signin/local?signName=' + username + '&passwd=' + password,
    method: 'post',
    data: {}
  })
}

export function logout() {
  return request({
    url: '/auth/signout',
    method: 'get',
    data: {}
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'post',
    data: {}
  })
}
