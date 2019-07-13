<template>
	<div>
		<h2>{{collectData.name}} - 登记被征收户</h2>
		<div style="height: 350px;">
			<h3>房屋基本信息</h3>
			<el-form label-width="140px">
				<el-form-item label="项目名称:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;"></el-input>
				</el-form-item>
				<el-form-item label="报告编号:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;"></el-input>
				</el-form-item>
				<el-form-item label="丘号:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;"></el-input>
				</el-form-item>
				<el-form-item label="房屋座落:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;"></el-input>
				</el-form-item>
				<el-form-item label="房屋所有权人:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;"></el-input>
				</el-form-item>
				<el-form-item label="房屋承租人:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;"></el-input>
				</el-form-item>
				<el-form-item label="房屋所有权证号:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;"></el-input>
				</el-form-item>
				<el-form-item label="总建筑面积（㎡）:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;"></el-input>
				</el-form-item>
				<el-form-item label="成套与否:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;"></el-input>
				</el-form-item>
				<el-form-item label="房屋性质:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;"></el-input>
				</el-form-item>
				<el-form-item label="土地使用权证号:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;"></el-input>
				</el-form-item>
				<el-form-item label="土地总面积（㎡）:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;"></el-input>
				</el-form-item>
				<el-form-item label="价值时点:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;"></el-input>
				</el-form-item>
				<el-form-item label="*评估员:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div>
			<h3>房屋价格评估</h3>
			<template>
			  <div class="tableDate">
				<div class="table">
				  <el-table
					:data="tableData"
					ref="table"
					tooltip-effect="dark"
					border
					stripe
					style="width: 95%"
					@selection-change='selectRow'>
					<el-table-column label="主体序号"  type="index" width="60" align="center"></el-table-column>
					<el-table-column  label="建筑面积（㎡）" align="center">
					  <template slot-scope="scope">
						  <el-input v-model="scope.row.coveredArea"  disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="结构等级">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.levelStructure"  disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="所在层次">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.whereLevel"  disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column prop="name" label="朝向">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.toward"  disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="建筑年代">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.buildAge"  disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="标准房屋价格（元/㎡）">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.standardHousePrice"  disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="结构">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.structureCoefficient"  disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="成新">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.asNewCoefficient"  disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="成套">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.completeSetOfCoefficient"  disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="区位">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.locationCoefficient"  disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="层次">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.levelCoefficient"  disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="朝向">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.towardCoefficient"  disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="修正系数交易情况">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.correctionCoefficient"  disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="单价">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.unitPrice"  disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="折扣率">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.discountRate"  disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="总价">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.totalPrice"  disabled></el-input>
					  </template>
					</el-table-column>
				  </el-table>
				</div>
			  </div>
			</template>
		</div>
		<div>
			<h3>主体总价评估</h3>
			<template>
				<div class="table">
				  <el-table
					:data="totalPriceEvaluation"
					ref="table"
					tooltip-effect="dark"
					border
					stripe
					style="width: 95%"
					@selection-change='selectRow'>
					<el-table-column  label="房屋评估总价（元）" align="center">
					  <template slot-scope="scope">
						  <el-input v-model="scope.row.totalPriceHousingAppraisal"></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="土地面积（㎡）">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.landArea"></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="土地价格（元/㎡">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.landPrice"></el-input>
					  </template>
					</el-table-column>
					<el-table-column prop="name" label="土地总价（元">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.landTotalPrice"></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="补偿金额总计（元）">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.totalAmountCompensation"></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="产权补偿金额（元）">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.amountEquityCompensation"></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="承租人补偿金额（元）">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.amountTenantCompensation"></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="备注">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.notes"></el-input>
					  </template>
					</el-table-column>
				  </el-table>
				</div>
			</template>
		</div>
		<div>
			<h3>房屋装修评估</h3>
			<template>
				<div>
					<el-table
						:data="decorateData"
						ref="table"
						tooltip-effect="dark"
						border
						stripe
						style="width: 95%"
						@selection-change='selectRow'>
						<el-table-column  label="产权人补偿款（元）" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.CompensationFromTheOwner"></el-input>
						  </template>
						</el-table-column>
						<el-table-column  label="承租人补偿款（元）" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.TenantCompensation"></el-input>
						  </template>
						</el-table-column>
						<el-table-column  label="装饰装修等级或类别" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.DecorateGrade"></el-input>
						  </template>
						</el-table-column>
						<el-table-column  label="室内装饰装修综合成新" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.DecorateNew"></el-input>
						  </template>
						</el-table-column>
						<el-table-column  label="装饰装修工程费单价（元/㎡）" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.DecorateTheUnitPrice"></el-input>
						  </template>
						</el-table-column>
						<el-table-column  label="室内装饰装修补偿单价（元/㎡）" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.UnitPriceForDecorationCompensation"></el-input>
						  </template>
						</el-table-column>
						<el-table-column  label="室内装饰装修评估补偿金额合计（元）" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.EvaluationCompensationUnitPprice"></el-input>
						  </template>
						</el-table-column>
						<el-table-column  label="附属物补偿金额合计（元）" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.SupplementaryCompensationUnitPrice"></el-input>
						  </template>
						</el-table-column>
						<el-table-column  label="各单项装饰装修调整项目差价总金额折合单价（元/㎡）" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.ReducedTheUnitPrice"></el-input>
						  </template>
						</el-table-column>
					</el-table>
				</div>
			</template>
		</div>
		<div>
			<h3>上传资料</h3>
			<el-form>
				<el-form-item label="委托合同" class="fl">
					<el-upload
					  class="upload-demo"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :on-preview="handlePreview"
					  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx"
					  
					  multiple
					  :limit="3"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					   
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
					  
					  multiple
					  :limit="3"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					   
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
					  
					  multiple
					  :limit="3"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					   
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
					  
					  multiple
					  :limit="3"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					   
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
					  
					  multiple
					  :limit="3"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					   
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
					  
					  multiple
					  :limit="3"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					   
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
					  
					  multiple
					  :limit="3"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					   
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
					  
					  multiple
					  :limit="3"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					   
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
					  
					  multiple
					  :limit="3"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					   
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
					  
					  multiple
					  :limit="3"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					   
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
					  
					  multiple
					  :limit="3"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					   
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
					  
					  multiple
					  :limit="3"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					   
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
					  
					  multiple
					  :limit="3"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					   
					  <!-- <div slot="tip" class="el-upload__tip">只能上传docx/png文件，且不超过500kb</div> -->
					  <!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
					</el-upload>
				</el-form-item>
			</el-form>
		</div>
		<div>
			<h3>审批记录</h3>
			<el-table :data="checkList" style="width: 100%;">
				<el-table-column label="审批时间" prop="checkTime">
				</el-table-column>
				<el-table-column label="审批人" prop="checkName">
				</el-table-column>
				<el-table-column label="下个节点" prop="nextNode">
				</el-table-column>
				<el-table-column label="审批结果" prop="checkResult">
				</el-table-column>
				<el-table-column label="备注" prop="notes">
				</el-table-column>
			</el-table>
		</div>
		<div>
			<el-button>确定</el-button>
			<el-button>返回</el-button>
		</div>
	</div>
	
</template>

<script>
export default {
  data() {
	return {
	  collectData: {},
	  totalPriceEvaluation: [{
	  	totalPriceHousingAppraisal: '',
	  	landArea: '',
	  	landPrice: '',
	  	landTotalPrice: '',
	  	totalAmountCompensation: '',
	  	amountEquityCompensation: '',
	  	amountTenantCompensation: '',
	  	notes: ''
	  }],
		fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
	  tableData: [{
          rowNum: 1,
					coveredArea: 1,
					levelStructure: 2,
					whereLevel: 3,
					toward: 1,
					buildAge: 1,
					standardHousePrice: 1,
					structureCoefficient: 100,
					asNewCoefficient: 100,
					completeSetOfCoefficient: 100,
					locationCoefficient: 100,
					levelCoefficient: 100,
					coefficient: 1,
					towardCoefficient: 100,
					correctionCoefficient: 1,
					unitPrice: 1,
					discountRate: 1,
					totalPrice: 1
        }],
    selectlistRow: [],
		decorateData: [{
		    rowNum: 1,
				CompensationFromTheOwner: '',
				TenantCompensation: '',
				DecorateGrade: '',
				DecorateNew: '',
				DecorateTheUnitPrice: '',
				UnitPriceForDecorationCompensation: '',
				EvaluationCompensationUnitPprice: 100,
				SupplementaryCompensationUnitPrice: 100,
				ReducedTheUnitPrice: 100
		}],
		checkList:[{
			checkTime: "2019-0101",
			checkName: "aa",
			nextNode: "bb",
			checkResult: "初审通过",
			notes: "ss"
		},{
			checkTime: "2019-0101",
			checkName: "aa",
			nextNode: "bb",
			checkResult: "终审通过",
			notes: "ss"
		}]
	}
  },
  created() {
	const content = this.$route.query.contents
	this.collectData = content
	console.log(content);
  },
  methods: {
      // 获取表格选中时的数据
      selectRow (val) {
        this.selectlistRow = val
      },
			// handleRemove(file, fileList) {
			// 	console.log(file, fileList);
			// },
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			// beforeRemove(file, fileList) {
			// 	return this.$confirm(`确定移除 ${ file.name }？`);
			// },
      // 增加行
      addRow () {
        var list = {
          rowNum: '',
          coveredArea: this.coveredArea,
          levelStructure: this.levelStructure,
          whereLevel: this.whereLevel,
          toward: this.toward,
          buildAge: this.buildAge,
          standardHousePrice: this.standardHousePrice,
          structureCoefficient: this.structureCoefficient,
          asNewCoefficient: this.asNewCoefficient,
          completeSetOfCoefficient: this.completeSetOfCoefficient,
          locationCoefficient: this.locationCoefficient,
          levelCoefficient: this.levelCoefficient,
          towardCoefficient: this.towardCoefficient,
          correctionCoefficient: this.correctionCoefficient,
          unitPrice: this.unitPrice,
          discountRate: this.discountRate,
          totalPrice: this.totalPrice
		}
		this.tableData.push(list)
      },
      // 删除方法
      // 删除选中行
      delData () {
        for (let i = 0; i < this.selectlistRow.length; i++) {
          let val = this.selectlistRow
          // 获取选中行的索引的方法
          // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
          // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
          val.forEach((val, index) => {
            this.tableData.forEach((v, i) => {
              if (val.rowNum === v.rowNum) {
                // i 为选中的索引
                this.tableData.splice(i, 1)
              }
            })
          })
        }
        // 删除完数据之后清除勾选框
        // this.$refs.tableData.clearSelection()
      }
    }
}
</script>

<style>
</style>
