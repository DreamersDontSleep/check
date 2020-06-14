<template>
	<div>
		<el-form ref="editForm1" :inline="true" :model="editForm1" style="margin-left: 50px;">
			<!-- <el-form-item label="统计条件选择:">
				<el-select v-model="editForm1.condition" @change="onselected" style="width: 250px;" placeholder="请选择">
					<el-option v-for="(item,index) in conditionType" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item> -->
			<el-form-item label="分公司名称:" prop="branchName">
				<template>
					<el-select v-model="editForm1.branchName" style="width: 250px;" placeholder="请选择">
						<el-option v-for="(item,index) in companySel" :key="item.name" :label="item.name" :value="item.name" />
					</el-select>
				</template>
			</el-form-item>
			<el-form-item label="报告名称:" prop="status">
				<template>
					<el-select v-model="editForm1.status" style="width: 250px;" placeholder="请选择">
						<el-option v-for="(item,index) in checkOr" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</template>
			</el-form-item>
			<el-form-item label="估价目的:" prop="method">
				<template>
					<el-select v-model="editForm1.method" style="width: 250px;" placeholder="请选择">
						<el-option v-for="(item,index) in assessAimList" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</template>
			</el-form-item>
			<el-form-item>
				<el-button @click="searchTable1(editForm1)">搜索</el-button>
				<el-button @click="reset('editForm1')">重置</el-button>
			</el-form-item>
		</el-form>
		<div>
			<template>
				<div>
					<el-table :data="sticData" style="width: 100%;margin-bottom: 30px;">
						<el-table-column prop="reportType" label="报告名称" style="width: 20%">
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
									<span style="color: rgba(255, 0, 0, 0.647058823529412);">预评估（房地产）</span>
								</div>
								<div v-if="scope.row.reportType == 5">
									<span style="color: rgba(255, 0, 0, 0.647058823529412);">预评估（土地）</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="num" label="报告数量" style="width: 20%">
						</el-table-column>
						<el-table-column prop="floorArea" label="土地面积合计" style="width: 20%">
						</el-table-column>
						<el-table-column prop="buildingArea" label="建筑面积合计" style="width: 20%">
						</el-table-column>
						<el-table-column prop="assessTotalPrice" label="评估总值合计" style="width: 20%">
						</el-table-column>

					</el-table>
				</div>
				<div class="table">

					<el-table ref="table" :data="totalPriceEvaluation.slice((currentPage-1)*pageSize,currentPage*pageSize)" tooltip-effect="dark" border stripe style="width: 95%;margin: 0 auto;">
						<el-table-column type="index" label="序号" width="60" />
						<el-table-column label="主体序号" style="display: none;">
							<template slot-scope="scope" style="display: none;">
								{{ scope.row.id }}
							</template>
						</el-table-column>
						<el-table-column label="申请编号" align="center">
							<template slot-scope="scope">
								{{ scope.row.applicationNum }}
							</template>
						</el-table-column>
						<el-table-column label="分公司">
							<template slot-scope="scope">
								{{ scope.row.branchOffice }}
							</template>
						</el-table-column>
						<el-table-column label="目的">
							<template slot-scope="scope">
								{{ scope.row.assessAim }}
							</template>
						</el-table-column>
						<el-table-column label="报告类型">
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
						<el-table-column label="业务来源">
							<template slot-scope="scope">
								{{ scope.row.serviceSource }}
							</template>
						</el-table-column>
						<el-table-column label="面积">
							<template slot-scope="scope">
								{{ scope.row.floorArea }}
							</template>
						</el-table-column>
						<el-table-column label="评估值">
							<template slot-scope="scope">
								{{ scope.row.assessTotalPrice }}
							</template>
						</el-table-column>
						<el-table-column label="收费">
							<template slot-scope="scope">
								{{ scope.row.serviceCharge }}
							</template>
						</el-table-column>
						<el-table-column label="时间">
							<template slot-scope="scope">
								{{ scope.row.valueTime }}
							</template>
						</el-table-column>
					</el-table>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count" style="width: 95%;margin: 10px auto;">
					</el-pagination>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	import {
		getEntryList,
		deleteReport,
		postCheckId,
		getReportData,
		getDictionary,
		postStaticsList,
		postStaticsData
	} from '@/api/entry'
	import {
		mapGetters
	} from 'vuex'
	import {
		getToken,
		setToken,
		removeToken
	} from '@/utils/auth'
	import permission from '@/directive/permission/index.js' // 权限判断指令
	import checkPermission from '@/utils/permission' // 权限判断函数
	export default {
		directives: {
			permission
		},
		data() {
			return {
				editForm: {
					branchName: '',
					status: '',
					linkSel: ''
				},
				editForm1: {
					// condition: '',
					branchName: '',
					status: '',
					method: ''
				},
				sticData: [],
				companyFlag: false,
				reportFlag: false,
				methodFlag: false,
				checkForm: {
					checkAccount: '12个'
				},
				currentPage: 1,
				pageSize: 10,
				editFormVisible: false,
				fdcFormVisible: false,
				tdFormVisible: false,
				zcFormVisible: false,
				ypgFormVisible: false,
				lookOrEdit: false,
				estateForm: {},
				stateArr: [],
				fileList: [{
					name: '',
					url: ''
				}],
				conditionType: [{
					'label': '分公司名称统计',
					'value': '1'
				}, {
					'label': '按报告类型累计',
					'value': '2'
				}, {
					'label': '按估价目的统计',
					'value': '3'
				}, ],
				checkOr: [{
					'label': '房地产估价报告',
					'value': '1'
				}, {
					'label': '土地估价报告',
					'value': '2'
				}, {
					'label': '资产评估报告',
					'value': '3'
				}, {
					'label': '预评估(房地产)',
					'value': '4'
				}, {
					'label': '预评估(土地)',
					'value': '5'
				}],
				linkArr: [{
					'label': '房地产估价报告',
					'value': '房地产估价报告'
				}, {
					'label': '土地估价报告',
					'value': '土地估价报告'
				}, {
					'label': '资产评估报告',
					'value': '资产评估报告'
				}, {
					'label': '预评估',
					'value': '预评估'
				}],
				companySel: '',
				totalPriceEvaluation: [],
				assessAimList: [{
					'label': '出让',
					'value': '出让'
				}, {
					'label': '转让',
					'value': '转让'
				}, {
					'label': '抵押',
					'value': '抵押'
				}, {
					'label': '征收',
					'value': '征收'
				}, {
					'label': '司法',
					'value': '司法'
				}, {
					'label': '咨询',
					'value': '咨询'
				}, {
					'label': '其他',
					'value': '其他'
				}],
				assessMethodList: [{
					'label': '出让',
					'value': '出让'
				}, {
					'label': '不出让',
					'value': '不出让'
				}],
				valueTypeList: [{
					'label': '出让',
					'value': '出让'
				}, {
					'label': '不出让',
					'value': '不出让'
				}],
				total1: 0,
				total2: 0,
				total3: 0,
				count: 0
			}
		},
		computed: {
			...mapGetters(['name']),
			uploadData: function() {
				const parseData = JSON.stringify(this.estateForm)
				const params = {
					data: parseData
				}
				return params
			},
		},
		mounted() {
			this.fetchProjectList()
		},
		methods: {
			checkPermission,
			fetchProjectList() {
				console.log(this.name)
				let state = this.editForm.status
				let branchOffice = this.editForm.branchName
				let para = {
					"branchOffice": "",
					"reportType": "",
					"assessAim": "",
					"applicationDate": ""
				}
				let params = {
					para: para,
					pageNum: 1,
					pageSize: 10
				}
				postStaticsList(params).then((res) => {
					let stArr = res.data.reverse()
					let me = this
					this.count = res.count
					stArr.forEach(function(e) {
						console.log(e)
						if(e.detailReport != null) {
							me.totalPriceEvaluation.push(e.detailReport)
							if(e.detailReport.buildingArea != null) {
								me.total1 = me.total1 + Math.floor(e.detailReport.buildingArea)
							}
							if(e.detailReport.serviceCharge != null) {
								me.total2 = me.total2 + Math.floor(e.detailReport.serviceCharge)
							}
							if(e.detailReport.assessTotalPrice != null) {
								me.total3 = me.total3 + Math.floor(e.detailReport.assessTotalPrice)
							}
						}

					})
					// this.totalPriceEvaluation = res.data
					console.log(me.total1)
				})
				getDictionary().then((res) => {
					let dataList = res
					let depData = dataList.data.fgs
					console.log("数据树", dataList)
					let depArr = [];
					for(let i = 0; i < depData.length; i++) {
						let obj = {
							id: '',
							name: ''
						};
						console.log(depData[0])
						// depData[i].forEach(function(e,c){
						for(let key in depData[i]) {
							// depArr.push(e[key])
							obj.id = depData[i][key][0].value;
							obj.name = depData[i][key][1].value;
							depArr.push(obj);
						}
						// })
					}
					console.log("城市数据", depArr)
					depArr.unshift({
						id: '',
						name: "全部"
					})
					this.companySel = depArr
				})
			},
			searchTable(editForm) {
				const para = {
					token: getToken()
				}
				console.log(para)
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						// alert('submit!');
						console.log(editForm)
						this.editForm1 = editForm
						let state = editForm.status

						let branchOffice = editForm.branchName

						if(branchOffice == "全部" || branchOffice == "") {
							branchOffice = '';
						}

						if(state == "未审核") {
							state = [0];
						} else if(state == "待审核") {
							state = [1];
						} else if(state == "审核通过") {
							state = [3];
						} else if(state == "审核不通过") {
							state = [4];
						} else if(state == "全部" || state == "") {
							state = [0, 1, 2, 3, 4];
						}
						// this.stateArr = state
						let para
						if(localStorage.getItem('userId') == "root") {
							para = {
								"state": [],
								"branchOffice": branchOffice,
								"login": "",
								"applicant": "",
								"checker": ""
							}
						} else {
							para = {
								"state": state,
								"branchOffice": branchOffice,
								"login": localStorage.getItem('userId'),
								"applicant": this.name,
								"checker": ""
							}
						}
						getEntryList(para).then((res) => {
							this.totalPriceEvaluation = res.data.reverse()
							console.log(res)
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
			searchTable1(editForm1) {
				console.log(editForm1)
				postStaticsData(editForm1).then((res) => {
					console.log(res)
					this.sticData = res.data
				})
				let para = {
					branchOffice: editForm1.branchName,
					reportType: editForm1.status,
					method: editForm1.method,
				}
				let params = {
					para: para,
					pageNum: 1,
					pageSize: 10
				}
				postStaticsList(params).then((res) => {
					let stArr = res.data.reverse()
					let me = this
					this.count = res.count
					me.totalPriceEvaluation = []
					stArr.forEach(function(e) {
						console.log(e)
						if(e.detailReport != null) {
							me.totalPriceEvaluation.push(e.detailReport)
							if(e.detailReport.buildingArea != null) {
								me.total1 = me.total1 + Math.floor(e.detailReport.buildingArea)
							}
							if(e.detailReport.serviceCharge != null) {
								me.total2 = me.total2 + Math.floor(e.detailReport.serviceCharge)
							}
							if(e.detailReport.assessTotalPrice != null) {
								me.total3 = me.total3 + Math.floor(e.detailReport.assessTotalPrice)
							}
						}

					})
					// this.totalPriceEvaluation = res.data
					console.log(me.totalPriceEvaluation)
				})
			},
			newAdd() {
				this.editFormVisible = true
			},
			reset(editForm1) {
				this.$nextTick(() => {

					this.$refs[editForm1].resetFields();

				})
				
			},
			onselected(value) {
				console.log(value)
				if(value == 1) {
					this.companyFlag = true
					this.reportFlag = false
					this.methodFlag = false
					this.editForm1.status = ''
					this.editForm1.method = ''
				} else if(value == 2) {
					this.companyFlag = false
					this.reportFlag = true
					this.methodFlag = false
					this.editForm1.branchName = ''
					this.editForm1.method = ''
				} else if(value == 3) {
					this.companyFlag = false
					this.reportFlag = false
					this.methodFlag = true
					this.editForm1.branchName = ''
					this.editForm1.status = ''
				}
			},
			confirmLink(editForm) {
				let linkVal = editForm.linkSel
				if(linkVal == "房地产估价报告") {
					this.$router.push({
						path: '/entryList/realEstateReport'
					})
				} else if(linkVal == "土地估价报告") {
					this.$router.push({
						path: '/entryList/landValuationReport'
					})
				} else if(linkVal == "资产评估报告") {
					this.$router.push({
						path: '/entryList/assetsReport'
					})
				} else if(linkVal == "预评估") {
					this.$router.push({
						path: '/entryList/preliminaryAssessment'
					})
				}
			},
			getReportDetail: function(index, row) {
				const id = row.id
				const reportType = row.reportType
				getReportData(id, reportType).then((res) => {
					console.log(res)
					this.lookOrEdit = true
					this.estateForm = res.data
					if(reportType == 1) {
						this.$router.push({
							path: '/entryList/modifyRealEstateReport',
							query: {
								'contents': this.estateForm,
								'lookOrEdit': this.lookOrEdit
							}
						})
					} else if(reportType == 2) {
						this.$router.push({
							path: '/entryList/modifyLandValuationReport',
							query: {
								'contents': this.estateForm,
								'lookOrEdit': this.lookOrEdit
							}
						})
					} else if(reportType == 3) {
						this.$router.push({
							path: '/entryList/modifyAssetsReport',
							query: {
								'contents': this.estateForm,
								'lookOrEdit': this.lookOrEdit
							}
						})
					} else if(reportType == 4) {
						this.$router.push({
							path: '/entryList/modifyPreliminaryAssessment',
							query: {
								'contents': this.estateForm,
								'lookOrEdit': this.lookOrEdit
							}
						})
					}
				})
			},
			editReportDetail: function(index, row) {
				const id = row.id
				const reportType = row.reportType
				getReportData(id, reportType).then((res) => {
					this.estateForm = res.data
					console.log(res)
					this.lookOrEdit = false
					if(reportType == 1) {
						this.$router.push({
							path: '/entryList/modifyRealEstateReport',
							query: {
								'contents': this.estateForm,
								'lookOrEdit': this.lookOrEdit
							}
						})
					} else if(reportType == 2) {
						this.$router.push({
							path: '/entryList/modifyLandValuationReport',
							query: {
								'contents': this.estateForm,
								'lookOrEdit': this.lookOrEdit
							}
						})
					} else if(reportType == 3) {
						this.$router.push({
							path: '/entryList/modifyAssetsReport',
							query: {
								'contents': this.estateForm,
								'lookOrEdit': this.lookOrEdit
							}
						})
					} else if(reportType == 4) {
						this.$router.push({
							path: '/entryList/modifyPreliminaryAssessment',
							query: {
								'contents': this.estateForm,
								'lookOrEdit': this.lookOrEdit
							}
						})
					}
				})
			},
			removeList: function(index, row) {
				const id = row.id
				const reportType = row.reportType
				const para = {
					id: id,
					reportType: reportType
				}
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					deleteReport(id, reportType).then((res) => {
						this.fetchProjectList()
					})
				}).catch(() => {

				})
			},
			postList: function(index, row) {
				const id = row.id
				const state = 1
				this.$confirm('确认提交该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					postCheckId(id, state).then((res) => {
						this.fetchProjectList()
					})
				}).catch(() => {

				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				// this.currentPage = val;
				let state = this.editForm1.status
				let branchOffice = this.editForm1.branchName
				let method = this.editForm1.method
				let status = this.editForm1.status
				console.log(this.editForm)
				let para = {
					"branchOffice": branchOffice,
					"method": method,
					"reportType": status
				}
				let params = {
					para: para,
					pageNum: val,
					pageSize: 10
				}
				postStaticsList(params).then((res) => {
					let stArr = res.data
					let me = this
					this.count = res.count
					me.totalPriceEvaluation = []
					stArr.forEach(function(e) {
						console.log(e)
						if(e.detailReport != null) {

							me.totalPriceEvaluation.push(e.detailReport)
						}

					})
					// this.totalPriceEvaluation = res.data.reverse()
					console.log(me.totalPriceEvaluation)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.el-dialog {
		width: 80% !important;
	}
</style>