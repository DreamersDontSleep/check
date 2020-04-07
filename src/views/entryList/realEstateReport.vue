<template>
	<div style="margin-left: 30px;" ref="print" id="print">
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
						<el-input v-model="estateForm.projectName"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="估价报告编号:" style="width: 40%;" prop="assessReportNum">
					<template>
						<el-input v-model="estateForm.assessReportNum"></el-input>
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
						<el-input v-model="estateForm.assessObject"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="估价目的:" style="width: 40%;" prop="assessAim">
					<template>
						<el-select v-model="estateForm.assessAim" placeholder="请选择">
							<el-option v-for="(item,index) in assess" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="估价方法:" style="width: 40%;" prop="assessMethod">
					<template>
						<el-select v-model="estateForm.assessMethod" multiple placeholder="请选择">
							<el-option v-for="(item,index) in assessMethodList" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="价值类型:" style="width: 40%;" prop="valueType">
					<template>
						<el-select v-model="estateForm.valueType" placeholder="请选择">
							<el-option v-for="(item,index) in valueTypeList" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="建筑面积(m2):" style="width: 40%;" prop="buildingArea">
					<template>
						<el-input v-model.number="estateForm.buildingArea"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="土地面积(m2):" style="width: 40%;" prop="floorArea">
					<template>
						<el-input v-model.number="estateForm.floorArea"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估单价(元):" style="width: 40%;" prop="assessUnitPrice">
					<template>
						<el-input v-model.number="estateForm.assessUnitPrice"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估总价(元):" style="width: 40%;" prop="assessTotalPrice">
					<template>
						<el-input v-model.number="estateForm.assessTotalPrice"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="委托方:" style="width: 40%;" prop="client">
					<template>
						<el-input v-model="estateForm.client"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="第一报告人:" style="width: 40%;" prop="firstReporter">
					<template>
						<el-select v-model="estateForm.firstReporter" filterable placeholder="请选择" @change="selChange1(estateForm.firstReporter)">
							<el-option v-for="(item,index) in reportNameList" :key="item.value" :label="item.value" :value="item.value" />
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
						<el-select v-model="estateForm.partReporter1" filterable placeholder="请选择" @change="selChange2(estateForm.partReporter1)">
							<el-option v-for="(item,index) in reportNameList" :key="item.value" :label="item.value" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人1注册号:" style="width: 40%;" prop="partReporter1RgNum">
					<template>
						<el-input v-model="estateForm.partReporter1RgNum" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人2:" style="width: 40%;" prop="partReporter2">
					<template>
						<el-select v-model="estateForm.partReporter2" filterable placeholder="请选择" @change="selChange3(estateForm.partReporter2)">
							<el-option v-for="(item,index) in reportNameList" :key="item.value" :label="item.value" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人2注册号:" style="width: 40%;" prop="partReporter2RgNum">
					<template>
						<el-input v-model="estateForm.partReporter2RgNum" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="业务来源:" style="width: 40%;" prop="serviceSource">
					<template>
						<el-input v-model="estateForm.serviceSource"></el-input>
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
				<el-form-item label="业务收费(元):" style="width: 40%;" prop="serviceCharge">
					<template>
						<el-input v-model="estateForm.serviceCharge"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="产权人:" style="width: 40%;" prop="propertyOwner">
					<template>
						<el-input v-model="estateForm.propertyOwner"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="审核员:" style="width: 40%;" prop="checker">
					<template>
						<el-select v-model="estateForm.checker" filterable placeholder="请选择">
							<el-option v-for="(item,index) in checkerList" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="评估机构:" style="width: 80%;" prop="assessOrg">
					<template>
						<el-input v-model="estateForm.assessOrg" style="width: 400px;"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="文件名:" style="width: 40%;" prop="realName">
					<template>
						<el-input v-model="estateForm.realName"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="文件上传" class="fl" style="width: 80%;">
					<el-upload class="upload-demo" ref="upload" name="file" :action="UploadUrl ()" :on-preview="handlePreview"
					 accept=".pdf" :on-remove="handleRemove" :before-remove="beforeRemove" :auto-upload="true" :on-success="handleSuccess"
					 :on-change="handleChange" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList">
						<div prop="fileCheck" v-show="false">{{fileCheck}}</div>
						<el-button slot="trigger" size="small" type="primary">选择文件</el-button>
						<div slot="tip" class="el-upload__tip">支持扩展名：.pdf</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="文件上传(压缩文件)" class="fl" style="width: 80%;">
					<el-upload class="upload-demo" ref="upload2" name="file" :action="UploadUrl ()" :on-preview="handlePreview"
					 accept=".rar,.zip" :on-remove="handleRemove" :before-remove="beforeRemove" :auto-upload="true" :on-success="handleSuccess2"
					 :on-change="handleChange2" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList2">
						<div prop="fileCheck2" v-show="false">{{fileCheck2}}</div>
						<el-button slot="trigger" size="small" type="primary">选择文件</el-button>
						<div slot="tip" class="el-upload__tip">支持扩展名：.rar,.zip</div>
					</el-upload>
				</el-form-item>
				<el-form-item style="display: block;">
					<el-button @click="submitForm(estateForm)">提交</el-button>
					<el-button @click="cancelForm(estateForm)">返回</el-button>
					<el-button @click="restForm(estateForm)">重置</el-button>
					<el-button @click="print(estateForm)">打印</el-button>
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
		getDictionary,
		postsaveRpt
	} from '@/api/entry'
	import {
		mapGetters
	} from 'vuex'
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
					applicant: '',
					login: '',
					pdfUri: '',
					wordUri: '',
					upFileURI: '',
					assessOrg: '江苏天圣房地产土地资产评估测绘有限公司',
					realName: ''
				},
				formData: '',
				uploadStatus: false,
				uploadFormData: '',
				editFormVisible: false,
				fileList: [],
				fileList2: [],
				assess: '',
				cbranchOfficeList: [{
					"label": "分公司1",
					"value": "分公司1"
				}, {
					"label": "分公司2",
					"value": "分公司2"
				}],
				fileCheck: '',
				fileCheck2: '',
				assessMethodList: '',
				valueTypeList: '',
				firstReporterList: '',
				partReporter1List: '',
				partReporter2List: '',
				checkerList: '',
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
					}, { type:'number', message: '必须是数字' }],
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
					}, { type:'number', message: '必须是数字' }],
					assessTotalPrice: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}, { type:'number', message: '必须是数字' }],
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
					}, { type:'number', message: '必须是数字' }],
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
					fileCheck: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					propertyOwner: [{ required: true, trigger: 'blur', message: '不能为空' }],
				},
				arr1: [],
				nameList: '',
				arr: [],
				reportNameList: [],
				regList: [],
				rptId: ''
			}
		},
		computed: {
			...mapGetters(['name', 'userInfo'])
		},
		mounted() {
			this.getTreeData()
			this.estateForm.applicant = this.name
			this.estateForm.login = localStorage.getItem('userId')
		},

		methods: {
			getTreeData() {
				// this.estateForm.branchOffice = this.userInfo.department
				getDictionary().then((res) => {
					console.log(res);
					let me = this
					console.log("权限数据源",res);
					// 重新匹配分公司数据
					let depData = res.data.fgs
					let depArr = [];
					for(let i = 0; i < depData.length; i++){
						let obj = {id: '',name: ''};
						console.log(depData[0])
							for(let key in depData[i]){
								obj.id = depData[i][key][0].value;
								obj.name = depData[i][key][1].value;
								depArr.push(obj);
							}
					}
					console.log("城市数据",depArr)
					depArr.forEach(function(e) {
						if (e.id == me.userInfo.department) {
							me.estateForm.branchOffice = e.name
						}else{
							me.estateForm.branchOffice = me.userInfo.department
						}
					})
					
					this.assess = res.data.fdc2019[2].gjmd.reverse()
					this.assessMethodList = res.data.fdc2019[1].gjff.reverse()
					this.valueTypeList = res.data.fdc2019[0].jzlx.reverse()
					this.nameList = res.data.fdczcbg
					this.checkerList = res.data.sh2019[0].list
					this.nameList.forEach(function(e, c) {
						for (let key in e) {
							me.arr.push(e[key])
						}
					})
					this.arr.forEach(function(e, c) {
						me.reportNameList.push(e[1])
						// console.log(me.reportNameList)
						me.regList.push(e[0])
					})
				})
			},
			print(estateForm){
			    this.$refs.estateForm.validate((valid) => {
			    	if (valid) {
			    		// alert('submit!');
			    		console.log(estateForm);
			    		this.$router.push({path:'/entryList/print',query:{'contents': estateForm}})
			    	} else {
			    		this.$message({
			    			message: '请输入必填字段!',
			    			type: 'warning'
			    		})
			    		return false;
			    	}
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
				let $url = window.location.href.substring(7,11);
				console.log($url)
				if($url == "loca"){
					return "rpt/index/upLoad"
				}else if($url == "fcpg"){
					return "http://fcpgpre.jstspg.com/rpt/index/upLoad"
				}else if($url == 'bgsp'){
					return "http://bgsp.jstspg.com/rpt/index/upLoad"
				}
			},
			submitUpload() {
				this.UploadUrl()
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
			handleChange2(file, fileList) {
				this.fileList2 = fileList;
				this.file = file;
				this.fileCheck2 = fileList
				console.log(file)
			},
			submitForm(estateForm) {
				this.$refs.estateForm.validate((valid) => {
					if (valid) {
						if (this.fileCheck == "") {
							this.$message({
								message: '请上传文件!',
								type: 'warning'
							})
						} else {
							this.$confirm('确认提交该记录吗?', '提示', {
								type: 'warning'
							}).then(() => {
								// this.$refs.upload.submit();
								// this.$router.push({
								// 	path: '/entryList/index'
								// })
								// console.log(estateForm)
								let para = estateForm
								console.log(para)
								postsaveRpt(para).then ( (res) => {
									if(res.code == 200){
										console.log(res)
										this.rptId = res.data
										this.$message({
											message:'提交成功!', 
											type: 'success'
										})
										this.$router.push({path:'/entryList/index'})
									}
								})
							}).catch(() => {

							});
						}
					} else {
						this.$message({
							message: '请输入必填字段!',
							type: 'warning'
						})
					}
				});
			},
			cancelForm(estateForm) {
				this.$router.push({
					path: '/entryList/index'
				})
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
			handleSuccess(response, file, fileList) {
				console.log(response);
				if (response.code == 200) {
					console.log(this.estateForm)
					this.estateForm.pdfUri = response.data[0].pdfPath
					this.estateForm.wordUri = response.data[0].wordPath
					this.estateForm.realName = file.name.substring(0,file.name.length-4)
				} else {
					return;
				}
			},
			handleSuccess2(response, file, fileList) {
				console.log(response);
				if (response.code == 200) {
					console.log(this.estateForm)
					this.estateForm.upFileURI = response.data[0].wordPath
				} else {
					return;
				}
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			selChange1(val) {
				// alert(val)
				console.log(this.reportNameList)
				console.log(this.regList)
				let me = this
				this.reportNameList.forEach(function(e, c) {
					console.log(e)
					if (e.value == val) {
						me.estateForm.firstReporterRgNum = me.regList[c].value
					}
				})
			},
			selChange2(val) {
				// alert(val)
				console.log(this.reportNameList)
				console.log(this.regList)
				let me = this
				this.reportNameList.forEach(function(e, c) {
					console.log(e)
					if (e.value == val) {
						me.estateForm.partReporter1RgNum = me.regList[c].value
					}
				})
			},
			selChange3(val) {
				// alert(val)
				console.log(this.reportNameList)
				console.log(this.regList)
				let me = this
				this.reportNameList.forEach(function(e, c) {
					console.log(e)
					if (e.value == val) {
						me.estateForm.partReporter2RgNum = me.regList[c].value
					}
				})
			}
		}
	}
</script>

<style scoped>
	.el-date-editor.el-input {
		width: 188px;
	}

	.el-select {
		width: 188px !important;
	}
</style>
