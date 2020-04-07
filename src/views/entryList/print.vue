<template>
	<div>
		<div id="print" style="width: 80%;margin: 0 auto;">
			<h3 style="text-align: center;">江苏天圣房地产土地造价咨询评估有限公司</h3>
			<h3 style="text-align: center;">报告三级审核单</h3>
			<table border="1" cellspacing="0" cellpadding="0" class="print-table">
				<tr>
					<td>报告编号</td>
					<td colspan="5">{{estForm.assessReportNum}}</td>
				</tr>
				<tr>
					<td>项目名称</td>
					<td colspan="5">{{estForm.projectName}}</td>
				</tr>
				<tr>
					<td>委托方</td>
					<td colspan="5">{{estForm.client}}</td>
				</tr>
				<tr>
					<td>联系人</td>
					<td colspan="2">{{estForm.clientEmail}}</td>
					<td>联系电话</td>
					<td colspan="2">{{estForm.clientPhone}}</td>
				</tr>
				<tr>
					<td>开始日期</td>
					<td colspan="2">{{estForm.assessStartTime.substring(0,10)}}</td>
					<td>结束日期</td>
					<td colspan="2">{{estForm.assessEndTime.substring(0,10)}}</td>
				</tr>
				<tr>
					<td width="16.6%">评估价值（元）</td>
					<td width="16.6%">{{estForm.assessTotalPrice}}</td>
					<td width="16.6%">建筑面积（m²）</td>
					<td width="16.6%">{{estForm.buildingArea}}</td>
					<td width="16.6%">土地面积（m²）</td>
					<td>{{estForm.floorArea}}</td>
				</tr>
				<tr>
					<td colspan="6">以下审核人员填写“是、否、有、无”</td>
				</tr>
				<tr>
					<td rowspan="12">审核意见</td>
					<td rowspan="2" colspan="2">审核内容</td>
					<td>一审</td>
					<td>二审</td>
					<td>三审</td>
				</tr>
				<tr>
					<td>估价师</td>
					<td>项目负责人</td>
					<td>部门负责人</td>
				</tr>
				<tr>
					<td colspan="2">估价方法运用是否合理</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td colspan="2">估计测算过程是否严密</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td colspan="2">估价结果是否正确</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td colspan="2">语言组织是否缜密</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td colspan="2">勘察表记录是否详细</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td colspan="2">附件是否齐全</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td colspan="2">有误漏错字</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td colspan="2">有无委托书</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td colspan="2">审核人（签字）</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td colspan="2">审查日期</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td rowspan="6">备注</td>
					<td style="height: 80px;">资料是否清晰</td>
					<td colspan="4"></td>
				</tr>
				<tr>
					
				</tr>
				<tr>
					<td style="height: 80px;">资料是否齐全（缺的填写清楚）</td>
					<td colspan="4"></td>
				</tr>
				<tr>
					<td rowspan="2">其他</td>
					<td colspan="2" rowspan="2">中国东方资产管理股份有限公司江苏省分公司</td>
					<td>系统</td>
					<td>现场</td>
				</tr>
				<tr>
					<td> </td>
					<td> </td>
				</tr>
			</table>
		</div>
		<el-button v-print="'#print'">打印</el-button>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				estForm:''
			}
		},
		created() {
			const content = this.$route.query.contents
			console.log(content)
			this.estForm = content
		}
	}
</script>

<style scoped>
	.print-table{
		/* border: 1px solid #eee; */
		width: 80%;
		text-align: center;
		margin:  0 auto;
	}
	.print-table td{
		height: 40px;
	}
</style>
