<template>
	<div>
		<h2>{{collectData.name}} - 登记被征收户</h2>
		<div style="height: 350px;">
			<h3>房屋基本信息</h3>
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
		</div>
		<div>
			<h3>房屋价格评估</h3>
			<template>
			  <div class="tableDate">
				<div class="button">
				  <P style="float: left;">主体增加<el-button class="el-icon-plus" @click.prevent="addRow()"></el-button></P>
				  <p style="float: left;">主体删除<el-button class="el-icon-minus" @click.prevent="delData()"></el-button></p>
				</div>
				<div class="table">
				  <el-table
					:data="tableData"
					ref="table"
					tooltip-effect="dark"
					border
					stripe
					style="width: 95%"
					@selection-change='selectRow'>
					<el-table-column type="selection" width="45" align="center"></el-table-column>
					<el-table-column label="主体序号"  type="index" width="60" align="center"></el-table-column>
					<el-table-column  label="建筑面积（㎡）" align="center">
					  <template slot-scope="scope">
						  <el-input v-model="scope.row.coveredArea" v-if="scope.row.coefficient" disabled></el-input>
						  <el-input v-model="scope.row.coveredArea" v-else></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="结构等级">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.levelStructure" v-if="scope.row.coefficient" disabled></el-input>
						<el-input v-model="scope.row.levelStructure" v-else></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="所在层次">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.whereLevel" v-if="scope.row.coefficient" disabled></el-input>
						<el-input v-model="scope.row.whereLevel" v-else></el-input>
					  </template>
					</el-table-column>
					<el-table-column prop="name" label="朝向">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.toward" v-if="scope.row.coefficient" disabled></el-input>
						<el-input v-model="scope.row.toward" v-else></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="建筑年代">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.buildAge" v-if="scope.row.coefficient" disabled></el-input>
						<el-input v-model="scope.row.buildAge" v-else></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="标准房屋价格（元/㎡）">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.standardHousePrice" v-if="scope.row.coefficient" disabled></el-input>
						<el-input v-model="scope.row.standardHousePrice" v-else></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="结构">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.structureCoefficient" v-if="scope.row.coefficient" disabled></el-input>
						<el-input v-model="scope.row.structureCoefficient" v-else></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="成新">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.asNewCoefficient" v-if="scope.row.coefficient" disabled></el-input>
						<el-input v-model="scope.row.asNewCoefficient" v-else></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="成套">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.completeSetOfCoefficient" v-if="scope.row.coefficient" disabled></el-input>
						<el-input v-model="scope.row.completeSetOfCoefficient" v-else></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="区位">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.locationCoefficient" v-if="scope.row.coefficient" disabled></el-input>
						<el-input v-model="scope.row.locationCoefficient" v-else></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="层次">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.levelCoefficient" v-if="scope.row.coefficient" disabled></el-input>
						<el-input v-model="scope.row.levelCoefficient" v-else></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="朝向">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.towardCoefficient" v-if="scope.row.coefficient" disabled></el-input>
						<el-input v-model="scope.row.towardCoefficient" v-else></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="修正系数交易情况">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.correctionCoefficient" v-if="scope.row.coefficient" disabled></el-input>
						<el-input v-model="scope.row.correctionCoefficient" v-else></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="单价">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.unitPrice" v-if="scope.row.coefficient" disabled></el-input>
						<el-input v-model="scope.row.unitPrice" v-else></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="折扣率">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.discountRate" v-if="scope.row.coefficient" disabled></el-input>
						<el-input v-model="scope.row.discountRate" v-else></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="总价">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.totalPrice" v-if="scope.row.coefficient" disabled></el-input>
						<el-input v-model="scope.row.totalPrice" v-else></el-input>
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
			<h3>备注</h3>
			<div>
				<ul style="list-style: none;height: 240px;border: 1px solid rgba(217, 217, 217, 1);color: rgba(0, 0, 0, 0.647058823529412);padding-top: 30px;">
					<li>1、本次估价目的：为房屋征收部门与被征收人确定被征收房屋价值的补偿提供依据，评估被征收房屋的价值；</li>
					<li>2、本次评估价值标准：评估对象在正常交易情况下，由熟悉情况的交易双方以公平交易方式在价值时点自愿进行交易的金额，但不考虑租赁、抵押、查封等因素的影响；</li>
					<li>3、本次评估结果包含房屋及其占用范围内的国有土地使用权价值，不包含房屋室内装饰装修的补偿及因征收房屋造成的搬迁、临时安置的补偿和停产停业损失的补偿等；</li>
					<li>4、本次评估法规政策依据为《国有土地上房屋征收与补偿条例》（中华人民共和国国务院第590号）、《江苏省贯彻实施<国有土地上房屋征收与补偿条例>若干问题的规定》（苏政发[2011]91号）和《南京市国有土地上房屋征收与补偿办法》；</li>
					<li>5、本次评估技术规范依据为《房地产估价规范》（GB/T50291—2015）、《南京市国有土地上房屋征收评估技术导则》（宁建征字[2017]74号）；</li>
					<li>6、被征收人或房屋征收部门对评估结果有异议的，自收到评估报告之日起10日内，向原评估机构书面申请复核评估。申请复核评估的，应当书面提出评估报告存在的问题；</li>
				</ul>
			</div>
		</div>
		<div>
			<el-button @click="saveDatas">保存</el-button>
			<el-button>提交</el-button>
			<el-button>返回</el-button>
		</div>
	</div>
	
</template>

<script>
import { register } from '@/api/project'
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
		  coveredArea: '',
		  levelStructure: '',
		  whereLevel: '',
		  toward: '',
		  buildAge: '',
		  standardHousePrice: '',
		  structureCoefficient: 100,
		  asNewCoefficient: 100,
		  completeSetOfCoefficient: 100,
		  locationCoefficient: 100,
		  levelCoefficient: 100,
		  coefficient: 1,
		  towardCoefficient: 100,
		  correctionCoefficient: '',
		  unitPrice: '',
		  discountRate: '',
		  totalPrice: ''
        }, {
          rowNum: 2,
		  coveredArea: '',
		  levelStructure: '',
		  whereLevel: '',
		  toward: '',
		  buildAge: '',
		  standardHousePrice: '',
		  structureCoefficient: 100,
		  asNewCoefficient: 100,
		  completeSetOfCoefficient: 100,
		  locationCoefficient: 100,
		  levelCoefficient: 100,
		  towardCoefficient: 100,
		  correctionCoefficient: '',
		  unitPrice: '',
		  discountRate: '',
		  totalPrice: ''
        }, {
          rowNum: 3,
		  coveredArea: '',
		  levelStructure: '',
		  whereLevel: '',
		  toward: '',
		  buildAge: '',
		  standardHousePrice: '',
		  structureCoefficient: 100,
		  asNewCoefficient: 100,
		  completeSetOfCoefficient: 100,
		  locationCoefficient: 100,
		  levelCoefficient: 100,
		  towardCoefficient: 100,
		  correctionCoefficient: '',
		  unitPrice: '',
		  discountRate: '',
		  totalPrice: ''
        }, {
          rowNum: 4,
		  coveredArea: '',
		  levelStructure: '',
		  whereLevel: '',
		  toward: '',
		  buildAge: '',
		  standardHousePrice: '',
		  structureCoefficient: 100,
		  asNewCoefficient: 100,
		  completeSetOfCoefficient: 100,
		  locationCoefficient: 100,
		  levelCoefficient: 100,
		  towardCoefficient: 100,
		  correctionCoefficient: '',
		  unitPrice: '',
		  discountRate: '',
		  totalPrice: ''
        }, {
          rowNum: 5,
		  coveredArea: '',
		  levelStructure: '',
		  whereLevel: '',
		  toward: '',
		  buildAge: '',
		  standardHousePrice: '',
		  structureCoefficient: 100,
		  asNewCoefficient: 100,
		  completeSetOfCoefficient: 100,
		  locationCoefficient: 100,
		  levelCoefficient: 100,
		  towardCoefficient: 100,
		  correctionCoefficient: '',
		  unitPrice: '',
		  discountRate: '',
		  totalPrice: ''
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
			
			saveDatas () {
				console.log(this.tableData);
				let para = {
					list1: this.editForm,
					list2: this.tableData,
					list3: this.totalPriceEvaluation
				};
				let paraId = 1;
				register(paraId,para).then((res) => {
					console.log(res);
				})
			}
			
		}
}
</script>

<style>
</style>
