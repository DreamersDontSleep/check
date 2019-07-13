<template>
	<div style="margin-left: 30px;">
		<h3>基本信息</h3>
		<template>
			<el-form :model="estateForm" ref="estateForm" label-width="180px">
				<el-form-item label="业务来源:" style="width: 40%;">
					<template>
						<el-input value="预评估" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="分公司:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.branchOffice" disabled></el-input>
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
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}, {
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
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
