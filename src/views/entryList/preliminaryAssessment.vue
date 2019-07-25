<template>
	<div style="margin-left: 30px;">
		<h3>基本信息</h3>
		<template>
			<el-form :model="estateForm" ref="estateForm" :rules="inputRule" label-width="180px">
				<el-form-item label="业务来源:" style="width: 40%;" prop="reportType">
					<template>
						<div v-if="estateForm.reportType == 4">
							<el-input value="预评估" disabled></el-input>
						</div>
					</template>
				</el-form-item>
				<el-form-item label="分公司:" style="width: 40%;" prop="branchOffice">
					<template>
						<el-input v-model="estateForm.branchOffice"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="审核员:" style="width: 40%;" prop="checker">
					<template>
						<!-- <el-input v-model="estateForm.assessMethod"></el-input> -->
						<el-select v-model="estateForm.checker" placeholder="请选择" style="width: 331px;">
							<el-option v-for="(item,index) in checkerList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="评估机构:" style="width: 40%;" prop="assessOrg">
					<template>
						<el-input v-model="estateForm.assessOrg"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="文件上传" class="fl" style="display: block;">
					<el-upload
					  class="upload-demo"
					  ref="upload"
					  name="file"
					  :action="UploadUrl ()"
					  :data="uploadData"
					  :on-preview="handlePreview"
					  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  :auto-upload="false"
					  :on-change="handleChange"
					  multiple
					  :limit="1"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
					  <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg</div>
					</el-upload>
				</el-form-item>
				<el-form-item style="display: block;">
					<el-button @click="submitForm()">提交</el-button>
					<el-button @click="cancelForm(estateForm)">返回</el-button>
					<el-button @click="restForm(estateForm)">重置</el-button>
				</el-form-item>
			</el-form>
		</template>
	</div>
</template>

<script>
import { postReportData } from '@/api/entry'
export default {
  data() {
		return {
			estateForm:{
				reportType: '4',
				branchOffice: '',
				checker: '',
				assessOrg: '江苏天圣房地产土地资产评估测绘有限公司'
			},
			checkForm:{
				checkAccount: '12个'
			},
			editFormVisible: false,
			fileList: [],
			assessAimList:[{
					"label": "出让",
					"value": "出让"
				},{
					"label": "不出让",
					"value": "不出让"
			}],
			assessMethodList:[{
					"label": "出让",
					"value": "出让"
				},{
					"label": "不出让",
					"value": "不出让"
			}],
			valueTypeList:[{
					"label": "出让",
					"value": "出让"
				},{
					"label": "不出让",
					"value": "不出让"
			}],
			checkerList:[
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
			inputRule:{
				projectName: [{ required: true, trigger: 'blur', message: '不能为空' }],
				branchOffice: [{ required: true, trigger: 'blur', message: '不能为空' }],
				checker: [{ required: true, trigger: 'blur', message: '不能为空' }],
				assessOrg: [{ required: true, trigger: 'blur', message: '不能为空' }]
			}
	  }
  },
  computed: {
  	uploadData: function () {
  		let parseData = JSON.stringify(this.estateForm);
  	    let params = {
  			data: parseData
  		  }
  		  return params
  		}
    },
  
	methods:{
		searchTable(editForm){
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
		UploadUrl () {
			return "http://fcpgpre.jstspg.com/rpt/index/saveRptOrFile"
		},
		submitUpload() {
			
			this.$refs.upload.submit();
		},
		uploadFile(file){
			console.log(file);
		},
		handleChange(file, fileList) {
		  this.fileList = fileList;
		  this.file = file;
		  console.log(file)
		},
		submitForm(){
			this.$refs.estateForm.validate((valid) => {
			  if (valid) {
					this.$confirm('确认提交该记录吗?', '提示', {
						type: 'warning'
					}).then(() => {
						this.$refs.upload.submit();
						// this.$router.push({path:'/entryList/index'})
					}).catch(() => {
						
					});
			  } else {
					console.log('error submit!!');
			  }
			});
			
		},
		cancelForm(estateForm) {
			this.$router.push({path:'/entryList/index'})
		},
		restForm() {
			this.$refs.estateForm.resetFields();
			// this.$refs.upload.clearFiles();
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
