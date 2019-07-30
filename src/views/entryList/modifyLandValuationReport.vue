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
		        <el-select v-else v-model="estateForm.assessMethod" placeholder="请选择">
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
						<el-select v-else v-model="estateForm.firstReporter" placeholder="请选择">
							<el-option v-for="(item,index) in firstReporterList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
		      </template>
		    </el-form-item>
		    <el-form-item label="第一报告人注册号:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.firstReporterRgNum" disabled/>
		        <el-input v-else v-model="estateForm.firstReporterRgNum"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="参与报告人1:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.partReporter1" disabled/>
		        <!-- <el-input v-else v-model="estateForm.partReporter1"/> -->
						<el-select v-else v-model="estateForm.partReporter1" placeholder="请选择">
							<el-option v-for="(item,index) in partReporter1List" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
		      </template>
		    </el-form-item>
		    <el-form-item label="参与报告人2:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.partReporter2" disabled/>
		        <!-- <el-input v-else v-model="estateForm.partReporter2"/> -->
						<el-select v-else v-model="estateForm.partReporter2" placeholder="请选择">
							<el-option v-for="(item,index) in partReporter2List" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
		      </template>
		    </el-form-item>
		    <el-form-item label="参与报告人1注册号:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.partReporter1RgNum" disabled/>
		        <el-input v-else v-model="estateForm.partReporter1RgNum"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="参与报告人2注册号:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.partReporter2RgNum" disabled/>
		        <el-input v-else v-model="estateForm.partReporter2RgNum"/>
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
		        <!-- <el-input v-else v-model="estateForm.branchOffice"/> -->
						<el-select v-else v-model="estateForm.branchOffice" placeholder="请选择">
							<el-option v-for="(item,index) in cbranchOfficeList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
		      </template>
		    </el-form-item>
		    <el-form-item label="业务收费(万元):" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.serviceCharge" disabled/>
		        <el-input v-else v-model="estateForm.serviceCharge"/>
		      </template>
		    </el-form-item>
		    <el-form-item label="审核员:" style="width: 40%;">
		      <template>
		        <el-input v-if="lookOrEdit" v-model="estateForm.checker" disabled/>
		        <!-- <el-input v-else v-model="estateForm.checker"/> -->
						<el-select v-else v-model="estateForm.checker" placeholder="请选择">
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
		    <el-form-item label="文件上传" class="fl">
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
		        accept=".doc,.docx"
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
		        accept=".doc,.docx"
		        multiple v-else>
		        <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
		        <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx</div>
		      </el-upload>
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
		import { postUpdateRpt } from '@/api/entry'
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
				assessAimList: [{
					"label": "出让",
					"value": "出让"
				}, {
					"label": "转让",
					"value": "转让"
				}, {
					"label": "抵押",
					"value": "抵押"
				}, {
					"label": "征收",
					"value": "征收"
				}, {
					"label": "司法",
					"value": "司法"
				}, {
					"label": "咨询",
					"value": "咨询"
				}, {
					"label": "其他",
					"value": "其他"
				}],
				assessMethodList: [{
					"label": "比较法",
					"value": "比较法"
				}, {
					"label": "收益法",
					"value": "收益法"
				}, {
					"label": "成本法",
					"value": "成本法"
				}, {
					"label": "假设开发法",
					"value": "假设开发法"
				}, {
					"label": "基准地价修正法",
					"value": "基准地价修正法"
				}, {
					"label": "其他",
					"value": "其他"
				}],
				cbranchOfficeList: [{
					"label": "分公司1",
					"value": "分公司1"
				}, {
					"label": "分公司2",
					"value": "分公司2"
				}
				],
				firstReporterList:[
					{
						"label": "name1",
						"value": "name1"
					}, {
						"label": "name2",
						"value": "name2"
					}, {
						"label": "name3",
						"value": "name3"
					}, {
						"label": "name4",
						"value": "name4"
					}
				],
				partReporter1List:[
					{
						"label": "name1",
						"value": "name1"
					}, {
						"label": "name2",
						"value": "name2"
					}, {
						"label": "name3",
						"value": "name3"
					}, {
						"label": "name4",
						"value": "name4"
					}
				],
				partReporter2List:[
					{
						"label": "name1",
						"value": "name1"
					}, {
						"label": "name2",
						"value": "name2"
					}, {
						"label": "name3",
						"value": "name3"
					}, {
						"label": "name4",
						"value": "name4"
					}
				],
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
				id: ''
			}
		},
		created() {
		  const content = this.$route.query.contents
		  console.log(content)
		  this.estateForm = content
		  this.lookOrEdit = this.$route.query.lookOrEdit
			this.id = content.id
		  const fileUrl = this.estateForm.wordUri
		  const fileIndex = fileUrl.lastIndexOf('\/')
		  const fileName = fileUrl.substring(fileIndex + 1, fileUrl.length)
		  console.log(fileName)
		  this.fileList[0].name = fileName
		  this.fileList[0].url = fileUrl
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
		methods:{
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
					this.estateForm.pdfUri = response.data.pdfPath
					this.estateForm.wordUri = response.data.wordPath
				}else{
					return ;
				}
			},
			handleRemove(file, fileList) {
			  console.log(file, fileList)
			},
			UploadUrl() {
			  let upUrl = 'http://fcpgpre.jstspg.com/rpt/index/upLoad/'+ this.id
			  return upUrl
			},
			handleChange(file, fileList) {
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
