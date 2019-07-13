<template>
	<div>
		<el-form :inline="true" :model="editForm" ref="editForm" style="float: left;margin-left: 20px;">
			<el-form-item label="分公司名称:">
				<template>
					<el-select v-model="editForm.branchName" style="width: 250px;" placeholder="请选择">
						<el-option
							v-for="(item,index) in companySel"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
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
							:value="item.value">
						</el-option>
					</el-select>
				</template>
			</el-form-item>
			<el-form-item>
				<el-button @click="searchTable(editForm)">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-form :inline="true" style="float: left;margin-left: 40px;">
			<el-form-item>
				<el-button @click="newAdd()" type="primary">新增申请</el-button>
			</el-form-item>
		</el-form>
		<div>
			<template>
				<div class="table">
				  <el-table
					:data="totalPriceEvaluation"
					ref="table"
					tooltip-effect="dark"
					border
					stripe
					style="width: 95%;margin: 0 auto;">
					<el-table-column type="index" label="序号" width="60">
					</el-table-column>
					<el-table-column label="主体序号" style="display: none;">
						<template slot-scope="scope" style="display: none;">
							{{scope.row.id}}
						</template>
					</el-table-column>
					<el-table-column  label="申请编号" align="center">
					  <template slot-scope="scope">
						  {{scope.row.orderNum}}
					  </template>
					</el-table-column>
					<el-table-column label="分公司">
					  <template slot-scope="scope">
						{{scope.row.branchOffice}}
					  </template>
					</el-table-column>
					<el-table-column label="评估目的">
					  <template slot-scope="scope">
						{{scope.row.assessAim}}
					  </template>
					</el-table-column>
					<el-table-column  label="报告类型">
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
						{{scope.row.applicant}}
					  </template>
					</el-table-column>
					<el-table-column label="申请时间">
					  <template slot-scope="scope">
						{{scope.row.applicationDate}}
					  </template>
					</el-table-column>
					<el-table-column label="状态">
					  <template slot-scope="scope">
						  <div v-if="scope.row.state == 1">待审核</div>
						  <div v-else>{{scope.row.state}}</div>
					  </template>
					</el-table-column>
					<el-table-column label="审核结果">
					  <template slot-scope="scope">
						{{scope.row.checkResult}}
					  </template>
					</el-table-column>
					<el-table-column label="操作">
					  <template slot-scope="scope">
						  <div v-if="scope.row.state == 1">
							  <span style="color: rgb(51, 153, 204);cursor: pointer;" @click="getReportDetail(scope.$index,scope.row)">
							    查看
							  </span>
							  <span style="cursor: pointer;color: rgb(51, 153, 204);">
							    待审核
							  </span>
						  </div>
						  <div v-else>
							  <span style="color: rgb(51, 153, 204);cursor: pointer;" @click="getReportDetail(scope.$index,scope.row)">
							    查看
							  </span>
							  <span style="color: rgb(51, 153, 204);cursor: pointer;" @click="editReportDetail(scope.$index,scope.row)">
							    修改
							  </span>
							  <span @click="removeList(scope.$index, scope.row)" style="cursor: pointer;color: rgb(51, 153, 204);">
							    删除
							  </span>
							  <span @click="postList(scope.$index, scope.row)" style="cursor: pointer;color: rgb(51, 153, 204);">
							    提交审核
							  </span>
						  </div>
					  </template>
					</el-table-column>
				  </el-table>
				</div>
			</template>
		</div>
		<el-dialog title="新建项目" :visible.sync="editFormVisible">
			<el-form :inline="true" :model="editForm">
				<el-form-item label="报告类型:">
					<template>
						<el-select style="width: 250px;" placeholder="请选择">
							<el-option>
								<router-link :to="{ path: '/entryList/realEstateReport'}" style="color: rgb(51, 153, 204)">
									房地产估计报告
								</router-link>
							</el-option>
							<el-option>
								<router-link :to="{ path: '/entryList/landValuationReport'}" style="color: rgb(51, 153, 204)">
									土地估计报告
								</router-link>
							</el-option>
							<el-option>
								<router-link :to="{ path: '/entryList/assetsReport'}" style="color: rgb(51, 153, 204)">
									资产估计报告
								</router-link>
							</el-option>
							<el-option>
								<router-link :to="{ path: '/entryList/preliminaryAssessment'}" style="color: rgb(51, 153, 204)">
									预评估
								</router-link>
							</el-option>
						</el-select>
					</template>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 房地产估价报告-弹窗 -->
		<el-dialog title="房地产估价报告" :visible.sync="fdcFormVisible" :close-on-click-modal="false" style="width: 100%;">
			<template>
				<el-form :inline="true" :model="estateForm" ref="estateForm" label-width="110px" style="width: 100%;">
					<el-form-item label="报告类型:" style="display: block;">
						<template>
							<el-input value="房地产估价报告" disabled></el-input>
						</template>
					</el-form-item>
					<el-form-item label="项目名称:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.projectName" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.projectName" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="估价报告编号:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessReportNum" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessReportNum" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="估价作业开始时间:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessStartTime" v-if="lookOrEdit" disabled></el-input>
							<el-date-picker v-model="estateForm.assessStartTime" v-else type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
						</template>
					</el-form-item>
					<el-form-item label="估价作业结束时间:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessEndTime" v-if="lookOrEdit" disabled></el-input>
							<el-date-picker v-model="estateForm.assessEndTime" v-else type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
						</template>
					</el-form-item>
					<el-form-item label="估价时点:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.valueTime" v-if="lookOrEdit" disabled></el-input>
							<el-date-picker v-model="estateForm.valueTime" v-else type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
						</template>
					</el-form-item>
					<el-form-item label="估价对象:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessObject" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessObject" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="估价目的:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessAim" v-if="lookOrEdit" disabled></el-input>
							<el-select v-model="estateForm.assessAim" placeholder="请选择" v-else>
								<el-option
									v-for="(item,index) in assessAimList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</template>
					</el-form-item>
					<el-form-item label="估价方法:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessMethod" v-if="lookOrEdit" disabled></el-input>
							<el-select v-model="estateForm.assessMethod" placeholder="请选择" v-else>
								<el-option
									v-for="(item,index) in assessMethodList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</template>
					</el-form-item>
					<el-form-item label="价值类型:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.valueType" v-if="lookOrEdit" disabled></el-input>
							<el-select v-model="estateForm.valueType" placeholder="请选择" v-else>
								<el-option
									v-for="(item,index) in valueTypeList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</template>
					</el-form-item>
					<el-form-item label="建筑面积(m2):" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.buildingArea" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.buildingArea" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="土地面积(m2):" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.floorArea" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.floorArea" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="评估单价:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessUnitPrice" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessUnitPrice" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="评估总价:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessTotalPrice" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessTotalPrice" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="委托方:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.client" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.client" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="第一报告人:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.firstReporter" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.firstReporter" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="第一报告人注册号:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.firstReporterRgNum" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.firstReporterRgNum" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="参与报告人1:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.partReporter1" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.partReporter1" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="参与报告人2:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.partReporter2" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.partReporter2" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="参与报告人1注册号:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.partReporter1RgNum" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.partReporter1RgNum" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="参与报告人2注册号:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.partReporter2RgNum" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.partReporter2RgNum" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="业务来源:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.serviceSource" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.serviceSource" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="分公司:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.branchOffice" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.branchOffice" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="业务收费:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.serviceCharge" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.serviceCharge" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="审核员:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.checker" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.checker" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="评估机构:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessOrg" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessOrg" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="文件上传" class="fl">
						<el-upload
						  class="upload-demo"
						  ref="upload"
						  name="file"
						  :action="UploadUrl ()"
						  :data="uploadData"
						  :on-preview="handlePreview"
						  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx"
						  :on-remove="handleRemove"
						  :before-remove="beforeRemove"
						  :auto-upload="false"
						  :on-change="handleChange"
						  multiple
						  :limit="1"
						  :on-exceed="handleExceed"
						  :file-list="fileList">
						  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
						  <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg</div>
						</el-upload>
					</el-form-item>
					<el-form-item style="display: block;">
						<el-button @click="submitForm(estateForm)" v-show="!lookOrEdit">提交</el-button>
						<el-button @click.native="fdcFormVisible = false">取消</el-button>
					</el-form-item>
				</el-form>
			</template>
		</el-dialog>
		<!-- 土地估价报告-弹窗 -->
		<el-dialog title="土地估价报告" :visible.sync="tdFormVisible" :close-on-click-modal="false">
			<template>
				<el-form :inline="true" :model="estateForm" ref="estateForm" label-width="110px">
					<el-form-item label="报告类型:" style="display: block;">
						<template>
							<el-input value="土地估价报告" disabled></el-input>
						</template>
					</el-form-item>
					<el-form-item label="项目名称:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.projectName" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.projectName" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="估价报告编号:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessReportNum" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessReportNum" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="估价作业开始时间:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessStartTime"  v-if="lookOrEdit" disabled></el-input>
							<el-date-picker v-model="estateForm.assessStartTime" v-else type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd"></el-date-picker>
						</template>
					</el-form-item>
					<el-form-item label="估价作业结束时间:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessEndTime"  v-if="lookOrEdit" disabled></el-input>
							<el-date-picker v-model="estateForm.assessEndTime" v-else type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd"></el-date-picker>
						</template>
					</el-form-item>
					<el-form-item label="估价时点:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.valueTime"  v-if="lookOrEdit" disabled></el-input>
							<el-date-picker v-model="estateForm.valueTime" v-else type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd"></el-date-picker>
						</template>
					</el-form-item>
					<el-form-item label="估价对象:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessObject" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessObject" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="估价目的:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessAim" v-if="lookOrEdit" disabled></el-input>
							<el-select v-model="estateForm.assessAim" placeholder="请选择" v-else>
								<el-option
									v-for="(item,index) in assessAimList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</template>
					</el-form-item>
					<el-form-item label="估价方法:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessMethod" v-if="lookOrEdit" disabled></el-input>
							<el-select v-model="estateForm.assessMethod" placeholder="请选择" v-else>
								<el-option
									v-for="(item,index) in assessMethodList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</template>
					</el-form-item>
					<el-form-item label="宗地位置:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.landSite" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.landSite" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="宗地面积(m2):" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.landArea" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.landArea" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="宗地数:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.landAmount" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.landAmount" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="评估单价:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessUnitPrice" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessUnitPrice" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="评估总价:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessTotalPrice" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessTotalPrice" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="委托方:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.client" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.client" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="委托人邮箱:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.clientEmail" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.clientEmail" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="委托人电话:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.clientPhone" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.clientPhone" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="第一报告人:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.firstReporter" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.firstReporter" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="第一报告人注册号:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.firstReporterRgNum" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.firstReporterRgNum" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="参与报告人1:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.partReporter1" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.partReporter1" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="参与报告人2:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.partReporter2" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.partReporter2" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="参与报告人1注册号:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.partReporter1RgNum" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.partReporter1RgNum" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="参与报告人2注册号:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.partReporter2RgNum" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.partReporter2RgNum" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="业务来源:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.serviceSource" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.serviceSource" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="分公司:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.branchOffice" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.branchOffice" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="业务收费:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.serviceCharge" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.serviceCharge" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="审核员:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.checker" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.checker" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="评估机构:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessOrg" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessOrg" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="文件上传" class="fl">
						<el-upload
					  class="upload-demo"
					  ref="upload"
					  name="file"
					  :action="UploadUrl ()"
					  :data="uploadData"
					  :on-preview="handlePreview"
					  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  :auto-upload="false"
					  :on-change="handleChange"
					  multiple
					  :limit="1"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
					  <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg</div>
					</el-upload>
					</el-form-item>
					<el-form-item style="display: block;">
						<el-button @click="submitForm(estateForm)" v-show="!lookOrEdit">提交</el-button>
						<el-button @click.native="tdFormVisible = false">取消</el-button>
					</el-form-item>
				</el-form>
			</template>
		</el-dialog>
		<!-- 资产估价报告-弹窗 -->
		<el-dialog title="资产估价报告" :visible.sync="zcFormVisible" :close-on-click-modal="false">
			<template>
				<el-form :inline="true" :model="estateForm" ref="estateForm" label-width="110px">
					<el-form-item label="报告类型:" style="display: block;">
						<template>
							<el-input value="资产评估报告" disabled></el-input>
						</template>
					</el-form-item>
					<el-form-item label="项目名称:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.projectName" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.projectName" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="估价报告编号:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessReportNum" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessReportNum" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="价值时点:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.valueTime" v-if="lookOrEdit" disabled></el-input>
							<el-date-picker v-model="estateForm.valueTime" v-else type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd"></el-date-picker>
						</template>
					</el-form-item>
					<el-form-item label="估价对象:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessObject" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessObject" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="是否国有资产评估业务:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.isStateAssets" v-if="lookOrEdit" disabled></el-input>
							<el-select v-model="estateForm.isStateAssets" v-else placeholder="请选择">
								<el-option
									v-for="(item,index) in assessAimList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</template>
					</el-form-item>
					<el-form-item label="是否私发资产评估业务:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.isPrivateAsset" v-if="lookOrEdit" disabled></el-input>
							<el-select v-model="estateForm.isPrivateAsset" v-else placeholder="请选择">
								<el-option
									v-for="(item,index) in assessMethodList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</template>
					</el-form-item>
					<el-form-item label="评估目的:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessAim" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessAim" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="评估对象:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessTotalPrice" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessTotalPrice" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="价值类型:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.valueType" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.valueType" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="评估方法:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessMethod" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessMethod" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="评估结论(万元):" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessResult" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessResult" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="评估基准日" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assessDate" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessDate" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="实际收费金额(万元):" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.actualFee" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.actualFee" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="资产评估报告日:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assetsReportDate" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assetsReportDate" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="总资产账面值:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.assetsFee" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assetsFee" v-else></el-input>
							<!-- <el-radio></el-radio>无账面价值 -->
						</template>
					</el-form-item>
					<el-form-item label="总负债账面值:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.debtFee" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.debtFee" v-else></el-input>
							<!-- <el-radio></el-radio>无账面价值 -->
						</template>
					</el-form-item>
					<el-form-item label="净资产账面值:" style="width: 46%;">
						<template>
							<el-input v-model="estateForm.netAssets" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.netAssets" v-else></el-input>
							<!-- <el-radio></el-radio>无账面价值 -->
						</template>
					</el-form-item>
					<el-form-item label="文件上传" class="fl" style="display: block;">
						<el-upload
					  class="upload-demo"
					  ref="upload"
					  name="file"
					  :action="UploadUrl ()"
					  :data="uploadData"
					  :on-preview="handlePreview"
					  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  :auto-upload="false"
					  :on-change="handleChange"
					  multiple
					  :limit="1"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
					  <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg</div>
					</el-upload>
					</el-form-item>
					<el-form-item style="display: block;">
						<el-button @click="submitForm(estateForm)" v-show="!lookOrEdit">提交</el-button>
						<el-button @click.native="zcFormVisible = false">取消</el-button>
					</el-form-item>
				</el-form>
			</template>
		</el-dialog>
		<!-- 预评估-弹窗 -->
		<el-dialog title="预评估" :visible.sync="ypgFormVisible" :close-on-click-modal="false">
			<template>
				<el-form :inline="true" :model="estateForm" ref="estateForm" label-width="180px">
					<el-form-item label="业务来源:" style="width: 80%;">
						<template>
							<el-input v-model="estateForm.reportType" disabled></el-input>
						</template>
					</el-form-item>
					<el-form-item label="分公司:" style="width: 80%;">
						<template>
							<el-input v-model="estateForm.branchOffice"  v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.branchOffice" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="审核员:" style="width: 80%;">
						<template>
							<el-input v-model="estateForm.checker" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.checker" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="评估机构:" style="width: 80%;">
						<template>
							<el-input v-model="estateForm.assessOrg" v-if="lookOrEdit" disabled></el-input>
							<el-input v-model="estateForm.assessOrg" v-else></el-input>
						</template>
					</el-form-item>
					<el-form-item label="文件上传" class="fl" style="display: block;">
						<el-upload
					  class="upload-demo"
					  ref="upload"
					  name="file"
					  :action="UploadUrl ()"
					  :data="uploadData"
					  :on-preview="handlePreview"
					  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  :auto-upload="false"
					  :on-change="handleChange"
					  multiple
					  :limit="1"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
					  <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg</div>
					</el-upload>
					</el-form-item>
					<el-form-item style="display: block;">
						<el-button @click="submitForm(estateForm)" v-show="!lookOrEdit">提交</el-button>
						<el-button @click.native="ypgFormVisible = false">取消</el-button>
					</el-form-item>
				</el-form>
			</template>
		</el-dialog>
	</div>
</template>

<script>
import { getEntryList, deleteReport, postCheckId, getReportData } from '@/api/entry'
export default {
  data() {
		return {
			editForm:{
				branchName: '',
				status: ''
			},
			checkForm:{
				checkAccount: '12个'
			},
			editFormVisible: false,
			fdcFormVisible: false,
			tdFormVisible: false,
			zcFormVisible: false,
			ypgFormVisible: false,
			lookOrEdit: false,
			estateForm:{},
			fileList: [{
					name: '',
					url: ''
				}],
			checkOr:[{
					"label": "待审核",
					"value": "待审核"
				},{
					"label": "未审核",
					"value": "未审核"
			}],
			companySel:[{
					"label": "分公司1",
					"value": "分公司1"
				},{
					"label": "分公司2",
					"value": "分公司2"
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
			assessAimList:[{
					"label": "出让",
					"value": "出让"
				},{
					"label": "不出让",
					"value": "不出让"
			}],
			assessMethodList:[{
					"label": "出让",
					"value": "出让"
				},{
					"label": "不出让",
					"value": "不出让"
			}],
			valueTypeList:[{
					"label": "出让",
					"value": "出让"
				},{
					"label": "不出让",
					"value": "不出让"
			}]
	  }
  },
  mounted() {
  	this.fetchProjectList()
  },
  computed: {
  	uploadData: function () {
  		let parseData = JSON.stringify(this.estateForm);
  	    let params = {
  			data: parseData
  		  }
  		  return params
  		}
    },
	methods:{
		fetchProjectList() {
			let state = this.editForm.status;
			let branchOffice = this.editForm.branchName;
			getEntryList(state,branchOffice).then((res) => {
				this.totalPriceEvaluation = res.data
				console.log(res);
			})
		},
		searchTable(editForm){
			this.$refs.editForm.validate((valid) => {
			  if (valid) {
					// alert('submit!');
					console.log(editForm);
					// let para = {
					// 	branchOffice: editForm.branchName,
					// 	state: editForm.status
					// }
					let state = editForm.status;
					let branchOffice = editForm.branchName;
					getEntryList(state,branchOffice).then((res) => {
						this.totalPriceEvaluation = res.data
						console.log(res);
					})
			  } else {
				console.log('error submit!!');
					return false;
			  }
			});
		},
		newAdd() {
			this.editFormVisible = true;
		},
		getReportDetail: function(index, row){
			let id = row.id;
			let reportType = row.reportType;
			getReportData(id,reportType).then((res) => {
				console.log(res);
				this.lookOrEdit = true;
				if(reportType == 1){
					this.fdcFormVisible = true;
				}else if(reportType == 2){
					this.tdFormVisible = true;
				}else if(reportType == 3){
					this.zcFormVisible = true;
				}else if(reportType == 4){
					this.ypgFormVisible = true;
				}
				this.estateForm = res.data;
				let fileUrl = res.data.wordUri;
				let fileIndex = fileUrl.lastIndexOf('\/');
				let fileName = fileUrl.substring(fileIndex + 1, fileUrl.length);
				console.log(fileName)
				this.fileList[0].name = fileName;
				this.fileList[0].url = fileUrl;
			});
		},
		editReportDetail: function(index, row){
			let id = row.id;
			let reportType = row.reportType;
			getReportData(id,reportType).then((res) => {
				console.log(res);
				this.lookOrEdit = false;
				if(reportType == 1){
					this.fdcFormVisible = true;
				}else if(reportType == 2){
					this.tdFormVisible = true;
				}else if(reportType == 3){
					this.zcFormVisible = true;
				}else if(reportType == 4){
					this.ypgFormVisible = true;
				}
				this.estateForm = res.data;
				let fileUrl = res.data.wordUri;
				let fileIndex = fileUrl.lastIndexOf('\/');
				let fileName = fileUrl .substring(fileIndex + 1, fileUrl .length);
				console.log(fileName)
				this.fileList[0].name = fileName;
				this.fileList[0].url = fileUrl;
			});
		},
		removeList: function(index, row){
			let id = row.id;
			let reportType = row.reportType;
			let para = {
				id: id,
				reportType: reportType
			};
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				deleteReport(id,reportType).then((res) => {
					// this.listLoading = false;
					// this.lookFormVisible = true;
					// this.searchForm = res.body;
					// console.log(res.body);
					// this.fetchProjectList();
					this.fetchProjectList()
				});
			}).catch(() => {
		
			});
		},
		postList: function(index, row){
			let id = row.id;
			this.$confirm('确认提交该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				postCheckId(id).then((res) => {
					// this.listLoading = false;
					// this.lookFormVisible = true;
					// this.searchForm = res.body;
					// console.log(res.body);
					// this.fetchProjectList();
					this.fetchProjectList()
				});
			}).catch(() => {
				
			});
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		UploadUrl () {
			return "http://fcpgpre.jstspg.com/rpt/index/updateRptOrFile"
		},
		handleChange(file, fileList) {
		  this.fileList = fileList;
		  this.file = file;
		  console.log(file)
		},
		submitForm(estateForm) {
			this.$refs.estateForm.validate((valid) => {
			  if (valid) {
					this.$confirm('确认提交该记录吗?', '提示', {
						type: 'warning'
					}).then(() => {
						this.$refs.upload.submit();
						// this.$router.push({path:'/entryList/index'})
					}).catch(() => {
						
					});
			  } else {
					console.log('error submit!!');
			  }
			});
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

<style>
</style>
