<template>
  <div class="dormitory">
		<div class="area-title">
			<span> < 返回</span>
			<p>{{trial.name}}</p>
		</div>
    <div class="searchWord">
      <el-input v-model="search" style="display: inline-block;width: 300px;margin-bottom: 20px;" 
        placeholder="请输入搜索内容">
      </el-input>
    </div>
    <div class="dormitoryData">
      <el-table
        ref="dormitoryTable"
        :data="tables.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        tooltip-effect="dark"
        stripe
        style="width: 100%">
        <el-table-column label="序号"  type="index" width="65"></el-table-column>
        <el-table-column label="评估编号" prop="evaluationNumber">
        </el-table-column>
        <el-table-column label="房屋使用人" prop="houseUser">
        </el-table-column>
        <el-table-column label="房屋座落" prop="houseLocation">
        </el-table-column>
        <el-table-column label="估价员" prop="assessor">
        </el-table-column>
        <el-table-column label="技术主管" prop="technicalLeader">
        </el-table-column>
        <el-table-column label="项目主管" prop="projectLeader">
        </el-table-column>
        <el-table-column label="实测建筑面积(m2)" prop="constructionArea">
        </el-table-column>
				<el-table-column label="评估金额(元)" prop="assessAmount">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<router-link :to="{ path: '/project/trialCheck', query: { 'content': scope.row }}" style="color: rgb(51, 153, 204)">
							<el-button size="small">审核</el-button>
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
			  :total="dormitory.length">
			</el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dormitory: [],
				trial: {},
        search: '',
				tableDataEnd: [],
				currentPage: 1,
				pageSize: 10,
				totalItems: 4,
				filterTableDataEnd:[],
				flag:false,
				trailId: ''
     }
  },
	created() {
	  const content = this.$route.query.content
		this.trial = content
	  this.dormitory = content.trialListData
		this.trailId = content.number
		console.log(content)
	},
  computed: {
      // 模糊搜索
      tables () {
        const search = this.search
        if (search) {
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.dormitory.filter(data => {
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
        return this.dormitory
      }
    },
    methods: {
			handleSizeChange(val) {
			  console.log(`每页 ${val} 条`);
			  this.pageSize = val;
			},
			handleCurrentChange(val) {
			  console.log(`当前页: ${val}`);
			  this.currentPage = val;
			}  
    }
  }
</script>

<style lang="scss" scoped>
	.area-title{
		height: 60px;
		// background: #fff;
		line-height: 60px;
		border-bottom: 1px solid #eeeeee;
		margin-bottom: 20px;
	}
	.area-title span{
		float: left;
		font-size: 16px;
		color: #1890FF;
		cursor: pointer;
		margin-left: 20px;
	}
	.area-title p{
		margin: 0;
		padding: 0;
		text-align: center;
		font-size: 16px;
		color: rgba(0, 0, 0, 0.647058823529412);
	}
</style>
