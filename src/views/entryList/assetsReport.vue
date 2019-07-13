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
				<el-form-item label="价值时点:" style="width: 40%;" prop="valueTime">
					<template>
						<el-date-picker v-model="estateForm.valueTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd"></el-date-picker>
					</template>
				</el-form-item>
				<el-form-item label="估价对象:" style="width: 40%;" prop="assessObject">
					<template>
						<el-input v-model="estateForm.assessObject"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="是否国有资产评估业务:" style="width: 40%;" prop="isStateAssets">
					<template>
						<el-select v-model="estateForm.isStateAssets" placeholder="请选择">
							<el-option v-for="(item,index) in assessAimList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="是否私发资产评估业务:" style="width: 40%;" prop="isPrivateAsset">
					<template>
						<el-select v-model="estateForm.isPrivateAsset" placeholder="请选择">
							<el-option v-for="(item,index) in assessMethodList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="评估目的:" style="width: 40%;" prop="assessAim">
					<template>
						<el-input v-model="estateForm.assessAim"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估对象:" style="width: 40%;" prop="assessTotalPrice">
					<template>
						<el-input v-model="estateForm.assessTotalPrice"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="价值类型:" style="width: 40%;" prop="valueType">
					<template>
						<el-input v-model="estateForm.valueType"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估方法:" style="width: 40%;" prop="assessMethod">
					<template>
						<el-input v-model="estateForm.assessMethod"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估结论(万元):" style="width: 40%;" prop="assessResult">
					<template>
						<el-input v-model="estateForm.assessResult"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估基准日" style="width: 40%;" prop="assessDate">
					<template>
						<el-input v-model="estateForm.assessDate"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="实际收费金额(万元):" style="width: 40%;" prop="actualFee">
					<template>
						<el-input v-model="estateForm.actualFee"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="资产评估报告日:" style="width: 40%;" prop="assetsReportDate">
					<template>
						<el-input v-model="estateForm.assetsReportDate"></el-input>
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
				<el-form-item label="文件上传" class="fl" style="display: block;">
					<el-upload class="upload-demo" ref="upload" name="file" :action="UploadUrl ()" :data="uploadData" :on-preview="handlePreview"
					 accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx" :on-remove="handleRemove"
					 :before-remove="beforeRemove" :auto-upload="false" :on-change="handleChange" multiple :limit="1" :on-exceed="handleExceed"
					 :file-list="fileList">
						<el-button slot="trigger" size="small" type="primary">选择文件</el-button>
						<div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg</div>
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
	export default {
		data() {
			return {
				estateForm: {
					reportType: '3',
					projectName: '',
					assessReportNum: '',
					assessObject: '',
					valueTime: '',
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
					netAssets: ''
				},
				checkForm: {
					checkAccount: '12个'
				},
				editFormVisible: false,
				fileList: [],
				assessAimList: [{
					"label": "是",
					"value": "是"
				}, {
					"label": "否",
					"value": "否"
				}],
				assessMethodList: [{
					"label": "是",
					"value": "是"
				}, {
					"label": "否",
					"value": "否"
				}],
				valueTypeList: [{
					"label": "出让",
					"value": "出让"
				}, {
					"label": "不出让",
					"value": "不出让"
				}],
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
					netAssets: [ {required: true,trigger: 'blur',message: '不能为空'}]
				}
			}
		},
		computed: {
			uploadData: function() {
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
						this.$confirm('确认提交该记录吗?', '提示', {
							type: 'warning'
						}).then(() => {
							this.$refs.upload.submit();
							// this.$router.push({path:'/entryList/index'})
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

<style>
</style>
