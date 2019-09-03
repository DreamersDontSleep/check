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
				<el-form-item label="委托方:" style="width: 40%;" prop="client">
					<template>
						<el-input v-model="estateForm.client" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="被评估单位名称:" style="width: 40%;" prop="assessedUnitName">
					<template>
						<el-input v-model="estateForm.assessedUnitName" disabled></el-input>
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
						<el-input v-model="estateForm.assessObj" disabled></el-input>
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
				<el-form-item label="产权人:" style="width: 40%;" prop="propertyOwner">
					<template>
						<el-input v-model="estateForm.propertyOwner" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="审核员:" style="width: 40%;" prop="checker">
					<template>
						<el-input v-model="estateForm.checker"></el-input>
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
		postReportData,
		getReportData, postCheckId, transferToId, postUpdateRemark
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
				statuShow: true,
				remark: '',
				idList: '',
				editFormVisible: false,
				fileList: [{
						name: '',
						url: ''
					}],
				fileList2: [{
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
				status:'',
				wordUrl: '',
				pdfUrl: '',
				upFileUrl: '',
				zipShow: true
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
			this.status = content.state
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
					this.wordUrl = this.estateForm.wordUri
					this.pdfUrl = this.estateForm.pdfUri
					this.upFileUrl = this.estateForm.upFileURI
					if(this.estateForm.isPrivateAsset == true){
						this.estateForm.isPrivateAsset = "是"
					}else{
						this.estateForm.isPrivateAsset = "否"
					}
					if(this.estateForm.isStateAssets == true){
						this.estateForm.isStateAssets = "是"
					}else{
						this.estateForm.isStateAssets = "否"
					}
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
						this.$router.push({path:'/checkList/index'})
						console.log(res);
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
