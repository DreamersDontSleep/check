<template>
  <div>
    <el-form ref="editForm" :inline="true" :model="editForm" style="float: left;margin-left: 20px;">
      <el-form-item label="分公司名称:">
        <template>
          <el-select v-model="editForm.branchName" style="width: 250px;" placeholder="请选择">
            <el-option
              v-for="(item,index) in companySel"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item label="状态:">
        <template>
          <el-select v-model="editForm.status" style="width: 250px;" placeholder="请选择">
            <el-option
              v-for="(item,index) in checkOr"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchTable(editForm)">搜索</el-button>
      </el-form-item>
    </el-form>
   <!-- <el-form v-permission="[296]" :inline="true" style="float: left;margin-left: 40px;">
      <el-form-item>
        <el-button type="primary" @click="newAdd()">新增申请</el-button>
      </el-form-item>
    </el-form> -->
    <div>
      <template>
        <div class="table">
          <el-table
            ref="table"
            :data="totalPriceEvaluation.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            tooltip-effect="dark"
            border
            stripe
            style="width: 95%;margin: 0 auto;">
            <el-table-column type="index" label="序号" width="60"/>
            <el-table-column label="主体序号" style="display: none;">
              <template slot-scope="scope" style="display: none;">
                {{ scope.row.id }}
              </template>
            </el-table-column>
            <el-table-column label="申请编号" align="center">
              <template slot-scope="scope">
                {{ scope.row.orderNum }}
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
            <el-table-column label="报告类型">
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
            <el-table-column label="状态">
              <template slot-scope="scope">
                <div v-if="scope.row.state == 0">未提交</div>
                <div v-else-if="scope.row.state == 1">待审核</div>
                <div v-else>已审核</div>
              </template>
            </el-table-column>
            <el-table-column label="审核结果">
              <template slot-scope="scope">
                <div v-if="scope.row.state == 3" style="color: #409EFF;">审核通过</div>
                <div v-else-if="scope.row.state == 4" style="color: red;">审核未通过</div>
                <div v-else>未审核</div>
              </template>
            </el-table-column>
            <!-- <el-table-column label="操作">
              <template slot-scope="scope">
                <div v-if="scope.row.state == 3">
                  <span style="color: rgb(51, 153, 204);cursor: pointer;" @click="getReportDetail(scope.$index,scope.row)">
                    查看
                  </span>
                </div>
                <div v-else>
                  <span v-permission="[300]" style="color: rgb(51, 153, 204);cursor: pointer;" @click="getReportDetail(scope.$index,scope.row)">
                    查看
                  </span>
                  <span v-permission="[298]" style="color: rgb(51, 153, 204);cursor: pointer;" @click="editReportDetail(scope.$index,scope.row)">
                    修改
                  </span>
                  <span v-permission="[297]" style="cursor: pointer;color: rgb(51, 153, 204);" @click="removeList(scope.$index, scope.row)">
                    删除
                  </span>
                  <span v-permission="[299]" style="cursor: pointer;color: rgb(51, 153, 204);" @click="postList(scope.$index, scope.row)">
                    提交审核
                  </span>
                </div>
              </template>
            </el-table-column> -->
          </el-table>
					<el-pagination
					  @size-change="handleSizeChange"
					  @current-change="handleCurrentChange"
					  :current-page="currentPage"
					  :page-sizes="[5,10, 20, 30, 40]"
					  :page-size="pageSize"
					  layout="total, sizes, prev, pager, next, jumper"
					  :total="count" style="width: 95%;margin: 10px auto;">
					</el-pagination>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { getEntryList, deleteReport, postCheckId, getReportData } from '@/api/entry'
import { getToken, setToken, removeToken } from '@/utils/auth'
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
export default {
	  directives: { permission },
  data() {
    return {
      editForm: {
        branchName: '',
        status: '',
				linkSel: ''
      },
      checkForm: {
        checkAccount: '12个'
      },
			currentPage: 1,
			pageSize: 10,
      editFormVisible: false,
      fdcFormVisible: false,
      tdFormVisible: false,
      zcFormVisible: false,
      ypgFormVisible: false,
      lookOrEdit: false,
      estateForm: {},
      fileList: [{
        name: '',
        url: ''
      }],
      checkOr: [{
        'label': '全部',
        'value': '全部'
      }, {
        'label': '待审核',
        'value': '待审核'
      }, {
        'label': '未审核',
        'value': '未审核'
      }, {
        'label': '审核通过',
        'value': '审核通过'
      }, {
        'label': '审核不通过',
        'value': '审核不通过'
      }],
			linkArr: [{
        'label': '房地产估价报告',
        'value': '房地产估价报告'
      }, {
        'label': '土地估价报告',
        'value': '土地估价报告'
      }, {
        'label': '资产评估报告',
        'value': '资产评估报告'
      }, {
        'label': '预评估',
        'value': '预评估'
      }],
      companySel: [{
        'label': '全部',
        'value': '全部'
      },{
        'label': '分公司1',
        'value': '分公司1'
      }, {
        'label': '分公司2',
        'value': '分公司2'
      }],
      totalPriceEvaluation: [{
        number: '0001',
        totalPriceHousingAppraisal: '安安',
        landArea: '啊',
        landPrice: '吧',
        landTotalPrice: '吧',
        totalAmountCompensation: '拒绝',
        amountEquityCompensation: '哈哈',
        amountTenantCompensation: '那你',
        notes: '111'
      }],
	  count: 0,
      assessAimList: [{
        'label': '出让',
        'value': '出让'
      }, {
        'label': '不出让',
        'value': '不出让'
      }],
      assessMethodList: [{
        'label': '出让',
        'value': '出让'
      }, {
        'label': '不出让',
        'value': '不出让'
      }],
      valueTypeList: [{
        'label': '出让',
        'value': '出让'
      }, {
        'label': '不出让',
        'value': '不出让'
      }]
	  }
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
  mounted() {
  	this.fetchProjectList()
  },
  methods: {
    checkPermission,
    fetchProjectList() {
      const state = this.editForm.status
      const branchOffice = this.editForm.branchName
			let para = {
				"state": [],
				"branchOffice": "",
				"login": "",
				"applicant": "",
				"checker": ""
			}
			let params = {
				para: para,
				pageNum: 1,
				pageSize: 10
			}
      getEntryList(params).then((res) => {
        this.totalPriceEvaluation = res.data
		this.count = res.count
        console.log(res)
      })
    },
    searchTable(editForm) {
      const para = {
        token: getToken()
      }
      console.log(para)
      this.$refs.editForm.validate((valid) => {
			  if (valid) {
          console.log(editForm)
          let state = editForm.status
          let branchOffice = editForm.branchName
					if(branchOffice == "全部"){
						branchOffice = '';
					}
					
					if( state == "未审核" ){
						state = "0";
					}else if( state == "待审核" ){
						state = "1";
					}else if( state == "审核通过" ){
						state = "3";
					}else if( state == "审核不通过" ){
						state = "4";
					}else if( state == "全部" ){
						state = "";
					}
					let para = {
						"state": state,
						"branchOffice": branchOffice,
						"login": "",
						"applicant": "",
						"checker": ""
					}
          getEntryList(para).then((res) => {
            this.totalPriceEvaluation = res.data
            console.log(res)
          })
			  } else {
          console.log('error submit!!')
          return false
			  }
      })
    },
    newAdd() {
      this.editFormVisible = true
    },
		confirmLink(editForm){
			let linkVal = editForm.linkSel
			if(linkVal == "房地产估价报告"){
				this.$router.push({path:'/entryList/realEstateReport'})
			}else if(linkVal == "土地估价报告"){
				this.$router.push({path:'/entryList/landValuationReport'})
			}else if(linkVal == "资产评估报告"){
				this.$router.push({path:'/entryList/assetsReport'})
			}else if(linkVal == "预评估"){
				this.$router.push({path:'/entryList/preliminaryAssessment'})
			}
		},
    getReportDetail: function(index, row) {
      const id = row.id
      const reportType = row.reportType
      getReportData(id, reportType).then((res) => {
        console.log(res)
        this.lookOrEdit = true
        if (reportType == 1) {
          this.fdcFormVisible = true
        } else if (reportType == 2) {
          this.tdFormVisible = true
        } else if (reportType == 3) {
          this.zcFormVisible = true
        } else if (reportType == 4) {
          this.ypgFormVisible = true
        }
        this.estateForm = res.data
        const fileUrl = res.data.wordUri
        const fileIndex = fileUrl.lastIndexOf('\/')
        const fileName = fileUrl.substring(fileIndex + 1, fileUrl.length)
        console.log(fileName)
        this.fileList[0].name = fileName
        this.fileList[0].url = fileUrl
      })
    },
    editReportDetail: function(index, row) {
      const id = row.id
      const reportType = row.reportType
      getReportData(id, reportType).then((res) => {
        console.log(res)
        this.lookOrEdit = false
        if (reportType == 1) {
          this.fdcFormVisible = true
        } else if (reportType == 2) {
          this.tdFormVisible = true
        } else if (reportType == 3) {
          this.zcFormVisible = true
        } else if (reportType == 4) {
          this.ypgFormVisible = true
        }
        this.estateForm = res.data
        const fileUrl = res.data.wordUri
        const fileIndex = fileUrl.lastIndexOf('\/')
        const fileName = fileUrl.substring(fileIndex + 1, fileUrl.length)
        console.log(fileName)
        this.fileList[0].name = fileName
        this.fileList[0].url = fileUrl
      })
    },
    removeList: function(index, row) {
      const id = row.id
      const reportType = row.reportType
      const para = {
        id: id,
        reportType: reportType
      }
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        deleteReport(id, reportType).then((res) => {
          // this.listLoading = false;
          // this.lookFormVisible = true;
          // this.searchForm = res.body;
          // console.log(res.body);
          // this.fetchProjectList();
          this.fetchProjectList()
        })
      }).catch(() => {

      })
    },
    postList: function(index, row) {
      const id = row.id
      const state = 1
      this.$confirm('确认提交该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        postCheckId(id, state).then((res) => {
          // this.listLoading = false;
          // this.lookFormVisible = true;
          // this.searchForm = res.body;
          // console.log(res.body);
          // this.fetchProjectList();
          this.fetchProjectList()
        })
      }).catch(() => {

      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    UploadUrl() {
      return 'http://fcpgpre.jstspg.com/rpt/index/updateRptOrFile'
    },
    handleChange(file, fileList) {
		  this.fileList = fileList
		  this.file = file
		  console.log(file)
    },
    submitForm(estateForm) {
      this.$refs.estateForm.validate((valid) => {
			  if (valid) {
          this.$confirm('确认提交该记录吗?', '提示', {
            type: 'warning'
          }).then(() => {
            this.$refs.upload.submit()
            // this.$router.push({path:'/entryList/index'})
          }).catch(() => {

          })
			  } else {
          console.log('error submit!!')
			  }
      })
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
			handleSizeChange(val) {
			  console.log(`每页 ${val} 条`);
			  this.pageSize = val;
			},
			handleCurrentChange(val) {
			  console.log(`当前页: ${val}`);
			  // this.currentPage = val;
			  const state = this.editForm.status
			  const branchOffice = this.editForm.branchName
			  			let para = {
			  				"state": [],
			  				"branchOffice": "",
			  				"login": "",
			  				"applicant": "",
			  				"checker": ""
			  			}
			  			let params = {
			  				para: para,
			  				pageNum: val,
			  				pageSize: 10
			  			}
			  getEntryList(params).then((res) => {
			    this.totalPriceEvaluation = res.data
			  		this.count = res.count
			    console.log(res)
			  })
			}  
  }
}
</script>

<style lang="scss" scoped>
	.el-dialog{
		width: 80% !important;
	}
</style>
