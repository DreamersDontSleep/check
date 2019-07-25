<template>
	<div style="margin-left: 30px;">
		<h3>基本信息</h3>
		<template>
			<el-form :inline="true" :model="estateForm" ref="estateForm" label-width="180px">
				<el-form-item label="报告类型:" style="display: block;">
					<template>
						<el-input value="土地估价报告" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="项目名称:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.projectName" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="估价报告编号:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessReportNum" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="估价作业开始时间:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessStartTime" disabled></el-input>
						<!-- <el-date-picker v-model="estateForm.assessStartTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd"></el-date-picker> -->
					</template>
				</el-form-item>
				<el-form-item label="估价作业结束时间:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessEndTime" disabled></el-input>
						<!-- <el-date-picker v-model="estateForm.assessEndTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd"></el-date-picker> -->
					</template>
				</el-form-item>
				<el-form-item label="估价时点:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.valueTime" disabled></el-input>
						<!-- <el-date-picker v-model="estateForm.valueTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd"></el-date-picker> -->
					</template>
				</el-form-item>
				<el-form-item label="估价对象:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessObject" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="估价目的:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessAim" disabled></el-input>
					<!-- 	<el-select v-model="estateForm.assessAim" placeholder="请选择">
							<el-option v-for="(item,index) in assessAimList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select> -->
					</template>
				</el-form-item>
				<el-form-item label="估价方法:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessMethod" disabled></el-input>
					<!-- 	<el-select v-model="estateForm.assessMethod" placeholder="请选择">
							<el-option v-for="(item,index) in assessMethodList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select> -->
					</template>
				</el-form-item>
				<el-form-item label="宗地位置:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.landSite" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="宗地面积(m2):" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.landArea" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="宗地数:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.landAmount" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估单价:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessUnitPrice" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估总价:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessTotalPrice" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="委托方:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.client" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="委托人邮箱:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.clientEmail" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="委托人电话:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.clientPhone" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="第一报告人:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.firstReporter" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="第一报告人注册号:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.firstReporterRgNum" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人1:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.partReporter1" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人2:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.partReporter2" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人1注册号:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.partReporter1RgNum" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人2注册号:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.partReporter2RgNum" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="业务来源:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.serviceSource" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="分公司:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.branchOffice" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="业务收费:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.serviceCharge" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="审核员:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.checker" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估机构:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessOrg" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="文件上传" class="fl">
					<el-upload class="upload-demo" action="http://fcpgpre.jstspg.com/rpt/index/upLoad" :on-preview="handlePreview"
					 accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx" :on-remove="handleRemove"
					 :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
						<!-- <el-button size="small" type="primary">点击上传</el-button> -->
						<!-- <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg</div> -->
						<!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
					</el-upload>
					<el-button type="primary" @click="sealJump()">盖章</el-button>
					<el-button>转给其他人</el-button>
				</el-form-item>
				<el-form-item style="display: block;">
					<!-- <el-button @click="submitForm(estateForm)">提交</el-button> -->
					<el-button type="success" @click="checkSuccess()">审核通过</el-button>
					<el-button type="danger" @click="checkFail()">审核拒绝</el-button>
					<el-button @click="cancelForm(estateForm)">返回</el-button>
				</el-form-item>
			</el-form>
		</template>
	</div>
</template>

<script>
	import {
		postReportData,
		getReportData, postCheckId
	} from '@/api/entry'
	export default {
		data() {
			return {
				estateForm: {},
				checkForm: {
					checkAccount: '12个'
				},
				editFormVisible: false,
				fileList: [{
					name: '',
					url:''
				}],
				assessAimList: [{
					"label": "出让",
					"value": "出让"
				}, {
					"label": "不出让",
					"value": "不出让"
				}],
				assessMethodList: [{
					"label": "出让",
					"value": "出让"
				}, {
					"label": "不出让",
					"value": "不出让"
				}],
				valueTypeList: [{
					"label": "出让",
					"value": "出让"
				}, {
					"label": "不出让",
					"value": "不出让"
				}],
				id: '',
				reportType: ''
			}
		},
		created() {
			const content = this.$route.query.content
			console.log(content)
			this.id = content.id
			this.reportType = content.reportType
		},
		mounted() {
			this.getCheckData()
		},
		methods: {
			getCheckData () {
				let id = this.id
				let reportType = this.reportType
				getReportData(id,reportType).then((res) => {
					console.log(res);
					this.estateForm = res.data;
					let fileUrl = res.data.wordUri;
					let fileIndex = fileUrl.lastIndexOf('\/');
					let fileName = fileUrl.substring(fileIndex + 1, fileUrl.length);
					console.log(fileName)
					this.fileList[0].name = fileName;
					this.fileList[0].url = fileUrl;
				});
			},
			searchTable(editForm) {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						// alert('submit!');
						console.log(editForm);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			newAdd() {
				this.editFormVisible = true;
			},
			// 提交表单
			submitForm(estateForm) {
				this.$refs.estateForm.validate((valid) => {
					if (valid) {
						let para = estateForm;
						postReportData(para).then((res) => {
							this.totalPriceEvaluation = res.data
							console.log(res);
						})
						console.log(estateForm);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			cancelForm(estateForm) {
				this.$router.push({path:'/checkList/index'})
			},
			checkSuccess () {
				let id = this.id;
				let state = 3;
				this.$confirm('确认审核通过吗?', '提示', {
					type: 'warning'
				}).then(() => {
					postCheckId(id,state).then((res) => {
						// this.fetchProjectList()
						this.$router.push({path:'/checkList/index'})
						console.log(res);
					});
				}).catch(() => {
					
				});
			},
			checkFail () {
				let id = this.id;
				let state = 4;
				this.$confirm('确认审核未通过吗?', '提示', {
					type: 'warning'
				}).then(() => {
					postCheckId(id,state).then((res) => {
						// this.listLoading = false;
						// this.lookFormVisible = true;
						// this.searchForm = res.body;
						// console.log(res.body);
						// this.fetchProjectList();
						// this.fetchProjectList()
						console.log(res);
						this.$router.push({path:'/checkList/index'})
					});
				}).catch(() => {
					
				});
			},
			sealJump(){
				console.log(this.estateForm)
				this.$router.push({path:'/checkList/checkSeal', query: { 'content': this.estateForm }})
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			}
		}
	}
</script>

<style>
</style>
