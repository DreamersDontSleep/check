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
				<el-form-item label="文件上传" class="fl">
					<el-upload class="upload-demo" action="http://fcpgpre.jstspg.com/rpt/index/upLoad" :on-preview="handlePreview"
					 accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx" :on-remove="handleRemove"
					 :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
						<!-- <el-button size="small" type="primary">点击上传</el-button> -->
						<!-- <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg</div> -->
						<!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
					</el-upload>
				</el-form-item>
				<el-form-item style="width: 40%;">
					<el-button type="primary" @click="sealJump()" v-permission="[305]">盖章</el-button>
					<el-button>盖章转给其他人</el-button>
					<el-select style="width: 250px;" placeholder="请选择" v-model="idList">
						<el-option
							v-for="(item,index) in idListItem"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
					<el-button @click="transfer()">确定</el-button>
				</el-form-item>
				<el-form-item style="display: block;">
					<!-- <el-button @click="submitForm(estateForm)">提交</el-button> -->
					<el-button type="success" @click="checkSuccess()">审核通过</el-button>
					<el-button type="danger" @click="checkFail()">审核不通过</el-button>
					<el-button @click="cancelForm(estateForm)">返回</el-button>
				</el-form-item>
			</el-form>
		</template>
	</div>
</template>

<script>
	import {
		postReportData,
		getReportData, postCheckId, transferToId
	} from '@/api/entry'
	import permission from '@/directive/permission/index.js' // 权限判断指令
	import checkPermission from '@/utils/permission' // 权限判断函数
	export default {
		directives: { permission },
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
				idList: '',
				idListItem:[{
					"label": "test",
					"value": "test"
				},{
					"label": "jj",
					"value": "jj"
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
			transfer(){
				let id = this.id
				let transferTo = this.idList
				console.log(transferTo);
				if(transferTo == ""){
					this.$confirm('确认审核通过吗?', '提示', {
						type: 'warning'
					})
				}else{
					transferToId(id,transferTo).then( (res) => {
						console.log(res)
					})
				}
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
						console.log(res);
						this.$router.push({path:'/checkList/index'})
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
