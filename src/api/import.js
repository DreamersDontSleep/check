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

export function getExcelList(para) {
  return request({
    url: '/rpt/index/getexecl?starttime=' + para.starttime + '&endtime=' + para.endtime + '&pageSize=' + para.pageSize + '&pageNum=' + para.pageNum,
    method: 'post',
    data: {}
  })
}

export function getExportExcel(para){
	return request({
	  url: '/rpt/test/exportExcel?starttime=' + para.starttime + '&endtime=' + para.endtime + '&reportType=' + para.reportType,
	  method: 'get',
	  data: {}
	})
}