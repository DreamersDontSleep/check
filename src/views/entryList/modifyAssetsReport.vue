<template>
	<div>
		<div>
			<router-link :to="{ path: '/entryList/index'}">
				<el-button>返回</el-button>
			</router-link>
		</div>
		<template>
			<el-form ref="estateForm" :inline="true" :model="estateForm" label-width="180px">
				<el-form-item label="报告类型:" style="display: block;">
					<template>
						<el-input value="资产评估报告" disabled />
					</template>
				</el-form-item>
				<el-form-item label="项目名称:" style="width: 40%;" prop="projectName">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.projectName" disabled />
						<el-input v-else v-model="estateForm.projectName" />
					</template>
				</el-form-item>
				<el-form-item label="估价报告编号:" style="width: 40%;" prop="assessReportNum">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assessReportNum" disabled />
						<el-input v-else v-model="estateForm.assessReportNum" />
					</template>
				</el-form-item>
				<el-form-item label="委托方:" style="width: 40%;" prop="client">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.client" disabled />
						<el-input v-else v-model="estateForm.client"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="被评估单位名称:" style="width: 40%;" prop="assessedUnitName">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assessedUnitName" disabled />
						<el-input v-else v-model="estateForm.assessedUnitName" />
					</template>
				</el-form-item>
				<el-form-item label="是否国有资产评估业务:" style="width: 40%;" prop="isStateAssets">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.isStateAssets" disabled />
						<el-select v-else v-model="estateForm.isStateAssets" placeholder="请选择">
							<el-option v-for="(item,index) in isStateAssetsList" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="是否私发资产评估业务:" style="width: 40%;" prop="isPrivateAsset">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.isPrivateAsset" disabled />
						<el-select v-else v-model="estateForm.isPrivateAsset" placeholder="请选择">
							<el-option v-for="(item,index) in isPrivateAssetList" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="评估目的:" style="width: 40%;" prop="assessAim">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assessAim" disabled />
						<el-select v-else v-model="estateForm.assessAim" placeholder="请选择">
							<el-option v-for="(item,index) in assessAimList" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="评估对象:" style="width: 40%;" prop="assessObj">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assessObj" disabled />
						<!-- <el-input v-else v-model="estateForm.assessObj"/> -->
						<el-select v-else v-model="estateForm.assessObj" placeholder="请选择">
							<el-option v-for="(item,index) in assessObjList " :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="价值类型:" style="width: 40%;" prop="valueType">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.valueType" disabled />
						<el-select v-else v-model="estateForm.valueType" placeholder="请选择">
							<el-option v-for="(item,index) in valueTypeList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="评估方法:" style="width: 40%;" prop="assessMethod">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assessMethod" disabled />
						<!-- <el-input v-else v-model="estateForm.assessMethod"/> -->
						<el-select v-else v-model="estateForm.assessMethod" placeholder="请选择">
							<el-option v-for="(item,index) in assessMethodList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="评估结论(万元):" style="width: 40%;" prop="assessResult">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assessResult" disabled />
						<el-input v-else v-model="estateForm.assessResult" />
					</template>
				</el-form-item>
				<el-form-item label="评估基准日" style="width: 40%;" prop="assessDate">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assessDate" disabled />
						<el-input v-else v-model="estateForm.assessDate" />
						<!-- <el-date-picker v-else type="date" v-model="estateForm.assessDate" placeholder="选择日期时间" value-format="yyyy-MM-dd">{{estateForm.assessDate | formatDate}}</el-date-picker> -->
					</template>
				</el-form-item>
				<el-form-item label="实际收费金额(万元):" style="width: 40%;" prop="actualFee">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.actualFee" disabled />
						<el-input v-else v-model="estateForm.actualFee" />
					</template>
				</el-form-item>
				<el-form-item label="资产评估报告日:" style="width: 40%;" prop="assetsReportDate">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assetsReportDate" disabled />
						<el-input v-else v-model="estateForm.assetsReportDate" />
						<!-- <el-date-picker v-else type="date" v-model="estateForm.assetsReportDate" placeholder="选择日期时间" value-format="yyyy-MM-dd">{{estateForm.assessDate | formatDate}}</el-date-picker> -->
					</template>
				</el-form-item>
				<el-form-item label="分公司:" style="width: 40%;" prop="branchOffice">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.branchOffice" disabled></el-input>
						<el-input v-else v-model="estateForm.branchOffice" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="总资产账面值:" style="width: 40%;" prop="assetsFee">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.assetsFee" disabled />
						<el-input v-else v-model="estateForm.assetsFee" />
						<!-- <el-radio></el-radio>无账面价值 -->
					</template>
				</el-form-item>
				<el-form-item label="总负债账面值:" style="width: 40%;" prop="debtFee">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.debtFee" disabled />
						<el-input v-else v-model="estateForm.debtFee" />
						<!-- <el-radio></el-radio>无账面价值 -->
					</template>
				</el-form-item>
				<el-form-item label="净资产账面值:" style="width: 40%;" prop="netAssets">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.netAssets" disabled />
						<el-input v-else v-model="estateForm.netAssets" />
						<!-- <el-radio></el-radio>无账面价值 -->
					</template>
				</el-form-item>
				<el-form-item label="产权人:" style="width: 40%;">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.propertyOwner" disabled></el-input>
						<el-input v-else v-model="estateForm.propertyOwner" />
					</template>
				</el-form-item>
				<el-form-item label="审核员:" style="width: 40%;" prop="checker">
					<template>
						<el-input v-if="lookOrEdit" v-model="estateForm.checker" disabled></el-input>
						<el-select v-else v-model="estateForm.checker" filterable placeholder="请选择">
							<el-option v-for="(item,index) in checkerList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="文件上传" class="fl" style="display: block;">
					<el-upload ref="upload" :action="UploadUrl ()" :on-preview="handlePreview" :on-remove="handleRemove"
					 :before-remove="beforeRemove" :auto-upload="false" :on-change="handleChange" class="upload-demo" :limit="1" name="file"
					 :on-exceed="handleExceed" :file-list="fileList" accept=".pdf" multiple v-if="lookOrEdit">
						<!-- <el-button slot="trigger" size="small" type="primary">选择文件</el-button> -->
						<!-- <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx</div> -->
					</el-upload>
					<el-upload ref="upload" :action="UploadUrl ()" :on-preview="handlePreview" :on-remove="handleRemove"
					 :before-remove="beforeRemove" :on-change="handleChange" :on-success="handleSuccess" class="upload-demo" :limit="1"
					 name="file" :on-exceed="handleExceed" :file-list="fileList" accept=".pdf" multiple v-else>
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
	import {
		postUpdateRpt,
		getDictionary
	} from '@/api/entry'
	export default {
		data() {
			return {
				lookOrEdit: '',
				estateForm: '',
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
				assessAimList: '',
				assessMethodList: '',
				assessObjList: '',
				cbranchOfficeList: [{
					"label": "分公司1",
					"value": "分公司1"
				}, {
					"label": "分公司2",
					"value": "分公司2"
				}],
				valueTypeList: '',
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
			let aimList = content.assessMethod
			let aimArr = []
			for(let i = 0; i < aimList.split(',').length; i++){
				aimArr.push(aimList.split(',')[i])
			}
			console.log(aimArr)
			this.estateForm = content
			// this.estateForm.assessMethod = aimArr
			if (this.estateForm.isStateAssets == true) {
				this.estateForm.isStateAssets = "是"
			} else {
				this.estateForm.isStateAssets = '否'
			}

			if (this.estateForm.isPrivateAsset == false) {
				this.estateForm.isPrivateAsset = "是"
			} else {
				this.estateForm.isPrivateAsset = "否"
			}
			console.log(this.estateForm.assessDate)
			// this.estateForm.assessDate = formatDate(this.estateForm.assessDate)
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
			if (this.upFileURI != "") {
				const zipUrl = this.estateForm.upFileURI
				const zipIndex = zipUrl.lastIndexOf('\/')
				const zipName = zipUrl.substring(fileIndex + 1, fileUrl.length)
				this.fileList2[0].name = zipName
				this.fileList2[0].url = zipUrl
			} else {
				this.zipShow = false
			}
		},
		mounted() {
			this.getTreeData()
		},
		methods: {
			getTreeData() {
				getDictionary().then((res) => {
					console.log(res);
					this.assessAimList = res.data.zzpg2019[4].zcpgmd.reverse()
					this.assessObjList = res.data.zzpg2019[3].zcpgdx.reverse()
					this.valueTypeList = res.data.zzpg2019[2].zcjzlx.reverse()
					this.assessMethodList = res.data.zzpg2019[1].zcpgff.reverse()
					this.checkerList = res.data.sh2019[0].list
				})
			},
			submitForm(estateForm) {
				if (estateForm.isStateAssets == '是') {
					estateForm.isStateAssets = 1
				} else {
					estateForm.isStateAssets = 0
				}

				if (estateForm.isPrivateAsset == '是') {
					estateForm.isPrivateAsset = 1
				} else {
					estateForm.isPrivateAsset = 0
				}
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
				console.log(file, fileList)
			},
			UploadUrl() {
				let upUrl = 'rpt/index/upLoad'
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
				console.log(file)
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
			downloadZip() {
				window.location.href = this.upFileUrl
			},
			downloadWord() {
				window.location.href = this.wordUrl
			},
			previewPdf() {
				window.open(this.pdfUrl, '_blank')
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
