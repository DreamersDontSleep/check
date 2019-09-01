<template>
	<div>
		<template>
		  <el-form ref="estateForm" :inline="true" :model="estateForm" label-width="180px">
		    <el-form-item label="业务来源:" style="width: 80%;">
		      <template>
		        <el-input v-model="estateForm.reportType" disabled/>
		      </template>
		    </el-form-item>
			<el-form-item label="项目名称:" style="width: 80%;">
				<template>
					<el-input v-if="lookOrEdit" v-model="estateForm.projectName" disabled />
					<el-input v-else v-model="estateForm.projectName" />
				</template>
			</el-form-item>
			<el-form-item label="估价目的:" style="width: 80%;">
				<template>
					<el-input v-if="lookOrEdit" v-model="estateForm.assessAim" disabled />
					<el-select v-else v-model="estateForm.assessAim" placeholder="请选择">
						<el-option v-for="(item,index) in assess" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</template>
			</el-form-item>
			<el-form-item label="产权人:" style="width: 80%;">
				<template>
					<el-input v-if="lookOrEdit" v-model="estateForm.propertyOwner" disabled></el-input>
					<el-input v-else v-model="estateForm.propertyOwner" />
				</template>
			</el-form-item>
			<el-form-item label="建筑面积(m2):" style="width: 80%;">
				<template>
					<el-input v-if="lookOrEdit" v-model="estateForm.buildingArea" disabled />
					<el-input v-else v-model="estateForm.buildingArea" />
				</template>
			</el-form-item>
			<el-form-item label="评估总价:" style="width: 80%;">
				<template>
					<el-input v-if="lookOrEdit" v-model="estateForm.assessTotalPrice" disabled />
					<el-input v-else v-model="estateForm.assessTotalPrice" />
				</template>
			</el-form-item>
		    <el-form-item label="分公司:" style="width: 80%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.branchOffice" disabled/>
		        <el-input v-else v-model="estateForm.branchOffice" disabled/>
		      </template>
		    </el-form-item>
		    <el-form-item label="审核员:" style="width: 80%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.checker" disabled/>
		        <!-- <el-input v-else v-model="estateForm.checker"/> -->
						<el-select v-else v-model="estateForm.checker" placeholder="请选择" style="width: 331px;">
							<el-option v-for="(item,index) in checkerList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
		      </template>
		    </el-form-item>
		    <el-form-item label="评估机构:" style="width: 80%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.assessOrg" style="width: 400px;" disabled/>
		        <el-input v-else v-model="estateForm.assessOrg" style="width: 400px;"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="文件上传" class="fl" style="display: block;">
		      <el-upload
		        ref="upload"
		        :action="UploadUrl ()"
		        :on-preview="handlePreview"
		        :on-remove="handleRemove"
		        :before-remove="beforeRemove"
		        :auto-upload="false"
		        :on-change="handleChange"
		        class="upload-demo"
		        :limit="1"
		        name="file"
		        :on-exceed="handleExceed"
		        :file-list="fileList"
		        accept=".doc,.docx,.pdf"
		        multiple  v-if="lookOrEdit">
		        <!-- <el-button slot="trigger" size="small" type="primary">选择文件</el-button> -->
		        <!-- <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx</div> -->
		      </el-upload>
				<el-upload
				  ref="upload"
				  :action="UploadUrl ()"
				  :on-preview="handlePreview"
				  :on-remove="handleRemove"
				  :before-remove="beforeRemove"
				  :on-change="handleChange"
					:on-success="handleSuccess"
				  class="upload-demo"
				  :limit="1"
				  name="file"
				  :on-exceed="handleExceed"
				  :file-list="fileList"
				  accept=".doc,.docx,.pdf"
				  multiple v-else>
				  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
				  <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx,.pdf</div>
				</el-upload>
				<el-button @click="downloadWord()">下载word文档</el-button>
				<el-button @click="previewPdf()">预览pdf文档</el-button>
		    </el-form-item>
			<el-form-item label="文件上传(压缩文件)" class="fl" style="width: 80%;">
				<el-upload ref="upload" :action="UploadUrl ()" :on-preview="handlePreview" :on-remove="handleRemove"
				 :before-remove="beforeRemove" :auto-upload="false" :on-change="handleChange2" class="upload-demo" :limit="1" name="file"
				 :on-exceed="handleExceed" :file-list="fileList2" accept=".doc,.docx" multiple v-if="lookOrEdit">
					<!-- <el-button slot="trigger" size="small" type="primary">选择文件</el-button> -->
					<!-- <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx</div> -->
				</el-upload>
				<el-upload ref="upload" :action="UploadUrl ()" :on-preview="handlePreview" :on-remove="handleRemove"
				 :before-remove="beforeRemove" :on-change="handleChange2" :on-success="handleSuccess2" class="upload-demo" :limit="1"
				 name="file" :on-exceed="handleExceed" :file-list="fileList2" accept=".rar,.zip" multiple v-else>
					<el-button slot="trigger" size="small" type="primary">选择文件</el-button>
					<div slot="tip" class="el-upload__tip">支持扩展名：.rar,.zip</div>
				</el-upload>
				<el-button @click="downloadZip()" v-show="zipShow">下载压缩文档</el-button>
			</el-form-item>
		    <el-form-item style="display: block;">
		      <el-button v-show="!lookOrEdit" @click="submitForm(estateForm)">提交</el-button>
		      <router-link :to="{ path: '/entryList/index'}">
		      	<el-button>返回</el-button>
		      </router-link>
		    </el-form-item>
		  </el-form>
		</template>
	</div>
</template>

<script>
	import { postUpdateRpt, getDictionary } from '@/api/entry'
	export default {
		data () {
			return {
				lookOrEdit: '',
				estateForm: '',
				cbranchOfficeList: [{
					"label": "分公司1",
					"value": "分公司1"
				}, {
					"label": "分公司2",
					"value": "分公司2"
				}
				],
				wordUrl: '',
				pdfUrl: '',
				upFileUrl: '',
				checkerList:[
					{
						"label": "test",
						"value": "test"
					}, {
						"label": "check",
						"value": "check"
					}
				],
				fileList: [{
				  name: '',
				  url: ''
				}],
				fileList2: [{
					name: '',
					url: ''
				}],
				id: '',
				zipShow: true
			}
		},
		created() {
		  const content = this.$route.query.contents
		  console.log(content)
		  this.estateForm = content
		  this.lookOrEdit = this.$route.query.lookOrEdit
			this.id = content.id
			this.wordUrl = this.estateForm.wordUri
			this.pdfUrl = this.estateForm.pdfUri
			this.upFileUrl = this.estateForm.upFileURI
		  const fileUrl = this.estateForm.wordUri
		  const fileIndex = fileUrl.lastIndexOf('\/')
		  const fileName = fileUrl.substring(fileIndex + 1, fileUrl.length)
		  console.log(fileName)
		  this.fileList[0].name = fileName
		  this.fileList[0].url = fileUrl
		  if(this.upFileURI != ""){
		  	const zipUrl = this.estateForm.upFileURI
		  	const zipIndex = zipUrl.lastIndexOf('\/')
		  	const zipName = zipUrl.substring(fileIndex + 1, fileUrl.length)
		  	this.fileList2[0].name = zipName
		  	this.fileList2[0].url = zipUrl
		  }else{
		  	this.zipShow = false
		  }
		},
		mounted() {
			this.getTreeData()
		},
		methods:{
			getTreeData(){
				getDictionary().then( (res) => {
					this.checkerList = res.data.sh2019[0].list
					// console.log(this.assess)
				})	
			},
			submitForm(estateForm) {
			  this.$refs.estateForm.validate((valid) => {
				  if (valid) {
			      this.$confirm('确认提交该记录吗?', '提示', {
			        type: 'warning'
			      }).then(() => {
							let para = estateForm
							console.log(para)
							postUpdateRpt(para).then ( (res) => {
								if(res.code == 200){
									this.$message({
										message:'修改成功!', 
										type: 'success'
									})
								}
							})
			      }).catch(() => {
							
			      })
				  } else {
			      console.log('error submit!!')
				  }
			  })
			},
			handleSuccess(response,file, fileList){
				console.log(response);
				if(response.code == 200){
					console.log(this.estateForm)
					this.estateForm.pdfUri = response.data[0].pdfPath
					this.estateForm.wordUri = response.data[0].wordPath
				}else{
					return ;
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
			  console.log(file, fileList)
			},
			UploadUrl() {
				let upUrl = 'http://fcpgpre.jstspg.com/rpt/index/upLoad'
			  return upUrl
			},
			handleChange(file, fileList) {
			  // this.fileList = fileList
			  // this.file = file
			  console.log(file)
			},
			handleChange2(file, fileList) {
				// this.fileList = fileList
				// this.file = file
				console.log('11',file)
			},
			handlePreview(file) {
			  console.log(file)
			},
			handleExceed(files, fileList) {
			  this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
			},
			beforeRemove(file, fileList) {
			  return this.$confirm(`确定移除 ${file.name}？`)
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

<style scoped>
	.el-date-editor.el-input{
		width: 188px;
	}
	.el-select{
		width: 188px !important;
	}
</style>
