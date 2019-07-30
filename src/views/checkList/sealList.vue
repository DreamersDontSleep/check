<template>
	<div>
		<el-form :inline="true" :model="editForm" ref="editForm" style="float: left;margin-left: 20px;">
			<el-form-item label="分公司名称:">
				<template>
					<el-select v-model="editForm.branchName" style="width: 250px;" placeholder="请选择">
						<el-option
							v-for="(item,index) in companySel"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</template>
			</el-form-item>
			<el-form-item label="状态:">
				<template>
					<el-select v-model="editForm.status" style="width: 250px;" placeholder="请选择">
						<el-option
							v-for="(item,index) in checkOr"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</template>
			</el-form-item>
			<el-form-item>
				<el-button @click="searchTable(editForm)">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-form :inline="true" :model="checkForm" ref="checkForm" style="float: left;margin-left: 40px;">
			<el-form-item label="待盖章:">
				<p style="margin: 0;padding: 0;color: red;">{{checkForm.checkAccount}}个</p>
			</el-form-item>
		</el-form>
		<div>
			<template>
				<div class="table">
				  <el-table
					:data="totalPriceEvaluation.slice((currentPage-1)*pageSize,currentPage*pageSize)"
					ref="table"
					tooltip-effect="dark"
					border
					stripe
					style="width: 95%;margin: 0 auto;">
					<el-table-column label="主体序号">
						<template slot-scope="scope">
							{{scope.row.id}}
						</template>
					</el-table-column>
					<el-table-column  label="申请编号" align="center">
					  <template slot-scope="scope">
						  {{scope.row.applicationNum}}
					  </template>
					</el-table-column>
					<el-table-column label="分公司">
					  <template slot-scope="scope">
						{{scope.row.branchOffice}}
					  </template>
					</el-table-column>
					<el-table-column label="评估目的">
					  <template slot-scope="scope">
						{{scope.row.assessAim}}
					  </template>
					</el-table-column>
					<el-table-column  label="报告类型">
					  <template slot-scope="scope">
						<div v-if="scope.row.reportType == 1">
							<span style="color: rgba(107, 107, 107, 0.647058823529412);">房地产估价报告</span>
						</div>
						<div v-if="scope.row.reportType == 2">
							<span style="color: #FFAA00;">土地估价报告</span>
						</div>
						<div v-if="scope.row.reportType == 3">
							<span style="color: rgba(255, 0, 0, 0.647058823529412);">资产评估报告</span>
						</div>
						<div v-if="scope.row.reportType == 4">
							<span style="color: rgba(255, 0, 0, 0.647058823529412);">预评估</span>
						</div>
					  </template>
					</el-table-column>
					<el-table-column label="申请人">
					  <template slot-scope="scope">
						{{scope.row.applicant}}
					  </template>
					</el-table-column>
					<el-table-column label="申请时间">
					  <template slot-scope="scope">
						{{scope.row.applicationDate}}
					  </template>
					</el-table-column>
					<el-table-column label="审核结果">
					  <template slot-scope="scope">
						  <div v-if="scope.row.state == 0">
						  	<span style="color: rgba(107, 107, 107, 0.647058823529412);">未提交</span>
						  </div>
						  <div v-if="scope.row.state == 1">
						  	<span style="color: rgba(107, 107, 107, 0.647058823529412);">待审核</span>
						  </div>
						  <div v-if="scope.row.state == 3">
						  	<span style="color: rgba(107, 107, 107, 0.647058823529412);">审核通过</span>
						  </div>
						  <div v-if="scope.row.state == 4">
						  	<span style="color: rgba(107, 107, 107, 0.647058823529412);">未提交</span>
						  </div>
						<!-- {{scope.row.checkResult}} -->
					  </template>
					</el-table-column>
					<el-table-column label="操作">
					  <template slot-scope="scope">
						<!-- <span v-if="scope.row.state == 1" @click="linkChange(scope.$index,scope.row)" style="color: rgb(51, 153, 204);cursor: pointer;">
						  审核
						</span>
						<span v-if="scope.row.state == 3" @click="linkChange(scope.$index,scope.row)" style="color: rgb(51, 153, 204);cursor: pointer;">
						  查看
						</span> -->
						<el-button type="primary" @click="sealChange(scope.$index,scope.row)">盖章</el-button>
					  </template>
					</el-table-column>
				  </el-table>
				  <el-pagination
				    @size-change="handleSizeChange"
				    @current-change="handleCurrentChange"
				    :current-page="currentPage"
				    :page-sizes="[5,10, 20, 30, 40]"
				    :page-size="pageSize"
				    layout="total, sizes, prev, pager, next, jumper"
				    :total="totalPriceEvaluation.length" style="width: 95%;margin: 10px auto;">
				  </el-pagination>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import { getCheckList, getEntryList, getReportData, getCheckRpt } from '@/api/entry'
export default {
  data() {
		return {
			editForm:{
				branchName: '',
				status: ''
			},
			checkForm:{
				checkAccount: ''
			},
			username: '',
			estateForm: {
				
			},
			currentPage: 1,
			pageSize: 10,
			fileList: [{
					name: '',
					url: ''
				}],
			editFormVisible: false,
			checkOr:[{
					"label": "全部",
					"value": "全部"
				},{
					"label": "待审核",
					"value": "待审核"
				},{
					"label": "已审核",
					"value": "已审核"
			}],
			companySel:[{
					"label": "全部",
					"value": "全部"
				},{
					"label": "分公司1",
					"value": "分公司1"
				},{
					"label": "分公司2",
					"value": "分公司2"
			}],
			totalPriceEvaluation: [],
			id: '',
			reportType: ''
	  }
  },
  mounted() {
  	this.fetchProjectList()
  },
	methods:{
		fetchProjectList() {
			let para
			if(localStorage.getItem('userId') == "root"){
				para = {
					"state": [1],
					"branchOffice": "",
					"login": "",
					"applicant": "",
					"checker": "",
					"transferTo": ""
				}
			}else{
				para = {
					"state": [1,3],
					"branchOffice": "",
					"login": "",
					"applicant": "",
					"checker": "",
					"transferTo": localStorage.getItem('userId')
				}
			}
			getCheckRpt(para).then((res) => {
				let checkData = res.data.reverse()
				this.totalPriceEvaluation = checkData
				this.checkForm.checkAccount = res.count
				console.log(res);
			})
		},
		searchTable(editForm){
			this.$refs.editForm.validate((valid) => {
			  if (valid) {
					console.log(editForm);
					let state = editForm.status;
					let branchOffice = editForm.branchName;
					if(branchOffice == "全部"){
						branchOffice = '';
					}
					
					if( state == "待审核" ){
						state = [1];
					}else if( state == "已审核" ){
						state = [3];
					}else if( state == "全部" ){
						state = [1,3];
					}
					let para
					if(localStorage.getItem('userId') == "root"){
						para = {
							"state": state,
							"branchOffice": branchOffice,
							"login": "",
							"applicant": "",
							"checker": "",
							"transferTo": ""
						}
					}else{
						para = {
							"state": state,
							"branchOffice": branchOffice,
							"login": "",
							"applicant": "",
							"checker": "",
							"transferTo": localStorage.getItem('userId')
						}
					}
					getCheckRpt(para).then((res) => {
						this.totalPriceEvaluation = res.data
						console.log(res);
					})
			  } else {
				console.log('error submit!!');
					return false;
			  }
			});
		},
		newAdd() {
			this.editFormVisible = true;
		},
		linkChange(index,row){
			let id = row.id;
			console.log(row)
			if(row.reportType == 1){
				this.$router.push({path:'/checkList/realEstateReport', query: { 'content': row }})
			}else if(row.reportType == 2){
				this.$router.push({path:'/checkList/landValuationReport', query: { 'content': row }})
			}else if(row.reportType == 3){
				this.$router.push({path:'/checkList/assetsReport', query: { 'content': row }})
			}else if(row.reportType == 4){
				this.$router.push({path:'/checkList/preliminaryAssessment', query: { 'content': row }})
			}
		},
		sealChange(index,row){
			console.log(row)
			let id = row.id;
			let reportType = row.reportType;
			getReportData(id,reportType).then((res) => {
				console.log(res);
				this.estateForm = res.data;
				this.$router.push({path:'/checkList/checkSeal', query: { 'content': this.estateForm }})
			});
		},
			handleSizeChange(val) {
			  console.log(`每页 ${val} 条`);
			  this.pageSize = val;
			},
			handleCurrentChange(val) {
			  console.log(`当前页: ${val}`);
			  this.currentPage = val;
			}  
	}
}
</script>

<style>
</style>
