<template>
	<div>
		<h2 style="text-align: center;">登记被征收户</h2>
		<div style="height: 350px;">
			<h3>房屋基本信息</h3>
			<el-form label-width="140px" :model="editForm" ref="editForm">
				<el-form-item label="项目名称:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;" v-model="editForm.name" disabled></el-input>
				</el-form-item>
				<el-form-item label="报告编号:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;" v-model="editForm.id" disabled></el-input>
				</el-form-item>
				<el-form-item label="丘号:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;" v-model="editForm.hillNumber" disabled></el-input>
				</el-form-item>
				<el-form-item label="房屋座落:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;" v-model="editForm.location" disabled></el-input>
				</el-form-item>
				<el-form-item label="房屋所有权人:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;" v-model="editForm.houseOwner" disabled></el-input>
				</el-form-item>
				<el-form-item label="房屋承租人:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;" v-model="editForm.houseLessee" disabled></el-input>
				</el-form-item>
				<el-form-item label="房屋所有权证号:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;" v-model="editForm.certificateNumber" disabled></el-input>
				</el-form-item>
				<el-form-item label="总建筑面积（㎡）:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;" v-model="editForm.totalBuildingArea" disabled></el-input>
				</el-form-item>
				<el-form-item label="成套与否:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;" v-model="editForm.isComplete" disabled></el-input>
				</el-form-item>
				<el-form-item label="房屋性质:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;" v-model="editForm.type" disabled></el-input>
				</el-form-item>
				<el-form-item label="土地使用权证号:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;" v-model="editForm.landUseWarrantNumber" disabled></el-input>
				</el-form-item>
				<el-form-item label="土地总面积（㎡）:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;" v-model="editForm.totalLandArea" disabled></el-input>
				</el-form-item>
				<el-form-item label="价值时点:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;" v-model="editForm.valueTime" disabled></el-input>
				</el-form-item>
				<el-form-item label="*评估员:" style="float: left;">
					<el-input auto-complete="off" style="width: 250px;" v-model="editForm.estateAppraiser" disabled></el-input>
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
						  <el-input v-model="scope.row.totalPriceHousingAppraisal" disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="土地面积（㎡）">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.landArea" disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="土地价格（元/㎡">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.landPrice" disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column prop="name" label="土地总价（元">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.landTotalPrice" disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="补偿金额总计（元）">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.totalAmountCompensation" disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="产权补偿金额（元）">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.amountEquityCompensation" disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="承租人补偿金额（元）">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.amountTenantCompensation" disabled></el-input>
					  </template>
					</el-table-column>
					<el-table-column label="备注">
					  <template slot-scope="scope">
						<el-input v-model="scope.row.notes" disabled></el-input>
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
						:data="tableDataDecorate"
						ref="table"
						tooltip-effect="dark"
						border
						stripe
						style="width: 95%"
						@selection-change='selectRow'>
						<el-table-column  label="产权人补偿款（元）" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.CompensationFromTheOwner" disabled></el-input>
						  </template>
						</el-table-column>
						<el-table-column  label="承租人补偿款（元）" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.TenantCompensation" disabled></el-input>
						  </template>
						</el-table-column>
						<el-table-column  label="装饰装修等级或类别" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.DecorateGrade" disabled></el-input>
						  </template>
						</el-table-column>
						<el-table-column  label="室内装饰装修综合成新" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.DecorateNew" disabled></el-input>
						  </template>
						</el-table-column>
						<el-table-column  label="装饰装修工程费单价（元/㎡）" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.DecorateTheUnitPrice" disabled></el-input>
						  </template>
						</el-table-column>
						<el-table-column  label="室内装饰装修补偿单价（元/㎡）" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.UnitPriceForDecorationCompensation" disabled></el-input>
						  </template>
						</el-table-column>
						<el-table-column  label="室内装饰装修评估补偿金额合计（元）" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.EvaluationCompensationUnitPprice" disabled></el-input>
						  </template>
						</el-table-column>
						<el-table-column  label="附属物补偿金额合计（元）" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.SupplementaryCompensationUnitPrice" disabled></el-input>
						  </template>
						</el-table-column>
						<el-table-column  label="各单项装饰装修调整项目差价总金额折合单价（元/㎡）" align="center">
						  <template slot-scope="scope">
							  <el-input v-model="scope.row.ReducedTheUnitPrice" disabled></el-input>
						  </template>
						</el-table-column>
					</el-table>
				</div>
			</template>
		</div>
		<div>
			<h3>评审意见</h3>
			<textarea style="width: 800px;height: 100px;resize: none;margin-left: 20px;"></textarea>
		</div>
		<div style="text-align: center;margin: 20px 0;">
			<el-button @click="trialBy">初审通过</el-button>
			<el-button @click="trialRefused">拒绝</el-button>
		</div>
	</div>
	
</template>

<script>
import { getTrialInfoList } from '@/api/project'
export default {
  data() {
		return {
			collectData: {},
			trialDataList: [],
			page: '',
			editForm: {},
			totalPriceEvaluation: [],
			tableDataDecorate: [],
			tableData: [],
      selectlistRow: []
	}
  },
  created() {
		const content = this.$route.query.content
		this.collectData = content
		console.log(content);
  },
	mounted() {
		this.getTrialInfoData()
	},
  methods: {
			getTrialInfoData () {
				let param = {
					id: this.page
				};
				getTrialInfoList(param).then((res) => {
					// this.total = res.total;
					this.trialDataList = res.data;
					this.editForm = res.data.editForm;
					this.tableData = res.data.priceAssem;
					this.totalPriceEvaluation = res.data.totalPriceEvaluation;
					this.tableDataDecorate = res.data.tableDataDecorate;
					console.log(this.trialDataList);
				})
			},
			
      // 获取表格选中时的数据
      selectRow (val) {
        this.selectlistRow = val
      },
			
			// 初审通过
			trialBy () {
				alert("初审通过");
			},
			
			trialRefused () {
				alert("初审拒绝");
			}
    }
}
</script>

<style lang="scss" scoped="scoped">
	h3{
		text-indent: 20px;
	}
</style>
