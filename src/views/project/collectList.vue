<template>
	<div class="area-content">
		<div class="area-title">
			<span> < 返回</span>
			<p>{{collectData.name}}</p>
		</div>
		<div>
			<!--工具条-->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true">
					<el-form-item>
						<el-input placeholder="请输入搜索内容" v-model="search" style="margin-left: 20px;"></el-input>
					</el-form-item>
					<el-form-item style="float: right;">
						<template slot-scope="scope">
							<router-link :to="{ path: '/project/registerEvictions', query: { 'contents': collectData }}">
							  <el-button type="primary">登记拆迁户</el-button>
							</router-link>
						</template>
					</el-form-item>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table :data="tables.slice((currentPage-1)*pageSize,currentPage*pageSize)" highlight-current-row style="width: 100%;">
				<el-table-column type="index" label="序号" width="60">
				</el-table-column>
				<el-table-column prop="areaNumber" label="评估编号">
				</el-table-column>
				<el-table-column prop="pgNumber" label="项目名称" sortable>
				</el-table-column>
				<el-table-column prop="houseUser" label="房屋使用人" sortable>
				</el-table-column>
				<el-table-column prop="houseAddress" label="房屋坐落" sortable>
				</el-table-column>
				<el-table-column prop="pgy" label="评估员" sortable>
				</el-table-column>
				<el-table-column prop="jszg" label="技术主管" sortable>
				</el-table-column>
				<el-table-column prop="xmzg" label="项目主管" sortable>
				</el-table-column>
				<el-table-column prop="tdmj" label="土地面积" sortable>
				</el-table-column>
				<el-table-column prop="jzmj" label="建筑面积" sortable>
				</el-table-column>
				<el-table-column prop="pgje" label="评估金额" sortable>
				</el-table-column>
				<el-table-column prop="zxje" label="装修金额" sortable>
				</el-table-column>
				<el-table-column prop="zt" label="状态" sortable>
					<template slot-scope="scope">
						<div v-if="scope.row.zt === 0">
							<span style="color: rgba(107, 107, 107, 0.647058823529412);">未审核</span>
						</div>
						<div v-if="scope.row.zt !== 0">
							<span style="color: #FFAA00;">审核中</span>
						</div>
						<div v-if="scope.row.zt !== 0">
							<span style="color: rgba(255, 0, 0, 0.647058823529412);">已审核</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<div v-if="scope.row.zt === 0">
							<span style="color: #1890FF;cursor: pointer;">主体</span>
							<router-link :to="{ path: '/project/decorate', query: { 'contents': collectData }}">
							  <span style="color: #1890FF;cursor: pointer;">装修</span>
							</router-link>
							<span style="color: #1890FF;cursor: pointer;" @click="submitCheck(scope.$index,scope.row)">提交审核</span>
							<router-link :to="{ path: '/project/view', query: { 'contents': collectData }}">
							  <span style="color: #1890FF;cursor: pointer;">查看</span>
							</router-link>
							<span style="color: #1890FF;cursor: pointer;" @click="handleUpload(scope.$index,scope.row)">资料上传</span>
						</div>
						<div v-if="scope.row.zt !== 0">
							<span style="color: #1890FF;cursor: pointer;">增补</span>
							<span style="color: #1890FF;cursor: pointer;">查看</span>
						</div>
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
			  :total="colletList.length">
			</el-pagination>
			<!-- 上传文件 -->
			<el-dialog title="资料上传" :visible.sync="uploadFormVisible">
				<el-form>
					<el-form-item label="委托合同" class="fl">
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
						  <!-- <div slot="tip" class="el-upload__tip">只能上传docx/png文件，且不超过500kb</div> -->
						  <!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
						</el-upload>
					</el-form-item>
					<el-form-item label="公证书" class="fl">
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
						  <!-- <div slot="tip" class="el-upload__tip">只能上传docx/png文件，且不超过500kb</div> -->
						  <!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
						</el-upload>
					</el-form-item>
					<el-form-item label="征收决定" class="fl">
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
						  <!-- <div slot="tip" class="el-upload__tip">只能上传docx/png文件，且不超过500kb</div> -->
						  <!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
						</el-upload>
					</el-form-item>
					<el-form-item label="项目批文" class="fl">
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
						  <!-- <div slot="tip" class="el-upload__tip">只能上传docx/png文件，且不超过500kb</div> -->
						  <!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
						</el-upload>
					</el-form-item>
					<el-form-item label="产权情况表" class="fl">
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
						  <!-- <div slot="tip" class="el-upload__tip">只能上传docx/png文件，且不超过500kb</div> -->
						  <!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
						</el-upload>
					</el-form-item>
					<el-form-item label="丘号图" class="fl">
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
						  <!-- <div slot="tip" class="el-upload__tip">只能上传docx/png文件，且不超过500kb</div> -->
						  <!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
						</el-upload>
					</el-form-item>
					<el-form-item label="红线图" class="fl">
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
						  <!-- <div slot="tip" class="el-upload__tip">只能上传docx/png文件，且不超过500kb</div> -->
						  <!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
						</el-upload>
					</el-form-item>
					<el-form-item label="地图勘测成果报告及图纸" class="fl">
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
						  <!-- <div slot="tip" class="el-upload__tip">只能上传docx/png文件，且不超过500kb</div> -->
						  <!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
						</el-upload>
					</el-form-item>
					<el-form-item label="价格测算过程" class="fl">
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
						  <!-- <div slot="tip" class="el-upload__tip">只能上传docx/png文件，且不超过500kb</div> -->
						  <!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
						</el-upload>
					</el-form-item>
					<el-form-item label="现场勘查通知照片" class="fl">
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
						  <!-- <div slot="tip" class="el-upload__tip">只能上传docx/png文件，且不超过500kb</div> -->
						  <!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
						</el-upload>
					</el-form-item>
					<el-form-item label="公示照片" class="fl">
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
						  <!-- <div slot="tip" class="el-upload__tip">只能上传docx/png文件，且不超过500kb</div> -->
						  <!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
						</el-upload>
					</el-form-item>
					<el-form-item label="现场办公照片" class="fl">
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
						  <!-- <div slot="tip" class="el-upload__tip">只能上传docx/png文件，且不超过500kb</div> -->
						  <!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
						</el-upload>
					</el-form-item>
					<el-form-item label="整体评估报告" class="fl">
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
						  <!-- <div slot="tip" class="el-upload__tip">只能上传docx/png文件，且不超过500kb</div> -->
						  <!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
						</el-upload>
					</el-form-item>
				</el-form>
			</el-dialog>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      collectData: {},
	  colletList: [],fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
	  search: '',
	  tableDataEnd: [],
	  currentPage: 1,
	  pageSize: 10,
	  totalItems: 4,
	  filterTableDataEnd:[],
	  flag:false,
	  uploadFormVisible: false
	}
  },
  created() {
    const content = this.$route.query.content
    this.collectData = content
	console.log(content)
    this.colletList = content.expropriationHouseholds
  },
  computed: {
      // 模糊搜索
      tables () {
        const search = this.search
        if (search) {
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.colletList.filter(data => {
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
        return this.colletList
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
	},
	handleUpload: function(index,row){
		this.uploadFormVisible = true;
	},
	submitCheck: function(index,row){
		this.$confirm('确认提交审核吗?', '提示', {
			type: 'warning'
		}).then(() => {
			//NProgress.start();
			let para = { id: row.number };
			this.$message({
				message: '提交成功',
				type: 'success'
			});
		}).catch(() => {
				
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

