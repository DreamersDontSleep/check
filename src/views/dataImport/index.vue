<template>
	<div>
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="录入数据" name="first">
				<el-button @click="exportData()">导出</el-button>
				<el-upload class="upload-demo" action="" :on-change="handleChange" :on-exceed="handleExceed" :on-remove="handleRemove"
				 :file-list="fileListUpload" :limit="1" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
				 :auto-upload="false">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div>
				</el-upload>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="assessReportNum" label="估价报告编号" width="150">
					</el-table-column>
					<el-table-column prop="projectName" label="项目名称" width="150">
					</el-table-column>
					<el-table-column prop="assessAim" label="估价目的" width="150">
					</el-table-column>
					<el-table-column prop="assessMethod" label="估价方法" width="150">
					</el-table-column>
					<el-table-column prop="assessStartTime" label="估价作业开始日" width="150">
					</el-table-column>
					<el-table-column prop="assessEndTime" label="估计作业结束日" width="150">
					</el-table-column>
					<el-table-column prop="valueTime" label="估价时点" width="150">
					</el-table-column>
					<el-table-column prop="floorArea" label="土地面积(m2)" width="150">
					</el-table-column>
					<el-table-column prop="buildingArea" label="建筑面积(m2)" width="150">
					</el-table-column>
					<el-table-column prop="assessTotalPrice" label="评估总值(万元)" width="150">
					</el-table-column>
					<el-table-column prop="assessUnitPrice" label="评估单价(元)" width="150">
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
			<el-tab-pane label="导入数据" name="second">
				<el-button @click="importData()">导入</el-button>
				<el-button @click="exportData()">导出</el-button>
				<el-table :data="tableData1" style="width: 100%">
					<el-table-column prop="assessReportNum" label="估价报告编号" width="150">
					</el-table-column>
					<el-table-column prop="projectName" label="项目名称" width="150">
					</el-table-column>
					<el-table-column prop="assessAim" label="估价目的" width="150">
					</el-table-column>
					<el-table-column prop="assessMethod" label="估价方法" width="150">
					</el-table-column>
					<el-table-column prop="assessStartTime" label="估价作业开始日" width="150">
					</el-table-column>
					<el-table-column prop="assessEndTime" label="估计作业结束日" width="150">
					</el-table-column>
					<el-table-column prop="valueTime" label="估价时点" width="150">
					</el-table-column>
					<el-table-column prop="floorArea" label="土地面积(m2)" width="150">
					</el-table-column>
					<el-table-column prop="buildingArea" label="建筑面积(m2)" width="150">
					</el-table-column>
					<el-table-column prop="assessTotalPrice" label="评估总值(万元)" width="150">
					</el-table-column>
					<el-table-column prop="assessUnitPrice" label="评估单价(元)" width="150">
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
	export default {
		data() {
			return {
				tableData: [{
					assessReportNum: '1',
					projectName: '1',
					assessAim: '1',
					assessMethod: '1',
					assessEndTime: '1',
					valueTime: '1',
					floorArea: '1',
					buildingArea: '1',
					assessTotalPrice: '1',
					assessUnitPrice: '1',
					assessObject: '1',
					client: '1',
					clientSite: '1',
					clientPhone: '1',
					firstReporter: '1',
					firstReporterRgNum: '1',
					partReporter1: '1',
					partReporter1RgNum: '1',
					partReporter2: '1',
					branchOffice: '1',
					status: '1',
					assessStartTime: '1',
				}],
				tableData1: [{
					assessReportNum: '12',
					projectName: '12',
					assessAim: '12',
					assessMethod: '12',
					assessEndTime: '12',
					valueTime: '12',
					floorArea: '1',
					buildingArea: '1',
					assessTotalPrice: '1',
					assessUnitPrice: '1',
					assessObject: '1',
					client: '1',
					clientSite: '1',
					clientPhone: '1',
					firstReporter: '1',
					firstReporterRgNum: '1',
					partReporter1: '1',
					partReporter1RgNum: '1',
					partReporter2: '1',
					branchOffice: '1',
					status: '1',
					assessStartTime: '1',
				}],
				activeName: 'first',
				fileListUpload: [],
				fileTemp: ''
			}
		},

		methods: {
			importData() {
				console.log(1)
			},

			exportData() {
				console.log(2)
				require.ensure([], () => {
					const {
						export_json_to_excel
					} = require('../../Export2Excel.js')
					const tHeader = ['估价报告编号', '项目名称', '估价目的', '估价方法', '估价作业开始日',
						'估计作业结束日', '估价时点', '土地面积(m2)', '建筑面积(m2)', '评估总值(万元)',
						'评估单价(元)', '估价对象位置', '委托人', '委托人地址', '委托人电话', '第一报告人', '第一报告人注册号',
						'参与报告人1', '注册号', '参与报告人2', '分公司', '状态'
					]
					const filterVal = ['projectName', 'assessReportNum', 'assessStartTime', 'assessEndTime', 'assessObject',
						'valueTime', 'assessAim', 'assessMethod', 'buildingArea', 'floorArea', 'assessUnitPrice', 'assessTotalPrice',
						'client', 'clientSite', 'clientPhone', 'firstReporter', 'firstReporterRgNum', 'partReporter1',
						'partReporter1RgNum','partReporter2', 'branchOffice', 'status'
					]
					const list = [{
						assessReportNum: '12',
						projectName: '12',
						assessAim: '12',
						assessMethod: '12',
						assessEndTime: '12',
						valueTime: '12',
						floorArea: '1',
						buildingArea: '1',
						assessTotalPrice: '1',
						assessUnitPrice: '1',
						assessObject: '1',
						client: '1',
						clientSite: '1',
						clientPhone: '1',
						firstReporter: '1',
						firstReporterRgNum: '1',
						partReporter1: '1',
						partReporter1RgNum: '1',
						partReporter2: '1',
						branchOffice: '1',
						status: '1',
						assessStartTime: '1',
					}]
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
				this.fileTemp = file.raw
				if(this.fileTemp){
				    if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type == 'application/vnd.ms-excel')){
				        this.importfxx(this.fileTemp)
				    } else {
				        this.$message({
				            type:'warning',
				            message:'附件格式错误，请删除后重新上传！'
				        })
				    }
				} else {
				    this.$message({
				        type:'warning',
				        message:'请上传附件！'
				    })
				}
			},

			handleRemove(file, fileList) {
				this.fileTemp = null
			},

			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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
			                obj.projectName = v['估价报告编号']
			                obj.assessReportNum = v['项目名称']
							obj.assessAim = v['估价目的']
							obj.assessMethod = v['估价方法']
							obj.assessStartTime = v['估价作业开始日']
							obj.assessEndTime = v['估计作业结束日']
							obj.valueTime = v['估价时点']
							obj.floorArea = v['土地面积(m2)']
							obj.buildingArea = v['建筑面积(m2)']
							obj.assessTotalPrice = v['评估总值(万元)']
							obj.assessUnitPrice = v['评估单价(元)']
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
							_this.tableData.push(obj)
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
