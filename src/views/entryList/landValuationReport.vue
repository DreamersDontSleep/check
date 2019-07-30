<template>
	<div style="margin-left: 30px;">
		<h3>基本信息</h3>
		<template>
			<el-form :inline="true" :model="estateForm" ref="estateForm" :rules="inputRule" label-width="180px">
				<el-form-item label="报告类型:" style="display: block;">
					<template>
						<div v-if="estateForm.reportType == 2">
							<el-input value="土地估价报告" disabled></el-input>
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
						<el-input v-model="estateForm.assessReportNum"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="估价作业开始时间:" style="width: 40%;" prop="assessStartTime">
					<template>
						<el-date-picker v-model="estateForm.assessStartTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd"></el-date-picker>
					</template>
				</el-form-item>
				<el-form-item label="估价作业结束时间:" style="width: 40%;" prop="assessEndTime">
					<template>
						<el-date-picker v-model="estateForm.assessEndTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd"></el-date-picker>
					</template>
				</el-form-item>
				<el-form-item label="估价时点:" style="width: 40%;" prop="valueTime">
					<template>
						<el-date-picker v-model="estateForm.valueTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd"></el-date-picker>
					</template>
				</el-form-item>
				<el-form-item label="估价对象:" style="width: 40%;" prop="assessObject">
					<template>
						<el-input v-model="estateForm.assessObject"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="估价目的:" style="width: 40%;" prop="assessAim">
					<template>
						<el-select v-model="estateForm.assessAim" multiple placeholder="请选择">
							<el-option v-for="(item,index) in assessAimList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="估价方法:" style="width: 40%;" prop="assessMethod">
					<template>
						<!-- <el-input v-model="estateForm.assessMethod"></el-input> -->
						<el-select v-model="estateForm.assessMethod" placeholder="请选择">
							<el-option v-for="(item,index) in assessMethodList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="宗地位置:" style="width: 40%;" prop="landSite">
					<template>
						<el-input v-model="estateForm.landSite"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="宗地面积(m2):" style="width: 40%;" prop="landArea">
					<template>
						<el-input v-model="estateForm.landArea"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="宗地数:" style="width: 40%;" prop="landAmount">
					<template>
						<el-input v-model="estateForm.landAmount"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估单价(万元):" style="width: 40%;" prop="assessUnitPrice">
					<template>
						<el-input v-model="estateForm.assessUnitPrice"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估总价:(万元)" style="width: 40%;" prop="assessTotalPrice">
					<template>
						<el-input v-model="estateForm.assessTotalPrice"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="委托方:" style="width: 40%;" prop="client">
					<template>
						<el-input v-model="estateForm.client"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="委托人邮箱:" style="width: 40%;" prop="clientEmail">
					<template>
						<el-input v-model="estateForm.clientEmail"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="委托人电话:" style="width: 40%;" prop="clientPhone">
					<template>
						<el-input v-model="estateForm.clientPhone"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="第一报告人:" style="width: 40%;" prop="firstReporter">
					<template>
						<!-- <el-input v-model="estateForm.assessMethod"></el-input> -->
						<el-select v-model="estateForm.firstReporter" placeholder="请选择">
							<el-option v-for="(item,index) in firstReporterList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="第一报告人注册号:" style="width: 40%;" prop="firstReporterRgNum">
					<template>
						<el-input v-model="estateForm.firstReporterRgNum"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人1:" style="width: 40%;" prop="partReporter1">
					<template>
						<!-- <el-input v-model="estateForm.assessMethod"></el-input> -->
						<el-select v-model="estateForm.partReporter1" placeholder="请选择">
							<el-option v-for="(item,index) in partReporter1List" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人1注册号:" style="width: 40%;" prop="partReporter1RgNum">
					<template>
						<el-input v-model="estateForm.partReporter1RgNum"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人2:" style="width: 40%;" prop="partReporter2">
					<template>
						<!-- <el-input v-model="estateForm.assessMethod"></el-input> -->
						<el-select v-model="estateForm.partReporter2" placeholder="请选择">
							<el-option v-for="(item,index) in partReporter2List" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人2注册号:" style="width: 40%;" prop="partReporter2RgNum">
					<template>
						<el-input v-model="estateForm.partReporter2RgNum"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="业务来源:" style="width: 40%;" prop="serviceSource">
					<template>
						<el-input v-model="estateForm.serviceSource"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="分公司:" style="width: 40%;" prop="branchOffice">
					<template>
						<!-- <el-input v-model="estateForm.assessMethod"></el-input> -->
						<el-select v-model="estateForm.branchOffice" placeholder="请选择">
							<el-option v-for="(item,index) in cbranchOfficeList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="业务收费(万元):" style="width: 40%;" prop="serviceCharge">
					<template>
						<el-input v-model="estateForm.serviceCharge"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="审核员:" style="width: 40%;" prop="checker">
					<template>
						<!-- <el-input v-model="estateForm.assessMethod"></el-input> -->
						<el-select v-model="estateForm.checker" placeholder="请选择">
							<el-option v-for="(item,index) in checkerList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
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
					 :before-remove="beforeRemove" :auto-upload="false" :on-change="handleChange" multiple :limit="1" :on-exceed="handleExceed"
					 :file-list="fileList">
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
	import {
		postReportData
	} from '@/api/entry'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			const checkPhone = (rule, value, callback) => {
			if (!value) {
			  return callback(new Error('手机号不能为空'));
			} else {
			  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
			  console.log(reg.test(value));
			  if (reg.test(value)) {
				callback();
			  } else {
				return callback(new Error('请输入正确的手机号'));
			  }
			}
			}
			const checkEmail = (rule, value, callback) => {
			  if (!value) {
			    return callback(new Error('邮箱地址不能为空'));
			  } else {
				let temp = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
			    if (value && (!(temp).test(value))) {
				  callback(new Error('邮箱格式不符合规范'))
				} else {
				  callback()
				}
			  }
			}
			return {
				estateForm: {
					reportType: '2',
					projectName: '',
					assessReportNum: '苏天房估',
					assessStartTime: '',
					assessEndTime: '',
					assessObject: '',
					valueTime: '',
					assessAim: '',
					assessMethod: '',
					assessUnitPrice: '',
					assessTotalPrice: '',
					landSite: '',
					landArea:'',
					landAmount: '',
					client: '',
					clientPhone:'',
					clientEmail: '',
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
				checkForm: {
					checkAccount: '12个'
				},
				editFormVisible: false,
				fileList: [],
				assessAimList: [{
					"label": "出让",
					"value": "出让"
				}, {
					"label": "转让",
					"value": "转让"
				}, {
					"label": "抵押",
					"value": "抵押"
				}, {
					"label": "征收",
					"value": "征收"
				}, {
					"label": "司法",
					"value": "司法"
				}, {
					"label": "咨询",
					"value": "咨询"
				}, {
					"label": "其他",
					"value": "其他"
				}],
				assessMethodList: [{
					"label": "比较法",
					"value": "比较法"
				}, {
					"label": "收益法",
					"value": "收益法"
				}, {
					"label": "成本法",
					"value": "成本法"
				}, {
					"label": "假设开发法",
					"value": "假设开发法"
				}, {
					"label": "基准地价修正法",
					"value": "基准地价修正法"
				}, {
					"label": "其他",
					"value": "其他"
				}],
				cbranchOfficeList: [{
					"label": "分公司1",
					"value": "分公司1"
				}, {
					"label": "分公司2",
					"value": "分公司2"
				}
				],
				firstReporterList:[
					{
						"label": "name1",
						"value": "name1"
					}, {
						"label": "name2",
						"value": "name2"
					}, {
						"label": "name3",
						"value": "name3"
					}, {
						"label": "name4",
						"value": "name4"
					}
				],
				partReporter1List:[
					{
						"label": "name1",
						"value": "name1"
					}, {
						"label": "name2",
						"value": "name2"
					}, {
						"label": "name3",
						"value": "name3"
					}, {
						"label": "name4",
						"value": "name4"
					}
				],
				partReporter2List:[
					{
						"label": "name1",
						"value": "name1"
					}, {
						"label": "name2",
						"value": "name2"
					}, {
						"label": "name3",
						"value": "name3"
					}, {
						"label": "name4",
						"value": "name4"
					}
				],
				checkerList:[
					{
						"label": "test",
						"value": "test"
					}, {
						"label": "check",
						"value": "check"
					}
				],
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
					client: [{
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					clientEmail: [{
						required: true,
						trigger: 'blur',
						validator:checkEmail
					}],
					clientPhone: [{
						required: true,
						trigger: 'blur',
						validator: checkPhone 
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
						required: true,
						trigger: 'blur',
						message: '不能为空'
					}],
					partReporter2RgNum: [{
						required: true,
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
						required: true,
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
					}]
				}

			}
		},
		computed: {
			...mapGetters(['name']),
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
		methods: {
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
				console.log(file)
			},
			submitForm() {
				this.$refs.estateForm.validate((valid) => {
				  if (valid) {
						this.$confirm('确认提交该记录吗?', '提示', {
							type: 'warning'
						}).then(() => {
							this.$refs.upload.submit();
							this.$router.push({path:'/entryList/index'})
						}).catch(() => {
							
						});
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
