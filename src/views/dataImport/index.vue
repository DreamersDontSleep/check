<template>
	<div>
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="录入数据" name="first">
				<el-button @click="exportData()">导出</el-button>
				<el-date-picker
				      v-model="value2"
				      type="daterange"
				      align="right"
				      unlink-panels
				      range-separator="至"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      :picker-options="pickerOptions"
					  value-format="yyyy-MM-dd">
				</el-date-picker>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column type="index" label="序号" width="60" />
					<el-table-column label="申请编号" align="center">
						<template slot-scope="scope">
							{{ scope.row.applicationNum }}
						</template>
					</el-table-column>
					<el-table-column label="分公司">
						<template slot-scope="scope">
							{{ scope.row.branchOffice }}
						</template>
					</el-table-column>
					<el-table-column label="评估目的">
						<template slot-scope="scope">
							{{ scope.row.assessAim }}
						</template>
					</el-table-column>
					<el-table-column  label="报告类型">
					  <template slot-scope="scope">
						<div v-if="scope.row.reportType == 1">
							<span style="color: rgba(107, 107, 107, 0.647058823529412);">房地产估价报告</span>
						</div>
						<div v-if="scope.row.reportType == 2">
							<span style="color: #FFAA00;">土地估价报告</span>
						</div>
						<div v-if="scope.row.reportType == 3">
							<span style="color: rgba(255, 0, 0, 0.647058823529412);">资产评估报告</span>
						</div>
						<div v-if="scope.row.reportType == 4">
							<span style="color: rgba(255, 0, 0, 0.647058823529412);">预评估</span>
						</div>
					  </template>
					</el-table-column>
					<el-table-column label="申请人">
						<template slot-scope="scope">
							{{ scope.row.applicant }}
						</template>
					</el-table-column>
					<el-table-column label="申请时间">
						<template slot-scope="scope">
							{{ scope.row.applicationDate }}
						</template>
					</el-table-column>
					<el-table-column label="报告审批状态">
						<template slot-scope="scope">
							<div v-if="scope.row.state == 0">未提交</div>
							<div v-else-if="scope.row.state == 1">待审核</div>
							<div v-else-if="scope.row.state == 3">已审核（通过）</div>
							<div v-else-if="scope.row.state == 4">已审核（未通过）</div>
						</template>
					</el-table-column>
					<el-table-column label="报告盖章状态">
						<template slot-scope="scope">
							<div v-if="scope.row.stampState == '' || scope.row.stampState == null || scope.row.stampState == 0">
								<span style="color: #999">未盖章</span>
							</div>
							<div v-if="scope.row.stampState == 1">
								<span style="color: rgba(107, 107, 107, 0.647058823529412);">已转交待盖章</span>
							</div>
							<div v-if="scope.row.stampState == 2">
								<span style="color: red">已盖章</span>
							</div>
						</template>
					</el-table-column>
					<!-- <el-table-column label="审核结果">
						<template slot-scope="scope">
							<div v-if="scope.row.state == 3" style="color: #409EFF;">审核通过</div>
							<div v-else-if="scope.row.state == 4" style="color: red;">审核未通过</div>
							<div v-else>未审核</div>
						</template>
					</el-table-column> -->
					<el-table-column label="备注">
						<template slot-scope="scope">
							{{ scope.row.remark }}
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="导入数据" name="second">
				<el-button @click="importData()">导入</el-button>
				<el-button @click="exportData2()">导出</el-button>
				<el-upload class="upload-demo" :action="UploadUrl ()" :on-change="handleChange" :on-exceed="handleExceed" :on-remove="handleRemove"
				 :file-list="fileListUpload" :limit="1" accept=".xlsx,.xls" :on-success="handleSuccess"
				 :auto-upload="true">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div>
				</el-upload>
			
				<el-table :data="tableData1" style="width: 100%">
					<el-table-column prop="projectName" label="报告编号" width="150">
					</el-table-column>
					<el-table-column prop="assessReportNum" label="项目名称" width="150">
					</el-table-column>
					<el-table-column prop="assessAim" label="估价目的" width="150">
					</el-table-column>
					<el-table-column prop="assessMethod" label="估价方法" width="150">
					</el-table-column>
					<el-table-column prop="assessStartTime" label="估价作业开始日" width="150">
					</el-table-column>
					<el-table-column prop="assessEndTime" label="估价作业结束日" width="150">
					</el-table-column>
					<el-table-column prop="valueTime" label="估价时点" width="150">
					</el-table-column>
					<el-table-column prop="floorArea" label="土地面积（㎡）" width="150">
					</el-table-column>
					<el-table-column prop="buildingArea" label="建筑面积（㎡）" width="150">
					</el-table-column>
					<el-table-column prop="assessTotalPrice" label="估价总值（万元）" width="150">
					</el-table-column>
					<el-table-column prop="assessUnitPrice" label="评估单价（元）" width="150">
					</el-table-column>
					<el-table-column prop="assessObject" label="估价对象位置" width="150">
					</el-table-column>
					<el-table-column prop="client" label="委托人" width="150">
					</el-table-column>
					<el-table-column prop="clientSite" label="委托人地址" width="150">
					</el-table-column>
					<el-table-column prop="clientPhone" label="委托人电话" width="150">
					</el-table-column>
					<el-table-column prop="firstReporter" label="第一报告人" width="150">
					</el-table-column>
					<el-table-column prop="firstReporterRgNum" label="第一报告人注册号" width="150">
					</el-table-column>
					<el-table-column prop="partReporter1" label="参与报告人1" width="150">
					</el-table-column>
					<el-table-column prop="partReporter1RgNum" label="注册号" width="150">
					</el-table-column>
					<el-table-column prop="partReporter2" label="参与报告人2" width="150">
					</el-table-column>
					<el-table-column prop="branchOffice" label="分公司" width="150">
					</el-table-column>
					<el-table-column prop="status" label="状态" width="150">
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import { getImportList, getExcelList } from '@/api/import'
	import { getEntryList } from '@/api/entry'
	export default {
		data() {
			return {
				tableData: [],
				tableData1: [],
				activeName: 'first',
				fileListUpload: [],
				fileTemp: '',
				value2: '',
				value1: '',
				pickerOptions: {
				          shortcuts: [{
				            text: '最近一周',
				            onClick(picker) {
				              const end = new Date();
				              const start = new Date();
				              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
				              picker.$emit('pick', [start, end]);
				            }
				          }, {
				            text: '最近一个月',
				            onClick(picker) {
				              const end = new Date();
				              const start = new Date();
				              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
				              picker.$emit('pick', [start, end]);
				            }
				          }, {
				            text: '最近三个月',
				            onClick(picker) {
				              const end = new Date();
				              const start = new Date();
				              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
				              picker.$emit('pick', [start, end]);
				            }
				          }]
				        },
			}
		},
		
		mounted(){
			this.getAllList({});
			this.fetchProjectList()
		},

		methods: {
			
			fetchProjectList() {
				let para = {
						"state": [],
						"branchOffice": "",
						"login": "",
						"applicant": "",
						"checker": ""
					}
				getEntryList(para).then((res) => {
					this.tableData = res.data.reverse()
					console.log(res)
				})
			},
			importData() {
				console.log(1)
			},
			
			getAllList(para){
				getImportList(para).then( (res) => {
					console.log(res)
					if(res.code == 200){
						this.tableData1 = res.data
					}
				})
			},
			
			getDateData(para){
				getExcelList(para).then((res) => {
					console.log(res.data)
					if(res.code == 200){
						this.tableData = res.data.reverse()
						require.ensure([], () => {
							const {
								export_json_to_excel
							} = require('../../Export2Excel.js')
							const tHeader = ['序号', '申请编号', '分公司', '评估目的', '报告类型',
								'申请人', '申请时间', '报告审批状态', '报告盖章状态', '备注',
							]
							const filterVal = ['projectName', 'applicationNum', 'branchOffice', 'assessAim', 'reportType',
								'applicant', 'applicationDate', 'state', 'stampState', 'remark']
							const list = this.tableData
							const data = this.formatJson(filterVal, list)
							export_json_to_excel(tHeader, data, '导出列表名称')
						})
					}
				})
			},

			exportData() {
				console.log(2)
				console.log(this.value2)
				console.log(this.value1)
				if(this.value2 !== ""){
					let para = {
						starttime: this.value2[0],
						endtime: this.value2[1]
					} 
					this.getDateData(para)
				}else{
					let para = {
						starttime: "",
						endtime: ""
					} 
					this.getDateData(para)
				}
				
				// require.ensure([], () => {
				// 	const {
				// 		export_json_to_excel
				// 	} = require('../../Export2Excel.js')
				// 	const tHeader = ['序号', '申请编号', '分公司', '评估目的', '报告类型',
				// 		'申请人', '申请时间', '报告审批状态', '报告盖章状态', '备注',
				// 	]
				// 	const filterVal = ['projectName', 'applicationNum', 'branchOffice', 'assessAim', 'reportType',
				// 		'applicant', 'applicationDate', 'state', 'stampState', 'remark']
				// 	const list = this.tableData
				// 	const data = this.formatJson(filterVal, list)
				// 	export_json_to_excel(tHeader, data, '导出列表名称')
				// })
			},
			
			exportData2() {
				console.log(2)
				require.ensure([], () => {
					const {
						export_json_to_excel
					} = require('../../Export2Excel.js')
					const tHeader = ['报告编号', '项目名称', '估价目的', '估价方法', '估价作业开始日',
						'估价作业结束日', '估价时点', '土地面积（㎡）', '建筑面积（㎡）', '估价总值（万元）',
						'评估单价（元）', '估价对象位置', '委托人', '委托人地址', '委托人电话', '第一报告人', '第一报告人注册号',
						'参与报告人1', '注册号', '参与报告人2', '分公司', '状态'
					]
					const filterVal = ['projectName', 'assessReportNum', 'assessStartTime', 'assessEndTime', 'assessObject',
						'valueTime', 'assessAim', 'assessMethod', 'buildingArea', 'floorArea', 'assessUnitPrice', 'assessTotalPrice',
						'client', 'clientSite', 'clientPhone', 'firstReporter', 'firstReporterRgNum', 'partReporter1',
						'partReporter1RgNum','partReporter2', 'branchOffice', 'status'
					]
					const list = this.tableData1
					const data = this.formatJson(filterVal, list)
					export_json_to_excel(tHeader, data, '导出列表名称')
				})
			},

			handleClick(tab, event) {
				console.log(tab, event);
			},

			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]))
			},

			handleChange(file, fileList) {
				// this.fileTemp = file.raw
				// if(this.fileTemp){
				//     if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type == 'application/vnd.ms-excel')){
				//         this.importfxx(this.fileTemp)
				//     } else {
				//         this.$message({
				//             type:'warning',
				//             message:'附件格式错误，请删除后重新上传！'
				//         })
				//     }
				// } else {
				//     this.$message({
				//         type:'warning',
				//         message:'请上传附件！'
				//     })
				// }
				console.log(file)
			},

			handleRemove(file, fileList) {
				// this.fileTemp = null
				console.log(file)
			},

			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			
			UploadUrl() {
				let $url = window.location.href.substring(7,11);
				console.log($url)
				if($url == "loca"){
					return "rpt/execl/import"
				}else if($url == "fcpg"){
					return "http://fcpgpre.jstspg.com/rpt/execl/import"
				}else{
					return "http://bgsp.jstspg.com/rpt/execl/import"
				}
			},
			
			handleSuccess(response, file, fileList) {
				console.log(response);
				// if (response.code == 200) {
				// 	console.log(this.estateForm)
				// 	this.estateForm.upFileURI = response.data[0].wordPath
				// } else {
				// 	return;
				// }
				if(response == true){
					this.getAllList({})
				}
			},
			
			importfxx(obj) {
			    let _this = this;
			    // 通过DOM取文件数据
			    this.file = obj
			    var rABS = false; //是否将文件读取为二进制字符串
			    var f = this.file;
			    var reader = new FileReader();
			    //if (!FileReader.prototype.readAsBinaryString) {
			    FileReader.prototype.readAsBinaryString = function(f) {
			        var binary = "";
			        var rABS = false; //是否将文件读取为二进制字符串
			        var pt = this;
			        var wb; //读取完成的数据
			        var outdata;
			        var reader = new FileReader();
			        reader.onload = function(e) {
			        var bytes = new Uint8Array(reader.result);
			        var length = bytes.byteLength;
			        for(var i = 0; i < length; i++) {
			            binary += String.fromCharCode(bytes[i]);
			        }
			        var XLSX = require('xlsx');
			        if(rABS) {
			            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
			                type: 'base64'
			            });
			        } else {
			            wb = XLSX.read(binary, {
			                type: 'binary'
			            });
			        }
			        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
			            this.da = [...outdata]
			            let arr = []
			            this.da.map(v => {
			                let obj = {}
			                obj.assessReportNum = v['报告编号']
			                obj.projectName = v['项目名称']
							obj.assessAim = v['估价目的']
							obj.assessMethod = v['估价方法']
							obj.assessStartTime = v['估价作业开始日']
							obj.assessEndTime = v['估价作业结束日']
							obj.valueTime = v['估价时点']
							obj.floorArea = v['土地面积（㎡）']
							obj.buildingArea = v['建筑面积（㎡）']
							obj.assessTotalPrice = v['估价总值（万元）']
							obj.assessUnitPrice = v['评估单价（元）']
							obj.assessObject = v['估价对象位置']
							obj.client = v['委托人']
							obj.clientSite = v['委托人地址']
							obj.clientPhone = v['委托人电话']
							obj.firstReporter = v['第一报告人']
							obj.firstReporterRgNum = v['第一报告人注册号']
							obj.partReporter1 = v['参与报告人1']
							obj.partReporter1RgNum = v['注册号']
							obj.partReporter2 = v['参与报告人2']
							obj.branchOffice = v['分公司']
							obj.status = v['状态']
			                arr.push(obj)
							_this.tableData1.push(obj)
			            })
						console.log('arr',arr)
			            return arr
						
			        }
			        reader.readAsArrayBuffer(f);
			    }
			    
			    if(rABS) {
			        reader.readAsArrayBuffer(f);
			    } else {
			        reader.readAsBinaryString(f);
			    }
			},
		}
	}
</script>

<style>
</style>
