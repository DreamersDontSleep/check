<template>
	<div>
		<div>
			<router-link :to="{ path: '/entryList/index'}">
				<el-button>返回</el-button>
			</router-link>
		</div>
		<template>
			<el-form ref="estateForm" :inline="true" :model="estateForm" label-width="180px" style="width: 100%;">
				<el-form-item label="报告类型:" style="display: block;">
					<template>
						<el-input value="房地产估价报告" disabled />
					</template>
				</el-form-item>
				<el-form-item label="项目名称:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.projectName" disabled />
						<el-input v-else v-model="estateForm.projectName" />
					</template>
				</el-form-item>
				<el-form-item label="估价报告编号:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assessReportNum" disabled />
						<el-input v-else v-model="estateForm.assessReportNum" />
					</template>
				</el-form-item>
				<el-form-item label="估价作业开始时间:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assessStartTime" disabled />
						<el-date-picker v-else v-model="estateForm.assessStartTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" />
					</template>
				</el-form-item>
				<el-form-item label="估价作业结束时间:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assessEndTime" disabled />
						<el-date-picker v-else v-model="estateForm.assessEndTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" />
					</template>
				</el-form-item>
				<el-form-item label="估价时点:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.valueTime" disabled />
						<el-date-picker v-else v-model="estateForm.valueTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" />
					</template>
				</el-form-item>
				<el-form-item label="估价对象:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assessObject" disabled />
						<el-input v-else v-model="estateForm.assessObject" />
					</template>
				</el-form-item>
				<el-form-item label="估价目的:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assessAim" disabled />
						<el-select v-else v-model="estateForm.assessAim" multiple placeholder="请选择">
							<el-option v-for="(item,index) in assess" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="估价方法:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assessMethod" disabled />
						<el-select v-else v-model="estateForm.assessMethod" placeholder="请选择">
							<el-option v-for="(item,index) in assessMethodList" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="价值类型:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.valueType" disabled />
						<el-select v-else v-model="estateForm.valueType" placeholder="请选择">
							<el-option v-for="(item,index) in valueTypeList" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="建筑面积(m2):" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.buildingArea" disabled />
						<el-input v-else v-model="estateForm.buildingArea" />
					</template>
				</el-form-item>
				<el-form-item label="土地面积(m2):" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.floorArea" disabled />
						<el-input v-else v-model="estateForm.floorArea" />
					</template>
				</el-form-item>
				<el-form-item label="评估单价:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assessUnitPrice" disabled />
						<el-input v-else v-model="estateForm.assessUnitPrice" />
					</template>
				</el-form-item>
				<el-form-item label="评估总价:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assessTotalPrice" disabled />
						<el-input v-else v-model="estateForm.assessTotalPrice" />
					</template>
				</el-form-item>
				<el-form-item label="委托方:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.client" disabled />
						<el-input v-else v-model="estateForm.client" />
					</template>
				</el-form-item>
				<el-form-item label="第一报告人:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.firstReporter" disabled />
						<!-- <el-input v-else v-model="estateForm.firstReporter"/> -->
						<el-select v-else v-model="estateForm.firstReporter" placeholder="请选择" @change="selChange1(estateForm.firstReporter)">
							<el-option v-for="(item,index) in reportNameList" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="第一报告人注册号:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.firstReporterRgNum" disabled />
						<el-input v-else v-model="estateForm.firstReporterRgNum" disabled />
					</template>
				</el-form-item>
				<el-form-item label="参与报告人1:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.partReporter1" disabled />
						<!-- <el-input v-else v-model="estateForm.partReporter1"/> -->
						<el-select v-else v-model="estateForm.partReporter1" placeholder="请选择" @change="selChange2(estateForm.partReporter1)">
							<el-option v-for="(item,index) in reportNameList" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人1注册号:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.partReporter1RgNum" disabled />
						<el-input v-else v-model="estateForm.partReporter1RgNum" disabled />
					</template>
				</el-form-item>
				<el-form-item label="参与报告人2:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.partReporter2" disabled />
						<!-- <el-input v-else v-model="estateForm.partReporter2"/> -->
						<el-select v-else v-model="estateForm.partReporter2" placeholder="请选择" @change="selChange3(estateForm.partReporter2)">
							<el-option v-for="(item,index) in reportNameList" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人2注册号:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.partReporter2RgNum" disabled />
						<el-input v-else v-model="estateForm.partReporter2RgNum" disabled />
					</template>
				</el-form-item>
				<el-form-item label="业务来源:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.serviceSource" disabled />
						<el-input v-else v-model="estateForm.serviceSource" />
					</template>
				</el-form-item>
				<el-form-item label="分公司:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.branchOffice" disabled />
						<el-input v-else v-model="estateForm.branchOffice" disabled />
						<!-- <el-select v-else v-model="estateForm.branchOffice" placeholder="请选择">
							<el-option v-for="(item,index) in cbranchOfficeList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select> -->
					</template>
				</el-form-item>
				<el-form-item label="业务收费(万元):" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.serviceCharge" disabled />
						<el-input v-else v-model="estateForm.serviceCharge" />
					</template>
				</el-form-item>
				<el-form-item label="审核员:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.checker" disabled />
						<!-- <el-input v-else v-model="estateForm.checker"/> -->
						<el-select v-else v-model="estateForm.checker" placeholder="请选择">
							<el-option v-for="(item,index) in checkerList" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="评估机构:" style="width: 90%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assessOrg" style="width: 400px;" disabled />
						<el-input v-else v-model="estateForm.assessOrg" style="width: 400px;" />
					</template>
				</el-form-item>
				<el-form-item label="文件上传" class="fl" style="width: 80%;">
					<el-upload ref="upload" :action="UploadUrl ()" :on-preview="handlePreview" :on-remove="handleRemove"
					 :before-remove="beforeRemove" :auto-upload="false" :on-change="handleChange" class="upload-demo" :limit="1" name="file"
					 :on-exceed="handleExceed" :file-list="fileList" accept=".doc,.docx" multiple v-if="lookOrEdit">
						<!-- <el-button slot="trigger" size="small" type="primary">选择文件</el-button> -->
						<!-- <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx</div> -->
					</el-upload>
					<el-upload ref="upload" :action="UploadUrl ()" :on-preview="handlePreview" :on-remove="handleRemove"
					 :before-remove="beforeRemove" :on-change="handleChange" :on-success="handleSuccess" class="upload-demo" :limit="1"
					 name="file" :on-exceed="handleExceed" :file-list="fileList" accept=".doc,.docx" multiple v-else>
						<el-button slot="trigger" size="small" type="primary">选择文件</el-button>
						<div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx</div>
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
	import {
		postUpdateRpt,
		getDictionary
	} from '@/api/entry'
	export default {
		data() {
			return {
				lookOrEdit: '',
				estateForm: '',
				assess: '',
				cbranchOfficeList: '',
				assessMethodList: '',
				valueTypeList: '',
				firstReporterList: '',
				partReporter1List: '',
				partReporter2List: '',
				checkerList: [{
					"label": "test",
					"value": "test"
				}, {
					"label": "check",
					"value": "check"
				}],
				wordUrl: '',
				pdfUrl: '',
				upFileUrl: '',
				zipShow: true,
				fileList: [{
					name: '',
					url: ''
				}],
				fileList2: [{
					name: '',
					url: ''
				}],
				id: '',
				arr1: [],
				nameList: '',
				arr: [],
				reportNameList: [],
				regList: []
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
			if(this.upFileURI != ""){
				const zipUrl = this.estateForm.upFileURI
				const zipIndex = zipUrl.lastIndexOf('\/')
				const zipName = zipUrl.substring(fileIndex + 1, fileUrl.length)
				this.fileList2[0].name = zipName
				this.fileList2[0].url = zipUrl
			}else{
				this.zipShow = false
			}
			console.log(fileName)
			this.fileList[0].name = fileName
			this.fileList[0].url = fileUrl
		},
		mounted() {
			this.getTreeData()
		},
		methods: {
			getTreeData() {
				getDictionary().then((res) => {
					console.log(res);
					let me = this
					this.assess = res.data.fdc2019[2].gjmd.reverse()
					console.log(this.assess)
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
						me.regList.push(e[0])
					})
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
							postUpdateRpt(para).then((res) => {
								if (res.code == 200) {
									this.$message({
										message: '修改成功!',
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
			handleSuccess(response, file, fileList) {
				console.log(response);
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
				console.log(111)
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
				console.log(222)
				console.log(file)
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${file.name}？`)
			},
			downloadWord() {
				window.location.href = this.wordUrl
			},
			previewPdf() {
				window.open(this.pdfUrl, '_blank')
			},
			downloadZip(){
				window.location.href = this.upFileUrl
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
