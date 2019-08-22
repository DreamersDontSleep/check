<template>
	<div style="margin-left: 30px;">
		<h3>基本信息</h3>
		<template>
			<el-form :inline="true" :model="estateForm" ref="estateForm" :rules="inputRule" label-width="180px">
				<el-form-item label="报告类型:" style="display: block;" prop="reportType">
					<template>
						<div v-if="estateForm.reportType == 3">
							<el-input value="资产评估报告" disabled></el-input>
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
				<el-form-item label="委托方:" style="width: 40%;" prop="client">
					<template>
						<el-input v-model="estateForm.client"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="被评估单位名称:" style="width: 40%;" prop="assessedUnitName">
					<template>
						<el-input v-model="estateForm.assessedUnitName"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="是否国有资产评估业务:" style="width: 40%;" prop="isStateAssets">
					<template>
						<el-select v-model="estateForm.isStateAssets" placeholder="请选择">
							<el-option v-for="(item,index) in isStateAssetsList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="是否司法资产评估业务:" style="width: 40%;" prop="isPrivateAsset">
					<template>
						<el-select v-model="estateForm.isPrivateAsset" placeholder="请选择">
							<el-option v-for="(item,index) in isPrivateAssetList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="评估目的:" style="width: 40%;" prop="assessAim">
					<template>
						<el-select v-model="estateForm.assessAim" multiple placeholder="请选择">
							<el-option v-for="(item,index) in assessAimList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="评估对象:" style="width: 40%;" prop="assessObj">
					<template>
						<el-select v-model="estateForm.assessObj" placeholder="请选择">
							<el-option v-for="(item,index) in assessObjList " :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="价值类型:" style="width: 40%;" prop="valueType">
					<template>
						<el-select v-model="estateForm.valueType" placeholder="请选择">
							<el-option v-for="(item,index) in valueTypeList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="评估方法:" style="width: 40%;" prop="assessMethod">
					<template>
						<el-select v-model="estateForm.assessMethod" placeholder="请选择">
							<el-option v-for="(item,index) in assessMethodList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="评估结论(万元):" style="width: 40%;" prop="assessResult">
					<template>
						<el-input v-model="estateForm.assessResult"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估基准日" style="width: 40%;" prop="assessDate">
					<template>
						<el-date-picker v-model="estateForm.assessDate" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd"></el-date-picker>
					</template>
				</el-form-item>
				<el-form-item label="实际收费金额(万元):" style="width: 40%;" prop="actualFee">
					<template>
						<el-input v-model="estateForm.actualFee"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="资产评估报告日:" style="width: 40%;" prop="assetsReportDate">
					<template>
						<!-- <el-input v-model="estateForm.assetsReportDate"></el-input> -->
						<el-date-picker v-model="estateForm.assetsReportDate" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd"></el-date-picker>
					</template>
				</el-form-item>
				<el-form-item label="分公司:" style="width: 40%;" prop="branchOffice">
					<template>
						<!-- <el-input v-model="estateForm.assessMethod"></el-input> -->
						<el-input v-model="estateForm.branchOffice" disabled></el-input>
						<!-- <el-select v-model="estateForm.branchOffice" placeholder="请选择">
							<el-option v-for="(item,index) in cbranchOfficeList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select> -->
					</template>
				</el-form-item>
				<el-form-item label="总资产账面值:" style="width: 40%;" prop="assetsFee">
					<template>
						<el-input v-model="estateForm.assetsFee"></el-input>
						<!-- <el-radio></el-radio>无账面价值 -->
					</template>
				</el-form-item>
				<el-form-item label="总负债账面值:" style="width: 40%;" prop="debtFee">
					<template>
						<el-input v-model="estateForm.debtFee"></el-input>
						<!-- <el-radio></el-radio>无账面价值 -->
					</template>
				</el-form-item>
				<el-form-item label="净资产账面值:" style="width: 40%;" prop="netAssets">
					<template>
						<el-input v-model="estateForm.netAssets"></el-input>
						<!-- <el-radio></el-radio>无账面价值 -->
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
				<el-form-item label="文件上传" class="fl" style="display: block;">
					<el-upload class="upload-demo" ref="upload" name="file" :action="UploadUrl ()" :on-preview="handlePreview"
					 accept=".doc,.docx" :on-remove="handleRemove"  :on-success="handleSuccess"
					 :before-remove="beforeRemove" :auto-upload="true" :on-change="handleChange" multiple :limit="1" :on-exceed="handleExceed"
					 :file-list="fileList">
						<div prop="fileCheck" v-show="false">{{fileCheck}}</div>
						<el-button slot="trigger" size="small" type="primary">选择文件</el-button>
						<div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="文件上传(压缩文件)" class="fl" style="width: 80%;">
					<el-upload class="upload-demo" ref="upload2" name="file" :action="UploadUrl ()" :on-preview="handlePreview"
					 accept=".rar,.zip" :on-remove="handleRemove" :before-remove="beforeRemove" :auto-upload="true" :on-success="handleSuccess2"
					 :on-change="handleChange2" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList2">
						<div prop="fileCheck" v-show="false">{{fileCheck}}</div>
						<el-button slot="trigger" size="small" type="primary">选择文件</el-button>
						<div slot="tip" class="el-upload__tip">支持扩展名：.rar,.zip</div>
					</el-upload>
				</el-form-item>
				<el-form-item style="display: block;">
					<el-button @click="submitForm(estateForm)">提交</el-button>
					<el-button @click="cancelForm(estateForm)">返回</el-button>
					<el-button @click="restForm(estateForm)">重置</el-button>
				</el-form-item>
			</el-form>
		</template>
	</div>
</template>

<script>
	import {
		postReportData,
		getDictionary,
		postsaveRpt
	} from '@/api/entry'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				estateForm: {
					reportType: '3',
					projectName: '',
					assessReportNum: '苏天房估',
					assessedUnitName: '',
					client: '',
					assessAim: '',
					assessMethod: '',
					valueType: '',
					assessTotalPrice: '',
					isStateAssets: '',
					isPrivateAsset: '',
					assessResult: '',
					assessDate: '',
					actualFee: '',
					assetsReportDate: '',
					assetsFee: '',
					debtFee: '',
					applicant:'',
					checker: '',
					netAssets: '',
					branchOffice: '',
					login: '',
					pdfUri: '',
					wordUri: '',
					upFileURI: '',
					assessObj: ''
				},
				checkForm: {
					checkAccount: '12个'
				},
				editFormVisible: false,
				fileList: [],
				fileList2: [],
				isStateAssetsList: [{
					"label": "是",
					"value": "是"
				}, {
					"label": "否",
					"value": "否"
				}],
				isPrivateAssetList: [{
					"label": "是",
					"value": "是"
				}, {
					"label": "否",
					"value": "否"
				}],
				fileCheck:'',
				assessAimList: '',
				assessObjList:'',
				cbranchOfficeList: [{
					"label": "分公司1",
					"value": "分公司1"
				}, {
					"label": "分公司2",
					"value": "分公司2"
				}
				],
				valueTypeList: '',
				assessMethodList: '',
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
					projectName: [{required: true,trigger: 'blur',message: '不能为空'}],
					assessReportNum: [ {required: true,trigger: 'blur',message: '不能为空'}],
					assessObject: [ {required: true,trigger: 'blur',message: '不能为空'}],
					valueTime: [ {required: true,trigger: 'blur',message: '不能为空'}],
					assessAim: [ {required: true,trigger: 'blur',message: '不能为空'}],
					assessMethod: [ {required: true,trigger: 'blur',message: '不能为空'}],
					valueType: [ {required: true,trigger: 'blur',message: '不能为空'}],
					assessTotalPrice: [ {required: true,trigger: 'blur',message: '不能为空'}],
					isStateAssets: [ {required: true,trigger: 'blur',message: '不能为空'}],
					isPrivateAsset: [ {required: true,trigger: 'blur',message: '不能为空'}],
					assessResult: [ {required: true,trigger: 'blur',message: '不能为空'}],
					assessDate: [ {required: true,trigger: 'blur',message: '不能为空'}],
					actualFee: [ {required: true,trigger: 'blur',message: '不能为空'}],
					assetsReportDate: [ {required: true,trigger: 'blur',message: '不能为空'}],
					assetsFee: [ {required: true,trigger: 'blur',message: '不能为空'}],
					debtFee: [ {required: true,trigger: 'blur',message: '不能为空'}],
					checker: [{required: true,trigger: 'blur',message: '不能为空'}],
					netAssets: [ {required: true,trigger: 'blur',message: '不能为空'}],
					fileCheck: [ {required: true,trigger: 'blur',message: '不能为空'}]
				}
			}
		},
		computed: {
			...mapGetters(['name','userInfo'])
		},
		mounted() {
			this.getTreeData()
			this.estateForm.applicant = this.name;
			this.estateForm.login = localStorage.getItem('userId')
		},
		methods: {
			getTreeData(){
				this.estateForm.branchOffice = this.userInfo.department
				getDictionary().then( (res) => {
					console.log(res);
					this.assessAimList = res.data.zzpg2019[4].zcpgmd.reverse()
					this.assessObjList = res.data.zzpg2019[3].zcpgdx.reverse()
					this.valueTypeList = res.data.zzpg2019[2].zcjzlx.reverse()
					this.assessMethodList = res.data.zzpg2019[1].zcpgff.reverse()
					this.checkerList = res.data.sh2019[0].list
					// console.log(this.assess)
				})	
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
			UploadUrl() {
				return "http://fcpgpre.jstspg.com/rpt/index/upLoad"
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
				// console.log(file)
			},
			handleChange2(file, fileList) {
				this.fileList2 = fileList;
				this.file = file;
				this.fileCheck = fileList
				console.log(file)
			},
			submitForm(estateForm) {
				if(this.estateForm.isStateAssets == '是'){
					this.estateForm.isStateAssets = 1
				}else{
					this.estateForm.isStateAssets = 0
				}
				
				if(this.estateForm.isPrivateAsset == '是'){
					this.estateForm.isPrivateAsset = 1
				}else{
					this.estateForm.isPrivateAsset = 0
				}
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
			handleSuccess(response, file, fileList) {
				// console.log(response);
				if (response.code == 200) {
					console.log(this.estateForm)
					this.estateForm.pdfUri = response.data[0].pdfPath
					this.estateForm.wordUri = response.data[0].wordPath
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
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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

