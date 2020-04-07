import request from '@/utils/request'
import axios from "axios"
import { getToken } from '@/utils/auth'

export function getImportList(para) {
  return request({
    url: '/rpt/execl/getAll',
    method: 'post',
    data: para
  })
}

export function getCheckRpt(para) {
  return request({
    url: '/rpt/index/getCheckReports',
    method: 'post',
    data: para
  })
}

