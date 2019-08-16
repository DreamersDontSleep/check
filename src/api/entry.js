import request from '@/utils/request'
import axios from "axios"
import { getToken } from '@/utils/auth'

export function getEntryList(para) {
  return request({
    url: '/rpt/index/getReports',
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

export function postReportData(para) {
  return request({
    url: '/rpt/index/saveReport',
    method: 'post',
    data: para
  })
}

export function postReportDatas(params) {
  return request({
    url: '/rpt/index/saveRptOrFile',
    method: 'post',
    data: params,
		headers: {
		  'Content-Type': 'multipart/form-data'
		}
  })
}

export function deleteReport(id,reportType) {
  return request({
    url: '/rpt/index/delete?id='+ id + '&reportType=' + reportType,
    method: 'post',
    data: {}
  })
}

export function getCheckList() {
  return request({
    url: '/rpt/index/getCheckList?a=' + Math.random(),
    method: 'get',
    data: {}
  })
}

export function transferToId(id,transferTo) {
  return request({
    url: '/rpt/index/transferTo?id='+ id + '&transferTo=' + transferTo + '&a=' + Math.random(),
    method: 'get',
    data: {}
  })
}

export function postCheckId(id,state) {
  return request({
    url: '/rpt/index/updateRptState?id='+ id + '&state=' + state,
    method: 'post',
    data: {}
  })
}

export function getReportData(id,reportType) {
  return request({
    url: '/rpt/index/getReportsDetail?id='+ id + '&reportType=' + reportType + '&a=' + Math.random(),
    method: 'get',
    data: {}
  })
}

export function postUpdateRpt(para) {
  return request({
    url: '/rpt/index/updateRpt',
    method: 'post',
    data: para
  })
}

export function postsaveRpt(para) {
  return request({
    url: '/rpt/index/saveRpt',
    method: 'post',
    data: para
  })
}

export function postUpdateRemark(para) {
  return request({
    url: '/rpt/index/updateRemarkOrStampState',
    method: 'post',
    data: para
  })
}

export function getDictionary() {
  return request({
    url: '/auth/dataDictionary/getTreeSp',
    method: 'get',
    data: {},
    headers: { 'token': getToken() }
  })
}

export function postStaticsList(para) {
  return request({
    url: '/rpt/index/getStaticsList',
    method: 'post',
    data: para
  })
}