<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input v-model="search" style="width:240px" placeholder="请输入搜索内容"></el-input>
					<!-- <el-button type="primary" @click="doFilter">搜索</el-button> -->
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="tables.slice((currentPage-1)*pageSize,currentPage*pageSize)" ref="projectListTable" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" label="序号" width="60">
			</el-table-column>
			<el-table-column prop="id" label="项目编号">
			</el-table-column>
			<el-table-column prop="name" label="项目名称" sortable>
			</el-table-column>
			<el-table-column prop="completePrice" label="成套基准单价" sortable>
			</el-table-column>
			<el-table-column prop="notCompletePrice" label="非成套基准单价" sortable>
			</el-table-column>
			<el-table-column prop="creatorName" label="登记人" sortable>
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
			<el-table-column prop="remark" label="备注" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<router-link :to="{ path: '/project/collectList', query: { 'content': scope.row }}" style="color: rgb(51, 153, 204)">
					  被征收户管理
					</router-link>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
		  @size-change="handleSizeChange"
		  @current-change="handleCurrentChange"
		  :current-page="currentPage"
		  :page-sizes="[10, 20, 30, 40]"
		  :page-size="pageSize"
		  layout="total, sizes, prev, pager, next, jumper"
		  :total="projectList.length">
		</el-pagination>
	</section>
</template>

<script>
// removeUser
import { getProjectList } from '@/api/project'
export default{
	data() {
		return {
			projectList:[],
			listLoading: false,
			sels: [],//列表选中列
			search: '',
			tableDataEnd: [],
			currentPage: 1,
			pageSize: 10,
			totalItems: 4,
			filterTableDataEnd:[],
			flag:false
		}
	},
	computed: {
	    // 模糊搜索
	    tables () {
	      const search = this.search
	      if (search) {
	        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
	        // 注意： filter() 不会对空数组进行检测。
	        // 注意： filter() 不会改变原始数组。
	        return this.projectList.filter(data => {
	          // some() 方法用于检测数组中的元素是否满足指定条件;
	          // some() 方法会依次执行数组的每个元素：
	          // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
	          // 如果没有满足条件的元素，则返回false。
	          // 注意： some() 不会对空数组进行检测。
	          // 注意： some() 不会改变原始数组。
	          return Object.keys(data).some(key => {
	            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
	            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
	            return String(data[key]).toLowerCase().indexOf(search) > -1
	          })
	        })
	      }
	      return this.projectList
	    }
	},
	methods: {
		fetchProjectList() {
			let para = {
				page: this.page
			};
			this.listLoading = true;
			getProjectList(para).then((res) => {
				this.total = res.total;
				this.projectList = res.body;
				this.listLoading = false;
			})
		},
		doFilter() {
			alert(1);
		},
		handleSizeChange(val) {
		  console.log(`每页 ${val} 条`);
		  this.pageSize = val;
		},
		handleCurrentChange(val) {
		  console.log(`当前页: ${val}`);
		  this.currentPage = val;
		}, //组件自带监控当前页码
		selsChange: function (sels) {
			this.sels = sels;
		}
	},
	mounted() {
		this.fetchProjectList()
	}
}
</script>

<style>

</style>
