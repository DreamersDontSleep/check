<template>
	<div>
		<h2>{{collectData.name}} - 登记被征收户</h2>
		<div style="height: 350px;">
			<h3>房屋基本信息</h3>
			<template>
				<el-form label-width="140px" :model="editForm" ref="editForm">
					<el-form-item label="项目名称:" style="float: left;">
						<el-input auto-complete="off" style="width: 250px;" v-model="editForm.name" disabled></el-input>
					</el-form-item>
					<el-form-item label="报告编号:" style="float: left;">
						<el-input auto-complete="off" style="width: 250px;" v-model="editForm.id "></el-input>
					</el-form-item>
					<el-form-item label="丘号:" style="float: left;">
						<el-input auto-complete="off" style="width: 250px;" v-model="editForm.hillNumber "></el-input>
					</el-form-item>
					<el-form-item label="房屋座落:" style="float: left;">
						<el-input auto-complete="off" style="width: 250px;" v-model="editForm.location"></el-input>
					</el-form-item>
					<el-form-item label="房屋所有权人:" style="float: left;">
						<el-input auto-complete="off" style="width: 250px;" v-model="editForm.houseOwner "></el-input>
					</el-form-item>
					<el-form-item label="房屋承租人:" style="float: left;">
						<el-input auto-complete="off" style="width: 250px;" v-model="editForm.houseLessee"></el-input>
					</el-form-item>
					<el-form-item label="房屋所有权证号:" style="float: left;">
						<el-input auto-complete="off" style="width: 250px;" v-model="editForm.certificateNumber"></el-input>
					</el-form-item>
					<el-form-item label="总建筑面积（㎡）:" style="float: left;">
						<el-input auto-complete="off" style="width: 250px;" v-model="editForm.totalBuildingArea"></el-input>
					</el-form-item>
					<el-form-item label="成套与否:" style="float: left;">
						<el-input auto-complete="off" style="width: 250px;" v-model="editForm.isComplete"></el-input>
					</el-form-item>
					<el-form-item label="房屋性质:" style="float: left;">
						<!-- <el-input auto-complete="off" style="width: 250px;" v-model="editForm.type"></el-input> -->
						<template>
							<el-select v-model="editForm.type" style="width: 250px;" placeholder="请选择">
								<el-option
									v-for="(item,index) in fieldOption"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</template>
					</el-form-item>
					<el-form-item label="土地使用权证号:" style="float: left;">
						<el-input auto-complete="off" style="width: 250px;" v-model="editForm.landUseWarrantNumber"></el-input>
					</el-form-item>
					<el-form-item label="土地总面积（㎡）:" style="float: left;">
						<el-input auto-complete="off" style="width: 250px;" v-model="editForm.totalLandArea"></el-input>
					</el-form-item>
					<el-form-item label="价值时点:" style="float: left;">
						<el-input auto-complete="off" style="width: 250px;" v-model="editForm.valueTime"></el-input>
					</el-form-item>
					<el-form-item label="*评估员:" style="float: left;">
						<el-input auto-complete="off" style="width: 250px;" v-model="editForm.estateAppraiser"></el-input>
					</el-form-item>
				</el-form>
			</template>
		</div>
		<div>
			<h3>房屋装修评估</h3>
			<template>
				<div>
					<el-table
						:data="tableData"
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
			<el-button @click="saveData2">保存</el-button>
			<el-button>提交</el-button>
			<el-button>返回</el-button>
		</div>
	</div>
	
</template>

<script>
export default {
  data() {
	return {
	  collectData: {},
	  editForm:{
	  	name: '啊啊',
	  	id: '',
	  	hillNumber: '',
	  	location: '',
	  	houseOwner: '',
	  	houseLessee: '',
	  	certificateNumber: '',
	  	totalBuildingArea: '',
	  	isComplete: '',
	  	type: '',
	  	landUseWarrantNumber: '',
	  	totalLandArea: '',
	  	valueTime: '',
	  	estateAppraiser: ''
	  },
	  fieldOption:[{
	  	"label": "aa",
	  	"value": "aa"
	  },{
	  	"label": "bb",
	  	"value": "cc"
	  }],
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
	  tableData: [{
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
      selectlistRow: []
	}
  },
  created() {
	const content = this.$route.query.contents
	this.collectData = content
	this.editForm.name = this.collectData.name
	console.log(content);
  },
  methods: {
      // 获取表格选中时的数据
      selectRow (val) {
        this.selectlistRow = val
      },
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
      },
	  
	  // 保存数据
	  saveData2 () {
		  console.log(this.tableData[0]);
		  console.log(this.editForm);
	  }
    }
}
</script>

<style>
</style>
