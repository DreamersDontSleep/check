<template>
	<div style="margin-left: 30px;">
		<h3>基本信息</h3>
		<template>
			<el-form :inline="true" :model="estateForm" ref="estateForm" label-width="180px">
				<el-form-item label="报告类型:" style="display: block;">
					<template>
						<div v-if="estateForm.reportType == 1">
							<el-input value="房地产估价报告" disabled></el-input>
						</div>
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
						<!-- <el-date-picker v-model="estateForm.assessStartTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker> -->
					</template>
				</el-form-item>
				<el-form-item label="估价作业结束时间:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessEndTime" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="估价时点:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.valueTime" disabled></el-input>
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
					</template>
				</el-form-item>
				<el-form-item label="估价方法:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessMethod" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="价值类型:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.valueType" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="建筑面积(m2):" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.buildingArea" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="土地面积(m2):" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.floorArea" disabled></el-input>
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
				<el-form-item label="产权人:" style="width: 40%;" prop="propertyOwner">
					<template>
						<el-input v-model="estateForm.propertyOwner" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="审核员:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.checker" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估机构:" style="width: 80%;">
					<template>
						<el-input v-model="estateForm.assessOrg" style="width: 400px;" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="文件上传" class="fl" style="width: 80%;">
					<el-upload class="upload-demo" action="http://fcpgpre.jstspg.com/rpt/index/upLoad" :on-preview="handlePreview"
					 accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx" :on-remove="handleRemove"
					 :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
					</el-upload>
					<el-button @click="downloadWord()">下载word文档</el-button>
					<el-button @click="previewPdf()">预览pdf文档</el-button>
				</el-form-item>
				<el-form-item label="文件上传(压缩文件)" class="fl" style="width: 80%;">
					<el-upload ref="upload" action="http://fcpgpre.jstspg.com/rpt/index/upLoad" :on-preview="handlePreview" :on-remove="handleRemove"
					 :before-remove="beforeRemove" :auto-upload="false" class="upload-demo" :limit="1" name="file"
					 :on-exceed="handleExceed" :file-list="fileList2" accept=".doc,.docx" multiple>
						<!-- <el-button slot="trigger" size="small" type="primary">选择文件</el-button> -->
						<!-- <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx</div> -->
					</el-upload>
					<el-button @click="downloadZip()" v-show="zipShow">下载压缩文档</el-button>
				</el-form-item>
				<el-form-item label="审核:" style="display: block;" v-show="statuShow">
					<el-button type="success" @click="sealJump()">审核</el-button>
					<el-button @click="cancelForm(estateForm)">返回</el-button>
				</el-form-item>
			</el-form>
		</template>
		<el-dialog :visible.sync="sealFormVisible" title="转让盖章">
		  <el-form :inline="true" :model="sealForm">
		    <el-form-item label="转让盖章权限:">
		      <template>
		        <el-select style="width: 250px;" placeholder="请选择" v-model="sealForm.seal">
		          <el-option v-for="(item,index) in sealList"
		          :key="item.value"
		          :label="item.label"
		          :value="item.value"/>
		          </el-option>
		        </el-select>
		      </template>
		    </el-form-item>
				<el-form-item>
				  <el-button type="primary" @click="changeSeal(sealForm)">确定</el-button>
				</el-form-item>
		  </el-form>
		</el-dialog>
	</div>
</template>

<script>
	import {
		postReportData, getReportData, postCheckId, transferToId, postUpdateRemark
	} from '@/api/entry'
	import permission from '@/directive/permission/index.js' // 权限判断指令
	import checkPermission from '@/utils/permission' // 权限判断函数
	export default {
		directives: { permission },
		data() {
			return {
				estateForm: {},
				editFormVisible: false,
				fileList: [{
					name: '',
					url:''
				}],
				fileList2: [{
					name: '',
					url: ''
				}],
				remark: '',
				idList: '',
				idListItem:[{
					"label": "test",
					"value": "test"
				},{
					"label": "jj",
					"value": "jj"
				}],
				sealForm:{
					seal: ''
				},
				sealFormVisible: false,
				sealList:[{
					"label": "test",
					"value": "test"
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
				reportType: '',
				status: '',
				wordUrl: '',
				pdfUrl: '',
				upFileUrl: '',
				zipShow: true,
				statuShow: true
			}
		},
		created() {
			const content = this.$route.query.content
			const stateStatus = this.$route.query.status
			if(stateStatus == 0){
				this.statuShow = true
			}else{
				this.statuShow = false
			}
			console.log(content)
			this.id = content.id
			this.reportType = content.reportType
			this.status = content.state
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
					this.wordUrl = this.estateForm.wordUri
					this.pdfUrl = this.estateForm.pdfUri
					this.upFileUrl = this.estateForm.upFileURI
					let fileUrl = res.data.wordUri;
					let fileIndex = fileUrl.lastIndexOf('\/');
					let fileName = fileUrl.substring(fileIndex + 1, fileUrl.length);
					console.log(fileName)
					this.fileList[0].name = fileName;
					this.fileList[0].url = fileUrl;
					if(this.upFileURI != ""){
						const zipUrl = this.estateForm.upFileURI
						const zipIndex = zipUrl.lastIndexOf('\/')
						const zipName = zipUrl.substring(fileIndex + 1, fileUrl.length)
						this.fileList2[0].name = zipName
						this.fileList2[0].url = zipUrl
					}else{
						this.zipShow = false
					}
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
						// alert('submit!');
						console.log(estateForm)
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
			transfer(){
				let id = this.id
				let transferTo = this.idList
				console.log(transferTo);
				if(transferTo == ""){
					this.$confirm('请选择需要盖章的人', '提示', {
						type: 'warning'
					})
				}else{
					transferToId(id,transferTo).then( (res) => {
						console.log(res)
					})
				}
			},
			checkSuccess () {
				let id = this.id;
				let state = 3;
				this.$confirm('确认是否审核通过?','提示',{
					type: 'warning'
					}).then(() => {
						postCheckId(id,state).then((res) => {
							// this.fetchProjectList()
							console.log(res);
							this.$router.push({path:'/checkList/index'})
						});
						let para = {
							"stampState": "",
							"id": this.id,
							"remark":this.remark
						}
						postUpdateRemark(para).then( (res) => {
							console.log(res)
						})
					}).catch(() => {})
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
			transferSeal () {
				this.sealFormVisible = true
			},
			changeSeal (sealForm) {
				// this.sealFormVisible = true
				console.log(sealForm.seal)
				let id = this.id
				let transferTo = sealForm.seal
				let state = 3
				console.log(transferTo);
				if(transferTo == ""){
					this.$message({
						message:'请选择需要转让的人!', 
						type: 'warning'
					})
				}else{
					transferToId(id,transferTo).then( (res) => {
						if(res.code == 200){
							this.$message({
								message:'转让成功并审核通过!', 
								type: 'success'
							})
							let para = {
								"stampState": 1,
								"id": this.id,
								"remark":this.remark
							}
							postUpdateRemark(para).then( (res) => {
								console.log(res)
							})
							postCheckId(id,state).then((res) => {
								console.log(res);
								this.$router.push({path:'/checkList/index'})
							});
						}else{
							this.$message({
								message:'转让成失败!', 
								type: 'warning'
							})
						}
						this.sealFormVisible = false
					})
				}
			},
			sealJump(){
				let para = {
					"stampState": "0",
					"id": this.id,
					"remark":this.remark
				}
				postUpdateRemark(para).then( (res) => {
					console.log(res)
				})
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
			},
			downloadWord(){
				window.location.href = this.wordUrl
			},
			previewPdf(){
				window.open(this.pdfUrl,'_blank')
			},
			downloadZip(){
				window.location.href = this.upFileUrl
			}
		}
	}
</script>

<style>
</style>
