<template>
	<div style="margin-left: 30px;">
		<h3>基本信息</h3>
		<template>
			<el-form :inline="true" :model="estateForm" ref="estateForm" label-width="180px">
				<el-form-item label="报告类型:" style="display: block;">
					<template>
						<el-input v-model="estateForm.type" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="项目名称:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.projectName"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="估价报告编号:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessReportNum"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="估价作业开始时间:" style="width: 40%;">
					<template>
						<el-date-picker v-model="estateForm.assessStartTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
					</template>
				</el-form-item>
				<el-form-item label="估价作业结束时间:" style="width: 40%;">
					<template>
						<el-date-picker v-model="estateForm.assessEndTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
					</template>
				</el-form-item>
				<el-form-item label="估价时点:" style="width: 40%;">
					<template>
						<el-date-picker v-model="estateForm.valueTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
					</template>
				</el-form-item>
				<el-form-item label="估价对象:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessObject"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="估价目的:" style="width: 40%;">
					<template>
						<el-select v-model="estateForm.assessAim" placeholder="请选择">
							<el-option
								v-for="(item,index) in assessAimList"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="估价方法:" style="width: 40%;">
					<template>
						<!-- <el-input v-model="estateForm.assessMethod"></el-input> -->
						<el-select v-model="estateForm.assessMethod" placeholder="请选择">
							<el-option
								v-for="(item,index) in assessMethodList"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="价值类型:" style="width: 40%;">
					<template>
						<!-- <el-input v-model="estateForm.valueType"></el-input> -->
						<el-select v-model="estateForm.valueType" placeholder="请选择">
							<el-option
								v-for="(item,index) in valueTypeList"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="建筑面积(m2):" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.buildingArea"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="土地面积(m2):" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.floorArea"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估单价:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessUnitPrice"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估总价:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessTotalPrice"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="委托方:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.client"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="第一报告人:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.firstReporter"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="第一报告人注册号:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.firstReporterRgNum"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人1:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.partReporter1"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人2:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.partReporter2"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人1注册号:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.partReporter1RgNum"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="参与报告人2注册号:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.partReporter2RgNum"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="业务来源:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.serviceSource"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="分公司:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.branchOffice"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="业务收费:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.serviceCharge"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="报告类型:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.checker"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="审核员:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.assessOrg"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="评估机构:" style="width: 40%;">
					<template>
						<el-input v-model="estateForm.reportType"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="文件上传" class="fl">
					<el-upload
					  class="upload-demo"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :on-preview="handlePreview"
					  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  multiple
					  :limit="3"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg</div>
					  <!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
					</el-upload>
				</el-form-item>
				<el-form-item style="display: block;">
					<el-button @click="submitForm(estateForm)">提交</el-button>
					<el-button @click="cancelForm(estateForm)">取消</el-button>
				</el-form-item>
			</el-form>
		</template>
	</div>
</template>

<script>
export default {
  data() {
		return {
			estateForm:{
				type: '房地产估价报告',
				projectName: '',
				assessReportNum: '',
				assessStartTime: '',
				assessEndTime: '',
				assessObject: '',
				valueTime: '',
				assessAim: '',
				assessMethod: '',
				valueType: '',
				buildingArea: '',
				floorArea: '',
				assessUnitPrice: '',
				assessTotalPrice: '',
				client: '',
				firstReporter: '',
				firstReporterRgNum: '',
				partReporter1: '',
				partReporter1RgNum: '',
				partReporter2: '',
				partReporter2RgNum: '',
				serviceSource: '',
				branchOffice: '',
				serviceCharge: '',
				checker: '',
				assessOrg: '',
				reportType: '',
				leaveTime: ''
			},
			checkForm:{
				checkAccount: '12个'
			},
			editFormVisible: false,
			fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
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
		// 提交表单
		submitForm(estateForm){
			this.$refs.estateForm.validate((valid) => {
			  if (valid) {
				alert('submit!');
				console.log(estateForm);
			  } else {
				console.log('error submit!!');
				return false;
			  }
			});
		},
		cancelForm(estateForm){
			this.$refs.estateForm.validate((valid) => {
			  if (valid) {
				alert('submit!');
				console.log(estateForm);
			  } else {
				console.log('error submit!!');
				return false;
			  }
			});
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
