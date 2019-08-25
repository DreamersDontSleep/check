<template>
	<div>
		<template>
			<el-button type="warning" @click="button1_click()">重置审批文件</el-button>
			<!-- <el-button type="primary" @click="button2_click()">关闭文件</el-button> -->
			<!-- <el-button type="primary" @click="button3_click()">另存文件</el-button> -->
			<el-button type="primary" @click="button4_click()">添加二维码</el-button>
			<!-- <el-button type="primary" @click="button5_click()">上传盖章文件</el-button> -->
			<el-button type="success" @click="checkSuccess()">审批通过</el-button>
			<!-- <el-button type="success" @click="buttonTest()">test</el-button> -->
			<el-button type="success" @click="checkSuccessAndSeal()">审批通过并转让盖章</el-button>
			<el-select style="width: 250px;" placeholder="请选择" v-model="seal" v-show="sealFormVisible">
			  <el-option v-for="(item,index) in sealList"
			  :key="item.value"
			  :label="item.label"
			  :value="item.value"/>
			  </el-option>
			</el-select>
			<el-button type="primary" @click="changeSeal()" v-show="sealFormVisible">确定</el-button>
			<el-button type="danger" @click="checkFail()">审批不通过</el-button>
			<el-button type="danger" @click="checkBack()">返回</el-button>
			<el-form style='margin-top: 20px;'>
				<el-form-item label="审核意见:" style="display: block;">
					<el-input type="textarea" v-model="remark" style="width: 331px;"></el-input>
				</el-form-item>
			</el-form>
			<div style="min-width:900px; width:74%;margin-left: 100px;z-index: -1;">
				<object classid="CLSID:358327D8-B2C5-402F-B1F5-DD89FAA68BFF" id="ShareSunReaderSDK" style="height: 800px;z-index: -1; width:108%; margin-top: 0px;"
				 align="right">
				</object>
				<object classid="CLSID:7E0C4EA8-E4BF-43A4-8018-DBB82483BAD5" id="ShareSunReaderSDKs" style="height:600px; width:0px; margin-top: 0px;"
				 align="middle">
				</object>
			</div>
			<!-- <el-dialog :visible.sync="sealFormVisible" title="转让盖章">
			  <el-form :inline="true" :model="sealForm">
			    <el-form-item label="转让盖章权限:">
			      <template>
			        <el-select style="width: 250px;" placeholder="请选择" v-model="sealForm.seal">
			          <el-option v-for="(item,index) in sealList"
			          :key="item.value"
			          :label="item.label"
			          :value="item.value"/>
			          </el-option>
			        </el-select>
			      </template>
			    </el-form-item>
					<el-form-item>
					  <el-button type="primary" @click="changeSeal(sealForm)">确定</el-button>
					</el-form-item>
			  </el-form>
			</el-dialog> -->
		</template>
	</div>
</template>

<script>
	import {
		postReportData, getReportData, postCheckId, postUpdateRemark, transferToId, postUpdateRpt, getDictionary
	} from '@/api/entry'
	export default {
		data() {
			return {
				fileUrl: '',
				fileName: '',
				estForm: '',
				saveUrl: '',
				id: '',
				reportType:'',
				remark: '',
				seal: '',
				sealFormVisible: false,
				sealList:[{
					"label": "test",
					"value": "test"
				}],
			}
		},
		created() {
			const content = this.$route.query.content
			console.log(content)
			// this.estForm = content
			this.fileUrl = content.pdfUri
			this.id = content.id;
			this.reportType = content.reportType
			let fileIndex = this.fileUrl.lastIndexOf('\/');
			console.log(fileIndex);
			this.fileName = this.fileUrl.substring(fileIndex + 1, this.fileUrl.length);
			console.log(this.fileName)
		},
		mounted () {
			 if (!!window.ActiveXObject || "ActiveXObject" in window)
				{ console.log("welcome!") }
				else {
				  // alert('当前浏览器不是IE浏览器，请切换到IE浏览器！')
				  this.$message({
				  	message:'当前浏览器不是IE浏览器，请切换到IE浏览器!', 
				  	type: 'success'
				  })
				  // this.$router.push({path:'/checkList/index'})
				}
			this.hzonload_li1()
			this.button1_click()
			this.getReportDetail()
			this.getTreeData()
		},
		methods: {
			getTreeData(){
				getDictionary().then( (res) => {
					this.sealList = res.data.sh2019[0].list
					// console.log(this.assess)
				})	
			},
			getReportDetail() {
				getReportData(this.id, this.reportType).then((res) => {
					console.log(res)
					this.estForm = res.data
				})
			},
			hzonload_li1(){
				document.getElementById("ShareSunReaderSDK").FX_SignPDF_AddAboutLicense("xzu3X6dlBVyaBPw9L0eWazAXRbXsuXEn0y5DMEGbYXc8GLWYF8l7I6Xs1Z/seq2bkoNnomhWOmCRwtQMmdB1/kfI/E6GsKvL38o=");
				// this.button1_click();
			},
			button1_click() {
				let XSReaderSDK1 = document.getElementById("ShareSunReaderSDK");
				let openName = this.fileUrl;
				console.log(openName);
				// let openName = "http://fcpgpre.jstspg.com/rpt/open/gy.pdf";
				XSReaderSDK1.OpenFile(openName, "")
			},
			button2_click() {
				let XSReaderSDK1 = document.getElementById("ShareSunReaderSDK");
				XSReaderSDK1.CloseFile();
			},
			button3_click() {
				let XSReaderSDK1 = document.getElementById("ShareSunReaderSDK");
				this.saveUrl = "d:\\" + this.fileName;
			    let value2 = prompt("请输入文件保存路径", this.saveUrl);
				alert(value2);
				// let value2 = this.saveUrl;
			   XSReaderSDK1.SaveAs(value2);
			   var ifexits = XSReaderSDK1.FileExists(value2);
			   if (ifexits == true) {
				   this.$message({
				   	message:'文件已另存成功!', 
				   	type: 'success'
				   })
			   }else {
				   this.$message({
				   	message:'文件另存失败!', 
				   	type: 'warning'
				   })
			   }
				
			},
			button4_click() {
				var XSReaderSDK1 = document.getElementById("ShareSunReaderSDK");
			    // var content = prompt("请输入二维码内容", "http://www.17sucai.com/pins/27562.html");
			    // var page = prompt("请输入添加二维码的页码（从0开始）", "0");           
			    var X = prompt("请输入添加二维码左边距", "500");
			    var Y = prompt("请输入添加二维码的底部距离", "750");
			    // var hight = prompt("请输入添加二维码的高度", "100");
			    // var width = prompt("请输入添加二维码的宽度", "100");
			    // var fTransparency = prompt("请输入二维码透明度", "200");
			    // var fZoom = prompt("请输入二维码旋转角度", "0");
			    // alert(XSReaderSDK1.FX_SignPDF_AddGenerateCode(content, page, X, Y, hight, width, fTransparency, fZoom));
				let codeUrl = "http://fcpgpre.jstspg.com/code?a=" + Math.random() + "&id=" + this.id + "&reportType=" + this.reportType
				console.log(codeUrl)
				XSReaderSDK1.FX_SignPDF_AddGenerateCode(codeUrl, "0", X,Y, "100", "100", "200", "0");
			},
			buttonTest(){
				var sdk = document.getElementById("ShareSunReaderSDK");
				let svUrl =  sdk.XSReadDocName()
				svUrl = svUrl + '.pdf'
				alert(svUrl)
			},
			button5_click () {
				// this.button3_click();
				var XSReaderSDK1 = document.getElementById("ShareSunReaderSDKs");
				var sdk = document.getElementById("ShareSunReaderSDK");
				XSReaderSDK1.XSUnlock("EA27C68108D462FC3C2829E937836D69B3ACC6C8070C919FB3CD72646A3FAAAE0C0D256FC9B00EA0A1126E7ABE143972833DFCCB4B4");
				let svUrl =  sdk.XSReadDocName()
				// svUrl = svUrl + '.pdf'
				// alert(svUrl)
				var postUrl = "http://fcpgpre.jstspg.com/rpt/index/upLoad/";
				var post = XSReaderSDK1.XSPostFileByHttpEX(postUrl, svUrl);
				console.log(post)
				let psData = JSON.parse(post)
				// let psData = {"code":"200","count":1,"data":[{"id":1566315115047,"pdfPath":"不","realPath":"/data/apps/service/report-approval-service/upLoad/1566315115047/1566315115047.pdf","uri":"1566315115047/1566315115047.pdf","wordPath":"http://fcpgpre.jstspg.com//rpt/open/1566315115047/1566315115047.pdf"}],"state":"execute sucess"}
				// console.log(psData)
				// console.log(psData.code)
				this.estForm.pdfUri = psData.data[0].wordPath
				console.log(this.estForm)
				if (post == "") {
					this.$message({
						message:'上传失败!', 
						type: 'warning'
					})
				}
				if (post == "uncode") {
					this.$message({
						message:'未授权!', 
						type: 'warning'
					})
				}else {
					this.$message({
						message:'盖章成功!', 
						type: 'success'
					})
					// let para = {
					// 	"stampState": 2,
					// 	"id": this.id,
					// 	"remark":this.remark
					// }
					// postUpdateRemark(para).then( (res) => {
					// 	console.log(res)
					// })
				}
			},
			checkBack(){
				this.$router.push({path:'/checkList/index'})
			},
			checkSuccess () {
				let id = this.id;
				let state = 3;
				// this.$confirm('确认审核通过吗?', '提示', {
				// 	type: 'warning'
				// }).then(() => {
				this.button5_click()
				let para = {
					"stampState": 2,
					"id": this.id,
					"remark":this.remark
				}
				postUpdateRemark(para).then( (res) => {
					console.log(res)
				})
				postCheckId(id,state).then((res) => {
					// this.fetchProjectList()
					console.log(res);
					if(res.code == 200){
						this.estForm.state = 3
						let param = this.estForm
						console.log(param)
						postUpdateRpt(param).then((res) => {
							if (res.code == 200) {
								this.$message({
									message: '成功!',
									type: 'success'
								})
							}
						})
					}
					// this.$router.push({path:'/checkList/index'})
				});
			},
			checkFail () {
				let id = this.id;
				let state = 4;
				this.$confirm('确认审核未通过吗?', '提示', {
					type: 'warning'
				}).then(() => {
					postCheckId(id,state).then((res) => {
						// this.listLoading = false;
						// this.lookFormVisible = true;
						// this.searchForm = res.body;
						// console.log(res.body);
						// this.fetchProjectList();
						// this.fetchProjectList()
						this.$router.push({path:'/checkList/index'})
						console.log(res);
					});
				}).catch(() => {
					
				});
			},	
			changeSeal () {
				let id = this.id
				let transferTo = encodeURI(this.seal)
				let state = 3
				console.log(transferTo);
				if(transferTo == ""){
					this.$message({
						message:'请选择需要转让的人!', 
						type: 'warning'
					})
				}else{
					transferToId(id,transferTo).then( (res) => {
						if(res.code == 200){
							let para = {
								"stampState": 1,
								"id": this.id,
								"remark":this.remark
							}
							postUpdateRemark(para).then( (res) => {
								console.log(res)
							})
							postCheckId(id,state).then((res) => {
								console.log(res);
								if(res.code == 200){
									this.$message({
										message:'转让成功并审核通过!', 
										type: 'success'
									})
									this.$router.push({path:'/checkList/index'})
								}
							});
						}else{
							this.$message({
								message:'转让成失败!', 
								type: 'warning'
							})
						}
						this.sealFormVisible = false
					})
				}
			},
			checkSuccessAndSeal () {
				this.sealFormVisible = true
			}
		}
	}
</script>

<style>
</style>
