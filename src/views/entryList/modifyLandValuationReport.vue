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
		        <el-input value="土地估价报告" disabled/>
		      </template>
		    </el-form-item>
		    <el-form-item label="项目名称:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.projectName" disabled/>
		        <el-input v-else v-model="estateForm.projectName"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="估价报告编号:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.assessReportNum" disabled/>
		        <el-input v-else v-model="estateForm.assessReportNum"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="估价作业开始时间:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.assessStartTime" disabled/>
		        <el-date-picker v-else v-model="estateForm.assessStartTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="估价作业结束时间:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.assessEndTime" disabled/>
		        <el-date-picker v-else v-model="estateForm.assessEndTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="估价时点:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.valueTime" disabled/>
		        <el-date-picker v-else v-model="estateForm.valueTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="估价对象:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.assessObject" disabled/>
		        <el-input v-else v-model="estateForm.assessObject"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="估价目的:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.assessAim" disabled/>
						<!-- <el-input v-else v-model="estateForm.assessAim"/> -->
		        <el-select v-else v-model="estateForm.assessAim" placeholder="请选择">
		          <el-option
		            v-for="(item,index) in assessAimList"
		            :key="item.value"
		            :label="item.label"
		            :value="item.value"/>
		        </el-select>
		      </template>
		    </el-form-item>
		    <el-form-item label="估价方法:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.assessMethod" disabled/>
		        <el-select v-else v-model="estateForm.assessMethod"multiple placeholder="请选择">
		          <el-option
		            v-for="(item,index) in assessMethodList"
		            :key="item.value"
		            :label="item.label"
		            :value="item.value"/>
		        </el-select>
		      </template>
		    </el-form-item>
		    <el-form-item label="宗地位置:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.landSite" disabled/>
		        <el-input v-else v-model="estateForm.landSite"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="宗地面积(m2):" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.landArea" disabled/>
		        <el-input v-else v-model="estateForm.landArea"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="宗地数:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.landAmount" disabled/>
		        <el-input v-else v-model="estateForm.landAmount"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="评估单价:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.assessUnitPrice" disabled/>
		        <el-input v-else v-model="estateForm.assessUnitPrice"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="评估总价:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.assessTotalPrice" disabled/>
		        <el-input v-else v-model="estateForm.assessTotalPrice"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="委托方:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.client" disabled/>
		        <el-input v-else v-model="estateForm.client"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="委托人邮箱:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.clientEmail" disabled/>
		        <el-input v-else v-model="estateForm.clientEmail"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="委托人电话:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.clientPhone" disabled/>
		        <el-input v-else v-model="estateForm.clientPhone"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="第一报告人:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.firstReporter" disabled/>
		        <!-- <el-input v-else v-model="estateForm.firstReporter"/> -->
						<el-select v-else v-model="estateForm.firstReporter" filterable placeholder="请选择" @change="selChange1(estateForm.firstReporter)">
							<el-option v-for="(item,index) in reportNameList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
		      </template>
		    </el-form-item>
		    <el-form-item label="第一报告人注册号:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.firstReporterRgNum" disabled/>
		        <el-input v-else v-model="estateForm.firstReporterRgNum" disabled/>
		      </template>
		    </el-form-item>
		    <el-form-item label="参与报告人1:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.partReporter1" disabled/>
		        <!-- <el-input v-else v-model="estateForm.partReporter1"/> -->
						<el-select v-else v-model="estateForm.partReporter1" filterable placeholder="请选择" @change="selChange2(estateForm.partReporter1)">
							<el-option v-for="(item,index) in reportNameList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
		      </template>
		    </el-form-item>
		    <el-form-item label="参与报告人1注册号:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.partReporter1RgNum" disabled/>
		        <el-input v-else v-model="estateForm.partReporter1RgNum" disabled/>
		      </template>
		    </el-form-item>
			<el-form-item label="参与报告人2:" style="width: 40%;">
			  <template>
			    <el-input v-if="lookOrEdit" v-model="estateForm.partReporter2" disabled/>
			    <!-- <el-input v-else v-model="estateForm.partReporter2"/> -->
						<el-select v-else v-model="estateForm.partReporter2" filterable placeholder="请选择" @change="selChange3(estateForm.partReporter2)">
							<el-option v-for="(item,index) in reportNameList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
			  </template>
			</el-form-item>
		    <el-form-item label="参与报告人2注册号:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.partReporter2RgNum" disabled/>
		        <el-input v-else v-model="estateForm.partReporter2RgNum" disabled/>
		      </template>
		    </el-form-item>
		    <el-form-item label="业务来源:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.serviceSource" disabled/>
		        <el-input v-else v-model="estateForm.serviceSource"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="分公司:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.branchOffice" disabled/>
		        <el-input v-else v-model="estateForm.branchOffice" disabled/>
						<!-- <el-select v-else v-model="estateForm.branchOffice" placeholder="请选择">
							<el-option v-for="(item,index) in cbranchOfficeList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select> -->
		      </template>
		    </el-form-item>
		    <el-form-item label="业务收费(元):" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.serviceCharge" disabled/>
		        <el-input v-else v-model="estateForm.serviceCharge"/>
		      </template>
		    </el-form-item>
			<el-form-item label="项目负责人:" style="width: 40%;" prop="pl">
				<template>
					<el-input v-if="lookOrEdit"  v-model="estateForm.pl" disabled></el-input>
					<el-input v-else v-model="estateForm.pl"></el-input>
				</template>
			</el-form-item>
			<el-form-item label="委托人地址:" style="width: 40%;" prop="clientAddr">
				<template>
					<el-input v-if="lookOrEdit"  v-model="estateForm.clientAddr" disabled></el-input>
					<el-input v-else v-model="estateForm.clientAddr"></el-input>

				</template>
			</el-form-item>
			<el-form-item label="季度:" style="width: 40%;" prop="quarter">
				<template>
					<el-input v-if="lookOrEdit"  v-model="estateForm.quarter" disabled></el-input>
					<el-select v-else v-model="estateForm.quarter" placeholder="请选择">
						<el-option v-for="(item,index) in quarterList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</template>
			</el-form-item>
			<el-form-item label="产权人:" style="width: 40%;">
				<template>
					<el-input v-if="lookOrEdit" v-model="estateForm.propertyOwner" disabled></el-input>
					<el-input v-else v-model="estateForm.propertyOwner" />
				</template>
			</el-form-item>
		    <el-form-item label="审核员:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.checker" disabled/>
		        <!-- <el-input v-else v-model="estateForm.checker"/> -->
						<el-select v-else v-model="estateForm.checker" filterable placeholder="请选择">
							<el-option v-for="(item,index) in checkerList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
		      </template>
		    </el-form-item>
		    <el-form-item label="评估机构:" style="width: 90%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.assessOrg" style="width: 400px;" disabled/>
		        <el-input v-else v-model="estateForm.assessOrg" style="width: 400px;"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="文件上传" class="fl" style="width: 80%;">
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
		        accept=".pdf"
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
				:auto-upload="true"
		        :limit="1"
		        name="file"
		        :on-exceed="handleExceed"
		        :file-list="fileList"
		        accept=".pdf"
		        multiple v-else>
		        <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
		        <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx,.pdf</div>
		      </el-upload>
					<el-button @click="downloadWord()">下载pdf文档</el-button>
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
		import { postUpdateRpt,
		getDictionary } from '@/api/entry'
	export default {
		data () {
			const checkPhone = (rule, value, callback) => {
			if (!value) {
			  return callback(new Error('手机号不能为空'));
			} else {
			  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
			  console.log(reg.test(value));
			  if (reg.test(value)) {
				callback();
			  } else {
				return callback(new Error('请输入正确的手机号'));
			  }
			}
			}
			const checkEmail = (rule, value, callback) => {
			  if (!value) {
			    return callback(new Error('邮箱地址不能为空'));
			  } else {
				let temp = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
			    if (value && (!(temp).test(value))) {
				  callback(new Error('邮箱格式不符合规范'))
				} else {
				  callback()
				}
			  }
			}
			return {
				lookOrEdit: '',
				estateForm: '',
				assessAimList: '',
				quarterList: [{
					"label": "第一季度",
					"value": "第一季度"
				}, {
					"label": "第二季度",
					"value": "第二季度"
				}, {
					"label": "第三季度",
					"value": "第三季度"
				}, {
					"label": "第四季度",
					"value": "第四季度"
				}],
				assessMethodList: '',
				cbranchOfficeList: [{
					"label": "分公司1",
					"value": "分公司1"
				}, {
					"label": "分公司2",
					"value": "分公司2"
				}
				],
				firstReporterList:'',
				partReporter1List:'',
				partReporter2List:'',
				checkerList:[
					{
						"label": "test",
						"value": "test"
					}, {
						"label": "check",
						"value": "check"
					}
				],
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
				arr1:[],
				nameList: '',
				arr: [],
				reportNameList: [],
				regList: [],
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
		  this.estateForm.assessMethod = aimArr
		  this.lookOrEdit = this.$route.query.lookOrEdit
			this.id = content.id
			this.wordUrl = this.estateForm.wordUri
			this.pdfUrl = this.estateForm.pdfUri
			this.upFileUrl = this.estateForm.upFileURI
		  const fileUrl = this.estateForm.wordUri
		  const fileIndex = fileUrl.lastIndexOf('\/')
		  const fileName = fileUrl.substring(fileIndex + 1, fileUrl.length)
		  console.log(fileName)
		  this.fileList[0].name = this.estateForm.realName + '.pdf'
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
		computed: {
			uploadData: function() {
				const parseData = JSON.stringify(this.estateForm)
			    const params = {
					data: parseData
				  }
				  return params
				}
		},
		mounted() {
			this.getTreeData()
		},
		methods:{
			getTreeData(){
				getDictionary().then( (res) => {
					let me = this
					this.assessMethodList= res.data.tdbg2019[0].tdgjff.reverse()
					this.assessAimList = res.data.tdbg2019[1].tdgjmd.reverse()
					this.nameList = res.data.tdzcbg
					this.checkerList = res.data.sh2019[0].list
					this.nameList.forEach(function(e,c){
						for(let key in e){
							me.arr.push(e[key])
						}
					})
					this.arr.forEach(function(e,c){
						me.reportNameList.push(e[1])
						// console.log(me.reportNameList)
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
			  let $url = window.location.href.substring(7,11);
			  console.log($url)
			  if($url == "loca"){
			  	return "rpt/index/upLoad"
			  }else if($url == "fcpg"){
			  	return "http://fcpgpre.jstspg.com/rpt/index/upLoad"
			  }else if($url == 'bgsp'){
			  	return "http://bgsp.jstspg.com/rpt/index/upLoad"
			  }
			},
			handleChange(file, fileList) {
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
				let $uri = this.estateForm.pdfUri
				let index = $uri.lastIndexOf("\//")
				console.log($uri.substr($uri.lastIndexOf('/', $uri.lastIndexOf('/') - 1) + 1))
				let para = {
					realName: this.estateForm.realName,
					uri: $uri.substr($uri.lastIndexOf('/', $uri.lastIndexOf('/') - 1) + 1)
				}
				// getDownload(para).then((res) => {
					window.location.href = $uri.substring(0,index+1)+'rpt/index/download?uri='+ para.uri +'&realName=' + para.realName
				// })
			},
			previewPdf(){
				window.open(this.pdfUrl,'_blank')
			},
			downloadZip(){
				window.location.href = this.upFileUrl
			},
			selChange1(val){
				// alert(val)
				console.log(this.reportNameList)
				console.log(this.regList)
				let me = this
				this.reportNameList.forEach(function(e,c){
					console.log(e)
					if(e.value == val){
						me.estateForm.firstReporterRgNum = me.regList[c].value
					}
				})
			},
			selChange2(val){
				// alert(val)
				console.log(this.reportNameList)
				console.log(this.regList)
				let me = this
				this.reportNameList.forEach(function(e,c){
					console.log(e)
					if(e.value == val){
						me.estateForm.partReporter1RgNum = me.regList[c].value
					}
				})
			},
			selChange3(val){
				// alert(val)
				console.log(this.reportNameList)
				console.log(this.regList)
				let me = this
				this.reportNameList.forEach(function(e,c){
					console.log(e)
					if(e.value == val){
						me.estateForm.partReporter2RgNum = me.regList[c].value
					}
				})
			},
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
