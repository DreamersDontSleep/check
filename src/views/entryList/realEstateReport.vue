<template>
	<div style="margin-left: 30px;">
		<h3>基本信息</h3>
		<template>
			<el-form :inline="true" :model="estateForm" ref="estateForm" :rules="inputRule" label-width="180px">
				<el-form-item label="报告类型:" style="display: block;" prop="reportType">
					<template>
						<div v-if="estateForm.reportType == 1">
							<el-input value="房地产估价报告" disabled></el-input>
						</div>
					</template>
				</el-form-item>
				<el-form-item label="项目名称:" style="width: 40%;" prop="projectName">
					<template>
						<el-input v-model="estateForm.projectName" ></el-input>
					</template>
				</el-form-item>
				<el-form-item label="估价报告编号:" style="width: 40%;" prop="assessReportNum">
					<template>
						<el-input v-model="estateForm.assessReportNum" ></el-input>
					</template>
				</el-form-item>
				<el-form-item label="估价作业开始时间:" style="width: 40%;" prop="assessStartTime">
					<template>
						<!-- <el-input v-model="estateForm.assessStartTime" ></el-input> -->
						<el-date-picker v-model="estateForm.assessStartTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
					</template>
				</el-form-item>
				<el-form-item label="估价作业结束时间:" style="width: 40%;" prop="assessEndTime">
					<template>
						<!-- <el-input v-model="estateForm.assessEndTime" ></el-input> -->
						<el-date-picker v-model="estateForm.assessEndTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
					</template>
				</el-form-item>
				<el-form-item label="估价时点:" style="width: 40%;" prop="valueTime">
					<template>
						<!-- <el-input v-model="estateForm.valueTime" ></el-input> -->
						<el-date-picker v-model="estateForm.valueTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
					</template>
				</el-form-item>
				<el-form-item label="估价对象:" style="width: 40%;" prop="assessObject">
					<template>
						<el-input v-model="estateForm.assessObject" ></el-input>
					</template>
				</el-form-item>
				<el-form-item label="估价目的:" style="width: 40%;" prop="assessAim">
					<template>
					  <el-select v-model="estateForm.assessAim" multiple placeholder="请选择">
					    <el-option
					      v-for="(item,index) in assess"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value"/>
					  </el-select>
					</template>
				</el-form-item>
				<el-form-item label="估价方法:" style="width: 40%;" prop="assessMethod">
					<template>
					  <el-select v-model="estateForm.assessMethod"  placeholder="请选择">
					    <el-option
					      v-for="(item,index) in assessMethodList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value"/>
					  </el-select>
					</template>
				</el-form-item>
				<el-form-item label="价值类型:" style="width: 40%;" prop="valueType">
					<template>
					  <el-select v-model="estateForm.valueType" placeholder="请选择">
					    <el-option
					      v-for="(item,index) in valueTypeList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value"/>
					  </el-select>
					</template>
				</el-form-item>
				<el-form-item label="建筑面积(m2):" style="width: 40%;" prop="buildingArea">
					<template>
						<el-input v-model="estateForm.buildingArea" ></el-input>
					</template>
				</el-form-item>
				<el-form-item label="土地面积(m2):" style="width: 40%;" prop="floorArea">
					<template>
						<el-input v-model="estateForm.floorArea" ></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估单价(万元):" style="width: 40%;" prop="assessUnitPrice">
					<template>
						<el-input v-model="estateForm.assessUnitPrice" ></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估总价(万元):" style="width: 40%;" prop="assessTotalPrice">
					<template>
						<el-input v-model="estateForm.assessTotalPrice" ></el-input>
					</template>
				</el-form-item>
				<el-form-item label="委托方:" style="width: 40%;" prop="client">
					<template>
						<el-input v-model="estateForm.client" ></el-input>
					</template>
				</el-form-item>
				<el-form-item label="第一报告人:" style="width: 40%;" prop="firstReporter">
					<template>
					  <el-select v-model="estateForm.firstReporter" placeholder="请选择" @change="selChange1(estateForm.firstReporter)">
					    <el-option
					      v-for="(item,index) in reportNameList"
					      :key="item.value"
					      :label="item.value"
					      :value="item.value"/>
					  </el-select>
					</template>
				</el-form-item>
				<el-form-item label="第一报告人注册号:" style="width: 40%;" prop="firstReporterRgNum">
					<template>
						<el-input v-model="estateForm.firstReporterRgNum" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人1:" style="width: 40%;" prop="partReporter1">
					<template>
					  <el-select v-model="estateForm.partReporter1" placeholder="请选择" @change="selChange2(estateForm.partReporter1)">
					    <el-option
					      v-for="(item,index) in reportNameList"
					      :key="item.value"
					      :label="item.value"
					      :value="item.value"/>
					  </el-select>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人1注册号:" style="width: 40%;" prop="partReporter1RgNum">
					<template>
						<el-input v-model="estateForm.partReporter1RgNum" disabled ></el-input>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人2:" style="width: 40%;" prop="partReporter2">
					<template>
					  <el-select v-model="estateForm.partReporter2" placeholder="请选择" @change="selChange3(estateForm.partReporter2)">
					    <el-option
					      v-for="(item,index) in reportNameList"
					      :key="item.value"
					      :label="item.value"
					      :value="item.value"/>
					  </el-select>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人2注册号:" style="width: 40%;" prop="partReporter2RgNum">
					<template>
						<el-input v-model="estateForm.partReporter2RgNum" disabled ></el-input>
					</template>
				</el-form-item>
				<el-form-item label="业务来源:" style="width: 40%;" prop="serviceSource">
					<template>
						<el-input v-model="estateForm.serviceSource" ></el-input>
					</template>
				</el-form-item>
				<el-form-item label="分公司:" style="width: 40%;" prop="branchOffice">
					<template>
						<el-input v-model="estateForm.branchOffice" disabled></el-input>
						<!-- <el-select v-model="estateForm.branchOffice" placeholder="请选择">
							<el-option v-for="(item,index) in cbranchOfficeList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select> -->
					</template>
				</el-form-item>
				<el-form-item label="业务收费(万元):" style="width: 40%;" prop="serviceCharge">
					<template>
						<el-input v-model="estateForm.serviceCharge" ></el-input>
					</template>
				</el-form-item>
				<el-form-item label="审核员:" style="width: 40%;" prop="checker">
					<template>
					  <el-select v-model="estateForm.checker" placeholder="请选择">
					    <el-option
					      v-for="(item,index) in checkerList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value"/>
					  </el-select>
					</template>
				</el-form-item>
				<el-form-item label="评估机构:" style="width: 80%;" prop="assessOrg">
					<template>
						<el-input v-model="estateForm.assessOrg" style="width: 400px;"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="文件上传" class="fl">
					<el-upload class="upload-demo" ref="upload" name="file" :action="UploadUrl ()" :data="uploadData" :on-preview="handlePreview"
					 accept=".doc,.docx" :on-remove="handleRemove"
					 :before-remove="beforeRemove" :auto-upload="false" :on-change="handleChange" multiple :limit="2" :on-exceed="handleExceed"
					 :file-list="fileList">
						<div prop="fileCheck" v-show="false">{{fileCheck}}</div>
						<el-button slot="trigger" size="small" type="primary">选择文件</el-button>
						<div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx</div>
					</el-upload>
				</el-form-item>
				<el-form-item style="display: block;">
					<el-button @click="submitForm()">提交</el-button>
					<el-button @click="cancelForm(estateForm)">返回</el-button>
					<el-button @click="restForm(estateForm)">重置</el-button>
					
				</el-form-item>
			</el-form>
		</template>
	</div>
</template>

<script>
	import axios from "axios"
	import {
		postReportDatas,
		uploadFileRequest,
		getDictionary
	} from '@/api/entry'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				estateForm: {
					reportType: '1',
					projectName: '',
					assessReportNum: '苏天房估',
					assessStartTime: '',
					assessEndTime: '',
					assessObject: '',
					valueTime: '',
					assessAim: '',
					assessMethod: '',
					valueType: '',
					buildingArea: '',
					floorArea: '',
					assessUnitPrice: '',
					assessTotalPrice: '',
					client: '',
					firstReporter: '',
					firstReporterRgNum: '',
					partReporter1: '',
					partReporter1RgNum: '',
					partReporter2: '',
					partReporter2RgNum: '',
					serviceSource: '',
					branchOffice: '',
					serviceCharge: '',
					checker: '',
					applicant:'',
					login: '',
					assessOrg: '江苏天圣房地产土地资产评估测绘有限公司'
				},
				formData: '',
				uploadFormData: '',
				editFormVisible: false,
				fileList: [],
				assess: '',
				cbranchOfficeList: [
					{
					"label": "分公司1",
					"value": "分公司1"
					}, {
						"label": "分公司2",
						"value": "分公司2"
					}
				],
				fileCheck:'',
				assessMethodList: '',
				valueTypeList: '',
				firstReporterList:'',
				partReporter1List:'',
				partReporter2List:'',
				checkerList:[
					{
						"label": "test",
						"value": "test"
					}, {
						"label": "check",
						"value": "check"
					}
				],
				fileName: '',
				projectName: '',
				file: '',
				inputRule: {
					projectName: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					assessReportNum: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					assessStartTime: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					assessEndTime: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					valueType: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					assessObject: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					valueTime: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					buildingArea: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					assessAim: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					assessMethod: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					assessUnitPrice: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					assessTotalPrice: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					landSite: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					landArea: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					landAmount: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					floorArea: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					client: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					clientEmail: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					clientPhone: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					firstReporter: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					firstReporterRgNum: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					partReporter1: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					partReporter1RgNum: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					partReporter2: [{
						required: false,
						trigger: 'blur',
						message: '不能为空'
					}],
					partReporter2RgNum: [{
						required: false,
						trigger: 'blur',
						message: '不能为空'
					}],
					serviceSource: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					branchOffice: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					serviceCharge: [{
						required: false,
						trigger: 'blur',
						message: '不能为空'
					}],
					checker: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					assessOrg: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					fileCheck: [ {required: true,trigger: 'blur',message: '不能为空'}]
				},
				arr1:[],
				nameList: '',
				arr: [],
				reportNameList: [],
				regList: []
			}
		},
		computed: {
			...mapGetters(['name','userInfo']),
			uploadData: function() {
				this.estateForm.applicant = this.name;
				this.estateForm.login = localStorage.getItem('userId')
				let parseData = JSON.stringify(this.estateForm);
				let params = {
					data: parseData
				}
				return params
			}
		},
		mounted() {
			this.getTreeData()
		},

		methods: {
			getTreeData(){
				this.estateForm.branchOffice = this.userInfo.department
				getDictionary().then( (res) => {
					console.log(res);
					let me = this
					this.assess = res.data.fdc2019[2].gjmd.reverse()
					this.assessMethodList = res.data.fdc2019[1].gjff.reverse()
					this.valueTypeList = res.data.fdc2019[0].jzlx.reverse()
					this.nameList = res.data.fdczcbg
					this.nameList.forEach(function(e,c){
						for(let key in e){
							me.arr.push(e[key])
						}
					})
					this.arr.forEach(function(e,c){
						me.reportNameList.push(e[1])
						// console.log(me.reportNameList)
						me.regList.push(e[0])
					})
				})	
			},
			searchTable(editForm) {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						// alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			newAdd() {
				this.editFormVisible = true;
			},
			UploadUrl() {
				return "http://fcpgpre.jstspg.com/rpt/index/saveRptOrFile"
			},
			submitUpload() {

				this.$refs.upload.submit();
			},
			uploadFile(file) {
				console.log(file);
			},
			handleChange(file, fileList) {
				this.fileList = fileList;
				this.file = file;
				this.fileCheck = fileList
				console.log(file)
			},
			submitForm() {
				// this.uploadData = this.estateForm
				this.$refs.estateForm.validate((valid) => {
				  if (valid) {
						if(this.fileCheck == ""){
												 this.$message({
																message:'请上传文件!', 
																type: 'warning'
															})
						}else{
							this.$confirm('确认提交该记录吗?', '提示', {
								type: 'warning'
							}).then(() => {
								this.$refs.upload.submit();
								this.$router.push({path:'/entryList/index'})
							}).catch(() => {
								
							});
						}
				  } else {
						console.log('error submit!!');
				  }
				});
			},
			cancelForm(estateForm) {
				this.$router.push({path:'/entryList/index'})
			},
			restForm() {
				this.$refs.estateForm.resetFields();
				// this.$refs.upload.clearFiles();
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
			},
			selChange1(val){
				// alert(val)
				console.log(this.reportNameList)
				console.log(this.regList)
				let me = this
				this.reportNameList.forEach(function(e,c){
					console.log(e)
					if(e.value == val){
						me.estateForm.firstReporterRgNum = me.regList[c].value
					}
				})
			},
			selChange2(val){
				// alert(val)
				console.log(this.reportNameList)
				console.log(this.regList)
				let me = this
				this.reportNameList.forEach(function(e,c){
					console.log(e)
					if(e.value == val){
						me.estateForm.partReporter1RgNum = me.regList[c].value
					}
				})
			},
			selChange3(val){
				// alert(val)
				console.log(this.reportNameList)
				console.log(this.regList)
				let me = this
				this.reportNameList.forEach(function(e,c){
					console.log(e)
					if(e.value == val){
						me.estateForm.partReporter2RgNum = me.regList[c].value
					}
				})
			}
		}
	}
</script>

<style scoped>
	.el-date-editor.el-input{
		width: 188px;
	}
	.el-select{
		width: 188px !important;
	}
</style>
