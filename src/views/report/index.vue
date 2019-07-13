<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input placeholder="请输入搜索内容"></el-input>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="projectList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" label="序号" width="60">
			</el-table-column>
			<el-table-column prop="number" label="项目编号">
			</el-table-column>
			<el-table-column prop="name" label="项目名称" sortable>
			</el-table-column>
			<el-table-column prop="completePrice" label="成套基准单价" sortable>
			</el-table-column>
			<el-table-column prop="notCompletePrice" label="非成套基准单价" sortable>
			</el-table-column>
			<el-table-column prop="registrar" label="登记人" sortable>
			</el-table-column>
			<el-table-column prop="type" label="房屋类型" sortable>
			</el-table-column>
			<el-table-column prop="allcount" label="总户数" sortable>
			</el-table-column>
			<el-table-column prop="notEnable" label="未审核数" sortable>
			</el-table-column>
			<el-table-column prop="enable" label="提交审核数" sortable>
			</el-table-column>
			<el-table-column prop="checkCount" label="终审数" sortable>
			</el-table-column>
			<el-table-column prop="note" label="备注" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<span class="handleBtn" style="color: #1890FF;cursor: pointer;" @click="handleEdit(scope.$index, scope.row)">查看</span>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
import { getProjectList, removeUser } from '@/api/project'
export default{
	data() {
		return {
			projectList:[],
			fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
			total: 0,
			page: 1,
			listLoading: false,
			sels: [],//列表选中列
			editFormVisible: false,//编辑界面是否显示
			editLoading: false,
			uploadFormVisible: false,
			//编辑界面数据
			editForm: {
				number: 0,
				name: "南园社区办公楼改造",
				area:"安庆",
				assessment:"0001",
				status: 0,
				allcount: 1000,
				notEnable: 500,
				enable: 500,
				checkCount:30,
				completePrice: "10000",
				notCompletePrice: "1000",
				registrar: "jack",
				type: "集体",
				note:"aaa",
				quality:1,
				purpose:1,
				use:1,
				notice:1,
				overPrice:1,
				valueTime:1,
				IsDiscount:1,
				discount:1,
				institutions:1,
				projectLeader:1,
				TechnicalLeader:1,
				assess:1
			},
			titleMap: {
				addProject: "新建项目",
				editProject: "查看/编辑项目"
			},
			dialogStatus: ''
		}
	},
	mounted() {
		this.fetchProjectList()
	},
	methods: {
		handleCurrentChange(val) {
			this.page = val;
			this.fetchProjectList();
		},
		fetchProjectList() {
			let para = {
				page: this.page
			};
			this.listLoading = true;
			getProjectList(para).then((res) => {
				this.total = res.total;
				this.projectList = res.data;
				this.listLoading = false;
			})
		},
		selsChange: function (sels) {
			this.sels = sels;
		},
		// 新建项目
		handleAdd: function(){
			this.editForm = {
				number: 0,
				name: "",
				area:"",
				assessment:"",
				status: '',
				allcount: '',
				notEnable: '',
				enable: '',
				checkCount:'',
				completePrice: "",
				notCompletePrice: "",
				registrar: "",
				type: "",
				note:"",
				quality:'',
				purpose:'',
				use:'',
				notice:'',
				overPrice:'',
				valueTime:'',
				IsDiscount:'',
				discount:'',
				institutions:'',
				projectLeader:'',
				TechnicalLeader:'',
				assess:''
			};
			this.editFormVisible = true;
			this.dialogStatus = "addProject";
			this.editForm = Object.assign({});
		},
		//删除
		handleDel: function (index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				//NProgress.start();
				let para = { id: row.number };
				removeUser(para).then((res) => {
					this.listLoading = false;
					//NProgress.done();
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.fetchProjectList();
				});
			}).catch(() => {
		
			});
		},
		handleUpload: function(index, row){
			this.uploadFormVisible = true;
		},
		//显示编辑界面
		handleEdit: function (index, row) {
			this.editFormVisible = true;
			this.dialogStatus = "editProject";
			this.editForm = Object.assign({}, row);
			console.log(this.editForm);
		},
		// 提交表单
		submitForm(editForm){
			this.$refs.editForm.validate((valid) => {
			  if (valid) {
				alert('submit!');
				console.log(editForm);
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

<style lang="scss" scoped="scoped">
	.edit-input{
		width: 175px;
	}
	.fl{
		float: left;
	}
	/* 清理浮动 */
	.clearfix:before, .clearfix:after {
		content: "";
		display: table;
	}
	.clearfix:after {
		clear: both;
	}
	.clearfix {
		zoom: 1;
	}
	.handleBtn{
		color: #1890FF;
		font-size: 14px;
	}
<style>

