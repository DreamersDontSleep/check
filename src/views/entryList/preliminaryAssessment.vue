<template>
	<div style="margin-left: 30px;">
		<h3>基本信息</h3>
		<template>
			<el-form :model="estateForm" ref="estateForm" :rules="inputRule" label-width="180px">
				<el-form-item label="报告类型:" style="width: 40%;" prop="reportType">
					<template>
				<!-- 		<div v-if="estateForm.reportType == 4">
							<el-input value="预评估" disabled></el-input> -->
							<el-select v-model="estateForm.reportType" placeholder="请选择">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
						<!-- </div> -->
					</template>
				</el-form-item>
				<el-form-item label="项目名称:" style="width: 40%;" prop="projectName">
					<template>
						<el-input v-model="estateForm.projectName"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="估价报告编号:" style="width: 40%;" prop="assessReportNum">
					<template>
						<el-input v-model="estateForm.assessReportNum"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="估价目的:" style="width: 40%;" prop="assessAim">
					<template>
						<el-select v-model="estateForm.assessAim" placeholder="请选择">
							<el-option v-for="(item,index) in assess" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="产权人:" style="width: 40%;" prop="propertyOwner">
					<template>
						<el-input v-model="estateForm.propertyOwner"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="建筑面积(m2):" style="width: 40%;" prop="buildingArea">
					<template>
						<el-input v-model.number="estateForm.buildingArea"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="土地面积(m2):" style="width: 40%;" prop="buildingArea">
					<template>
						<el-input v-model.number="estateForm.floorArea"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估总价(万元):" style="width: 40%;" prop="assessTotalPrice">
					<template>
						<el-input v-model.number="estateForm.assessTotalPrice"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="分公司:" style="width: 40%;" prop="branchOffice">
					<template>
						<!-- <el-input v-model="estateForm.assessMethod"></el-input> -->
						<el-input v-model="estateForm.branchOffice" disabled></el-input>
						<!-- <el-select v-model="estateForm.branchOffice" placeholder="请选择" style="width: 331px;">
							<el-option v-for="(item,index) in cbranchOfficeList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select> -->
					</template>
				</el-form-item>
				<el-form-item label="审核员:" style="width: 40%;" prop="checker">
					<template>
						<!-- <el-input v-model="estateForm.assessMethod"></el-input> -->
						<el-select v-model="estateForm.checker" filterable placeholder="请选择" style="width: 331px;">
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
				<el-form-item label="文件名:" style="width: 40%;" prop="realName">
					<template>
						<el-input v-model="estateForm.realName"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="文件上传" class="fl" style="display: block;">
					<el-upload
					  class="upload-demo"
					  ref="upload"
					  name="file"
					  :action="UploadUrl ()"
					  :on-preview="handlePreview"
					  accept=".pdf"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  :on-success="handleSuccess"
					  :auto-upload="true"
					  :on-change="handleChange"
					  :limit="1"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					  <div prop="fileCheck" v-show="false">{{fileCheck}}</div>
					  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
					  <div slot="tip" class="el-upload__tip">支持扩展名：.pdf</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="文件上传(压缩文件)" class="fl" style="width: 80%;">
					<el-upload class="upload-demo" ref="upload2" name="file" :action="UploadUrl ()" :on-preview="handlePreview"
					 accept=".rar,.zip" :on-remove="handleRemove" :before-remove="beforeRemove" :auto-upload="true" :on-success="handleSuccess2"
					 :on-change="handleChange2" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList2">
						<div prop="fileCheck2" v-show="false">{{fileCheck2}}</div>
						<el-button slot="trigger" size="small" type="primary">选择文件</el-button>
						<div slot="tip" class="el-upload__tip">支持扩展名：.rar,.zip</div>
					</el-upload>
				</el-form-item>
				<el-form-item style="display: block;">
					<el-button @click="submitForm(estateForm)">提交</el-button>
					<el-button @click="cancelForm(estateForm)">返回</el-button>
					<el-button @click="restForm(estateForm)">重置</el-button>
				</el-form-item>
			</el-form>
		</template>
	</div>
</template>

<script>
import { postReportData, postsaveRpt, getDictionary } from '@/api/entry'
import { mapGetters } from 'vuex'
export default {
  data() {
		return {
			estateForm:{
				reportType: '4',
				branchOffice: '',
				assessReportNum: '苏天房估',
				checker: '',
				applicant: '',
				login: '',
				pdfUri: '',
				wordUri: '',
				upFileURI: '',
				floorArea: '',
				assessOrg: '江苏天圣房地产土地资产评估测绘有限公司',
				realName: ''
			},
			checkForm:{
				checkAccount: '12个'
			},
			assess: '',
			editFormVisible: false,
			fileList: [],
			fileList2: [],
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
			options:[{
				"label": "预评估(房地产)",
				"value": "4"
			},{
				"label": "预评估(土地)",
				"value": "5"
			}],
			fileCheck:'',
			fileCheck2: '',
			valueTypeList:[{
					"label": "出让",
					"value": "出让"
				},{
					"label": "不出让",
					"value": "不出让"
			}],
			cbranchOfficeList: [{
				"label": "分公司1",
				"value": "分公司1"
			}, {
				"label": "分公司2",
				"value": "分公司2"
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
			inputRule:{
				projectName: [{ required: false, trigger: 'blur', message: '不能为空' }],
				assessReportNum: [{ required: false, trigger: 'blur', message: '不能为空' }],
				branchOffice: [{ required: true, trigger: 'blur', message: '不能为空' }],
				assessAim: [{ required: true, trigger: 'blur', message: '不能为空' }],
				propertyOwner: [{ required: true, trigger: 'blur', message: '不能为空' }],
				checker: [{ required: true, trigger: 'blur', message: '不能为空' }],
				assessOrg: [{ required: true, trigger: 'blur', message: '不能为空' }],
				fileCheck: [ {required: true,trigger: 'blur',message: '不能为空'}],
				buildingArea: [ {required: true,trigger: 'blur',message: '不能为空'}, { type:'number', message: '必须是数字' }],
				assessTotalPrice: [ {required: true,trigger: 'blur',message: '不能为空'}, { type:'number', message: '必须是数字' }]
			},
			testFile: ''
	  }
  },
  computed: {
	  ...mapGetters(['name','userInfo'])
    },
	mounted() {
		// this.estateForm.branchOffice = this.userInfo.department
		this.estateForm.applicant = this.name;
		this.estateForm.login = localStorage.getItem('userId')
		this.getTreeData()
	},
	methods:{
		getTreeData(){
			getDictionary().then( (res) => {
				let me = this
				console.log("权限数据源",res);
				// 重新匹配分公司数据
				let depData = res.data.fgs
				let depArr = [];
				for(let i = 0; i < depData.length; i++){
					let obj = {id: '',name: ''};
					console.log(depData[0])
						for(let key in depData[i]){
							obj.id = depData[i][key][0].value;
							obj.name = depData[i][key][1].value;
							depArr.push(obj);
						}
				}
				console.log("城市数据",depArr)
				depArr.forEach(function(e) {
					if (e.id == me.userInfo.department) {
						me.estateForm.branchOffice = e.name
					}else{
						me.estateForm.branchOffice = me.userInfo.department
					}
				})
				this.checkerList = res.data.sh2019[0].list
				this.assess = res.data.fdc2019[2].gjmd.reverse()
				// console.log(this.assess)
			})	
		},
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
		submitUpload() {
			
			this.$refs.upload.submit();
		},
		uploadFile(file){
			console.log(file);
		},
		handleChange(file, fileList) {
			this.fileList = fileList;
			this.file = file;
			this.fileCheck = fileList
			// console.log(file)
		},
		handleChange2(file, fileList) {
			this.fileList2 = fileList;
			this.file = file;
			this.fileCheck2 = fileList
			console.log(file)
		},
		submitForm(estateForm){
			this.$refs.estateForm.validate((valid) => {
			  if (valid) {
					console.log(this.fileList)
					if(this.fileCheck == ""){
											 this.$message({
															message:'请上传文件!', 
															type: 'warning'
														})
					}else{
						this.$confirm('确认提交该记录吗?', '提示', {
							type: 'warning'
						}).then(() => {
							let para = estateForm
							 console.log(para)
							 postsaveRpt(para).then ( (res) => {
							 	if(res.code == 200){
							 		console.log(res)
							 		this.rptId = res.data
							 		this.$message({
							 			message:'提交成功!', 
							 			type: 'success'
							 		})
									this.$router.push({path:'/entryList/index'})
							 	}
							 })
							// this.$router.push({path:'/entryList/index'})
						}).catch(() => {
							
						});
					}
			  } else {
					this.$message({
						message: '请输入必填字段!',
						type: 'warning'
					})
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
		handleSuccess(response, file, fileList) {
			console.log(file.name.substring(0,file.name.length-4));
			if (response.code == 200) {
				console.log(this.estateForm)
				this.estateForm.pdfUri = response.data[0].pdfPath
				this.estateForm.wordUri = response.data[0].wordPath
				this.estateForm.realName = file.name.substring(0,file.name.length-4)
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
			console.log(file, fileList);
			this.fileList = []
		},
		handlePreview(file) {
			console.log(file);
		},
		handleExceed(files, fileList) {
			this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
		},
		beforeRemove(file, fileList) {
			return this.$confirm(`确定移除 ${ file.name }？`);
		},
		beforeUpLoad(file){
			var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
			alert(file.size)
			this.testFile = file.size
			const isLt2M = file.size / 1024 / 1024 > 0  
			if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能小于 0MB!',
						type: 'warning'
					});
				}
			return isLt2M
		}
	}
}
</script>

<style>
</style>
