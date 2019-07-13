<template>
	<div style="margin-left: 30px;">
		<h3>基本信息</h3>
		<template>
			<el-form :inline="true" :model="estateForm" ref="estateForm" label-width="180px">
				<el-form-item label="报告类型:" style="display: block;">
					<template>
						<el-input value="资产评估报告" disabled></el-input>
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
				<el-form-item label="价值时点:" style="width: 40%;">
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
				<el-form-item label="是否国有资产评估业务:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.isStateAssets" disabled></el-input>
					<!-- 	<el-select v-model="estateForm.isStateAssets" placeholder="请选择">
							<el-option v-for="(item,index) in assessAimList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select> -->
					</template>
				</el-form-item>
				<el-form-item label="是否私发资产评估业务:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.isPrivateAsset" disabled></el-input>
						<!-- <el-select v-model="estateForm.isPrivateAsset" placeholder="请选择">
							<el-option v-for="(item,index) in assessMethodList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select> -->
					</template>
				</el-form-item>
				<el-form-item label="评估目的:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessAim" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估对象:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessTotalPrice" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="价值类型:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.valueType" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估方法:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessMethod" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估结论(万元):" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessResult" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估基准日" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessDate" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="实际收费金额(万元):" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.actualFee" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="资产评估报告日:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assetsReportDate" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="总资产账面值:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assetsFee" disabled></el-input>
						<!-- <el-radio></el-radio>无账面价值 -->
					</template>
				</el-form-item>
				<el-form-item label="总负债账面值:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.debtFee" disabled></el-input>
						<!-- <el-radio></el-radio>无账面价值 -->
					</template>
				</el-form-item>
				<el-form-item label="净资产账面值:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.netAssets" disabled></el-input>
						<!-- <el-radio></el-radio>无账面价值 -->
					</template>
				</el-form-item>
				<el-form-item label="文件上传" class="fl" style="display: block;">
					<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
					 accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx" :on-remove="handleRemove"
					 :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg</div>
						<!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
					</el-upload>
				</el-form-item>
				<el-form-item style="display: block;">
					<el-button @click="submitForm(estateForm)">提交</el-button>
					<el-button @click="cancelForm(estateForm)">取消</el-button>
				</el-form-item>
			</el-form>
		</template>
	</div>
</template>

<script>
	import {
		postReportData,
		getReportData
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
						url: ''
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
					let fileName = fileUrl .substring(fileIndex + 1, fileUrl .length);
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
			created() {
				const content = this.$route.query.content
				console.log(content)
				this.id = content.id
				this.reportType = content.reportType
			},
			mounted() {
				this.getCheckData()
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
				this.$refs.estateForm.validate((valid) => {
					if (valid) {
						alert('submit!');
						console.log(estateForm);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
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
