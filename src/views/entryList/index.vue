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
    <el-form v-permission="[296]" :inline="true" style="float: left;margin-left: 40px;">
      <el-form-item>
        <el-button type="primary" @click="newAdd()">新增申请</el-button>
      </el-form-item>
    </el-form>
    <div>
      <template>
        <div class="table">
          <el-table
            ref="table"
            :data="totalPriceEvaluation"
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
                {{ scope.row.applicationNum }}
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
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div v-if="scope.row.state == 3 || scope.row.state == 1">
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
            </el-table-column>
          </el-table>
        </div>
      </template>
    </div>
    <el-dialog :visible.sync="editFormVisible" title="新建项目">
      <el-form :inline="true" :model="editForm">
        <el-form-item label="报告类型:">
          <template>
            <el-select style="width: 250px;" placeholder="请选择" v-model="editForm.linkSel">
              <el-option v-for="(item,index) in linkArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
              </el-option>
            </el-select>
          </template>
        </el-form-item>
				<el-form-item>
				  <el-button type="primary" @click="confirmLink(editForm)">确定</el-button>
				</el-form-item>
      </el-form>
    </el-dialog>
    <!-- 房地产估价报告-弹窗 -->
    <el-dialog :visible.sync="fdcFormVisible" :close-on-click-modal="false" title="房地产估价报告">
      <template>
        <el-form ref="estateForm" :inline="true" :model="estateForm" label-width="140px" style="width: 100%;">
          <el-form-item label="报告类型:" style="display: block;">
            <template>
              <el-input value="房地产估价报告" disabled/>
            </template>
          </el-form-item>
          <el-form-item label="项目名称:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.projectName" disabled/>
              <el-input v-else v-model="estateForm.projectName"/>
            </template>
          </el-form-item>
          <el-form-item label="估价报告编号:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessReportNum" disabled/>
              <el-input v-else v-model="estateForm.assessReportNum"/>
            </template>
          </el-form-item>
          <el-form-item label="估价作业开始时间:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessStartTime" disabled/>
              <el-date-picker v-else v-model="estateForm.assessStartTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
            </template>
          </el-form-item>
          <el-form-item label="估价作业结束时间:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessEndTime" disabled/>
              <el-date-picker v-else v-model="estateForm.assessEndTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
            </template>
          </el-form-item>
          <el-form-item label="估价时点:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.valueTime" disabled/>
              <el-date-picker v-else v-model="estateForm.valueTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
            </template>
          </el-form-item>
          <el-form-item label="估价对象:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessObject" disabled/>
              <el-input v-else v-model="estateForm.assessObject"/>
            </template>
          </el-form-item>
          <el-form-item label="估价目的:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessAim" disabled/>
              <el-select v-else v-model="estateForm.assessAim" placeholder="请选择">
                <el-option
                  v-for="(item,index) in assessAimList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="估价方法:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessMethod" disabled/>
              <el-select v-else v-model="estateForm.assessMethod" placeholder="请选择">
                <el-option
                  v-for="(item,index) in assessMethodList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="价值类型:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.valueType" disabled/>
              <el-select v-else v-model="estateForm.valueType" placeholder="请选择">
                <el-option
                  v-for="(item,index) in valueTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="建筑面积(m2):" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.buildingArea" disabled/>
              <el-input v-else v-model="estateForm.buildingArea"/>
            </template>
          </el-form-item>
          <el-form-item label="土地面积(m2):" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.floorArea" disabled/>
              <el-input v-else v-model="estateForm.floorArea"/>
            </template>
          </el-form-item>
          <el-form-item label="评估单价:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessUnitPrice" disabled/>
              <el-input v-else v-model="estateForm.assessUnitPrice"/>
            </template>
          </el-form-item>
          <el-form-item label="评估总价:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessTotalPrice" disabled/>
              <el-input v-else v-model="estateForm.assessTotalPrice"/>
            </template>
          </el-form-item>
          <el-form-item label="委托方:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.client" disabled/>
              <el-input v-else v-model="estateForm.client"/>
            </template>
          </el-form-item>
          <el-form-item label="第一报告人:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.firstReporter" disabled/>
              <el-input v-else v-model="estateForm.firstReporter"/>
            </template>
          </el-form-item>
          <el-form-item label="第一报告人注册号:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.firstReporterRgNum" disabled/>
              <el-input v-else v-model="estateForm.firstReporterRgNum"/>
            </template>
          </el-form-item>
          <el-form-item label="参与报告人1:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.partReporter1" disabled/>
              <el-input v-else v-model="estateForm.partReporter1"/>
            </template>
          </el-form-item>
          <el-form-item label="参与报告人2:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.partReporter2" disabled/>
              <el-input v-else v-model="estateForm.partReporter2"/>
            </template>
          </el-form-item>
          <el-form-item label="参与报告人1注册号:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.partReporter1RgNum" disabled/>
              <el-input v-else v-model="estateForm.partReporter1RgNum"/>
            </template>
          </el-form-item>
          <el-form-item label="参与报告人2注册号:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.partReporter2RgNum" disabled/>
              <el-input v-else v-model="estateForm.partReporter2RgNum"/>
            </template>
          </el-form-item>
          <el-form-item label="业务来源:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.serviceSource" disabled/>
              <el-input v-else v-model="estateForm.serviceSource"/>
            </template>
          </el-form-item>
          <el-form-item label="分公司:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.branchOffice" disabled/>
              <el-input v-else v-model="estateForm.branchOffice"/>
            </template>
          </el-form-item>
          <el-form-item label="业务收费:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.serviceCharge" disabled/>
              <el-input v-else v-model="estateForm.serviceCharge"/>
            </template>
          </el-form-item>
          <el-form-item label="审核员:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.checker" disabled/>
              <el-input v-else v-model="estateForm.checker"/>
            </template>
          </el-form-item>
          <el-form-item label="评估机构:" style="width: 90%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessOrg" style="width: 400px;" disabled/>
              <el-input v-else v-model="estateForm.assessOrg" style="width: 400px;"/>
            </template>
          </el-form-item>
          <el-form-item label="文件上传" class="fl">
            <el-upload
              ref="upload"
              :action="UploadUrl ()"
              :data="uploadData"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :auto-upload="false"
              :on-change="handleChange"
              class="upload-demo"
              :limit="1"
              name="file"
              :on-exceed="handleExceed"
              :file-list="fileList"
              accept=".doc,.docx"
              multiple>
              <el-button slot="trigger" size="small" type="primary" v-show="!lookOrEdit">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx</div>
            </el-upload>
          </el-form-item>
          <el-form-item style="display: block;">
            <el-button v-show="!lookOrEdit" @click="submitForm(estateForm)">提交</el-button>
            <el-button @click.native="fdcFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
    <!-- 土地估价报告-弹窗 -->
    <el-dialog :visible.sync="tdFormVisible" :close-on-click-modal="false" title="土地估价报告">
      <template>
        <el-form ref="estateForm" :inline="true" :model="estateForm" label-width="140px">
          <el-form-item label="报告类型:" style="display: block;">
            <template>
              <el-input value="土地估价报告" disabled/>
            </template>
          </el-form-item>
          <el-form-item label="项目名称:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.projectName" disabled/>
              <el-input v-else v-model="estateForm.projectName"/>
            </template>
          </el-form-item>
          <el-form-item label="估价报告编号:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessReportNum" disabled/>
              <el-input v-else v-model="estateForm.assessReportNum"/>
            </template>
          </el-form-item>
          <el-form-item label="估价作业开始时间:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessStartTime" disabled/>
              <el-date-picker v-else v-model="estateForm.assessStartTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd"/>
            </template>
          </el-form-item>
          <el-form-item label="估价作业结束时间:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessEndTime" disabled/>
              <el-date-picker v-else v-model="estateForm.assessEndTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd"/>
            </template>
          </el-form-item>
          <el-form-item label="估价时点:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.valueTime" disabled/>
              <el-date-picker v-else v-model="estateForm.valueTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd"/>
            </template>
          </el-form-item>
          <el-form-item label="估价对象:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessObject" disabled/>
              <el-input v-else v-model="estateForm.assessObject"/>
            </template>
          </el-form-item>
          <el-form-item label="估价目的:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessAim" disabled/>
              <el-select v-else v-model="estateForm.assessAim" placeholder="请选择">
                <el-option
                  v-for="(item,index) in assessAimList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="估价方法:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessMethod" disabled/>
              <el-select v-else v-model="estateForm.assessMethod" placeholder="请选择">
                <el-option
                  v-for="(item,index) in assessMethodList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="宗地位置:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.landSite" disabled/>
              <el-input v-else v-model="estateForm.landSite"/>
            </template>
          </el-form-item>
          <el-form-item label="宗地面积(m2):" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.landArea" disabled/>
              <el-input v-else v-model="estateForm.landArea"/>
            </template>
          </el-form-item>
          <el-form-item label="宗地数:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.landAmount" disabled/>
              <el-input v-else v-model="estateForm.landAmount"/>
            </template>
          </el-form-item>
          <el-form-item label="评估单价:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessUnitPrice" disabled/>
              <el-input v-else v-model="estateForm.assessUnitPrice"/>
            </template>
          </el-form-item>
          <el-form-item label="评估总价:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessTotalPrice" disabled/>
              <el-input v-else v-model="estateForm.assessTotalPrice"/>
            </template>
          </el-form-item>
          <el-form-item label="委托方:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.client" disabled/>
              <el-input v-else v-model="estateForm.client"/>
            </template>
          </el-form-item>
          <el-form-item label="委托人邮箱:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.clientEmail" disabled/>
              <el-input v-else v-model="estateForm.clientEmail"/>
            </template>
          </el-form-item>
          <el-form-item label="委托人电话:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.clientPhone" disabled/>
              <el-input v-else v-model="estateForm.clientPhone"/>
            </template>
          </el-form-item>
          <el-form-item label="第一报告人:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.firstReporter" disabled/>
              <el-input v-else v-model="estateForm.firstReporter"/>
            </template>
          </el-form-item>
          <el-form-item label="第一报告人注册号:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.firstReporterRgNum" disabled/>
              <el-input v-else v-model="estateForm.firstReporterRgNum"/>
            </template>
          </el-form-item>
          <el-form-item label="参与报告人1:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.partReporter1" disabled/>
              <el-input v-else v-model="estateForm.partReporter1"/>
            </template>
          </el-form-item>
          <el-form-item label="参与报告人2:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.partReporter2" disabled/>
              <el-input v-else v-model="estateForm.partReporter2"/>
            </template>
          </el-form-item>
          <el-form-item label="参与报告人1注册号:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.partReporter1RgNum" disabled/>
              <el-input v-else v-model="estateForm.partReporter1RgNum"/>
            </template>
          </el-form-item>
          <el-form-item label="参与报告人2注册号:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.partReporter2RgNum" disabled/>
              <el-input v-else v-model="estateForm.partReporter2RgNum"/>
            </template>
          </el-form-item>
          <el-form-item label="业务来源:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.serviceSource" disabled/>
              <el-input v-else v-model="estateForm.serviceSource"/>
            </template>
          </el-form-item>
          <el-form-item label="分公司:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.branchOffice" disabled/>
              <el-input v-else v-model="estateForm.branchOffice"/>
            </template>
          </el-form-item>
          <el-form-item label="业务收费:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.serviceCharge" disabled/>
              <el-input v-else v-model="estateForm.serviceCharge"/>
            </template>
          </el-form-item>
          <el-form-item label="审核员:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.checker" disabled/>
              <el-input v-else v-model="estateForm.checker"/>
            </template>
          </el-form-item>
          <el-form-item label="评估机构:" style="width: 90%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessOrg" style="width: 400px;" disabled/>
              <el-input v-else v-model="estateForm.assessOrg" style="width: 400px;"/>
            </template>
          </el-form-item>
          <el-form-item label="文件上传" class="fl">
            <el-upload
              ref="upload"
              :action="UploadUrl ()"
              :data="uploadData"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :auto-upload="false"
              :on-change="handleChange"
              class="upload-demo"
              :limit="1"
              name="file"
              :on-exceed="handleExceed"
              :file-list="fileList"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx"
              multiple>
              <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">支持扩展名.doc .docx</div>
            </el-upload>
          </el-form-item>
          <el-form-item style="display: block;">
            <el-button v-show="!lookOrEdit" @click="submitForm(estateForm)">提交</el-button>
            <el-button @click.native="tdFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
    <!-- 资产估价报告-弹窗 -->
    <el-dialog :visible.sync="zcFormVisible" :close-on-click-modal="false" title="资产估价报告">
      <template>
        <el-form ref="estateForm" :inline="true" :model="estateForm" label-width="140px">
          <el-form-item label="报告类型:" style="display: block;">
            <template>
              <el-input value="资产评估报告" disabled/>
            </template>
          </el-form-item>
          <el-form-item label="项目名称:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.projectName" disabled/>
              <el-input v-else v-model="estateForm.projectName"/>
            </template>
          </el-form-item>
          <el-form-item label="估价报告编号:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessReportNum" disabled/>
              <el-input v-else v-model="estateForm.assessReportNum"/>
            </template>
          </el-form-item>
          <el-form-item label="价值时点:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.valueTime" disabled/>
              <el-date-picker v-else v-model="estateForm.valueTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd"/>
            </template>
          </el-form-item>
          <el-form-item label="估价对象:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessObject" disabled/>
              <el-input v-else v-model="estateForm.assessObject"/>
            </template>
          </el-form-item>
          <el-form-item label="是否国有资产评估业务:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.isStateAssets" disabled/>
              <el-select v-else v-model="estateForm.isStateAssets" placeholder="请选择">
                <el-option
                  v-for="(item,index) in assessAimList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="是否私发资产评估业务:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.isPrivateAsset" disabled/>
              <el-select v-else v-model="estateForm.isPrivateAsset" placeholder="请选择">
                <el-option
                  v-for="(item,index) in assessMethodList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="评估目的:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessAim" disabled/>
              <el-input v-else v-model="estateForm.assessAim"/>
            </template>
          </el-form-item>
          <el-form-item label="评估对象:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessTotalPrice" disabled/>
              <el-input v-else v-model="estateForm.assessTotalPrice"/>
            </template>
          </el-form-item>
          <el-form-item label="价值类型:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.valueType" disabled/>
              <el-input v-else v-model="estateForm.valueType"/>
            </template>
          </el-form-item>
          <el-form-item label="评估方法:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessMethod" disabled/>
              <el-input v-else v-model="estateForm.assessMethod"/>
            </template>
          </el-form-item>
          <el-form-item label="评估结论(万元):" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessResult" disabled/>
              <el-input v-else v-model="estateForm.assessResult"/>
            </template>
          </el-form-item>
          <el-form-item label="评估基准日" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessDate" disabled/>
              <el-input v-else v-model="estateForm.assessDate"/>
            </template>
          </el-form-item>
          <el-form-item label="实际收费金额(万元):" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.actualFee" disabled/>
              <el-input v-else v-model="estateForm.actualFee"/>
            </template>
          </el-form-item>
          <el-form-item label="资产评估报告日:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assetsReportDate" disabled/>
              <el-input v-else v-model="estateForm.assetsReportDate"/>
            </template>
          </el-form-item>
          <el-form-item label="总资产账面值:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assetsFee" disabled/>
              <el-input v-else v-model="estateForm.assetsFee"/>
              <!-- <el-radio></el-radio>无账面价值 -->
            </template>
          </el-form-item>
          <el-form-item label="总负债账面值:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.debtFee" disabled/>
              <el-input v-else v-model="estateForm.debtFee"/>
              <!-- <el-radio></el-radio>无账面价值 -->
            </template>
          </el-form-item>
          <el-form-item label="净资产账面值:" style="width: 31%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.netAssets" disabled/>
              <el-input v-else v-model="estateForm.netAssets"/>
              <!-- <el-radio></el-radio>无账面价值 -->
            </template>
          </el-form-item>
          <el-form-item label="文件上传" class="fl" style="display: block;">
            <el-upload
              ref="upload"
              :action="UploadUrl ()"
              :data="uploadData"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :auto-upload="false"
              :on-change="handleChange"
              class="upload-demo"
              :limit="1"
              name="file"
              :on-exceed="handleExceed"
              :file-list="fileList"
              accept=".doc,.docx"
              multiple>
              <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx</div>
            </el-upload>
          </el-form-item>
          <el-form-item style="display: block;">
            <el-button v-show="!lookOrEdit" @click="submitForm(estateForm)">提交</el-button>
            <el-button @click.native="zcFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
    <!-- 预评估-弹窗 -->
    <el-dialog :visible.sync="ypgFormVisible" :close-on-click-modal="false" title="预评估">
      <template>
        <el-form ref="estateForm" :inline="true" :model="estateForm" label-width="180px">
          <el-form-item label="业务来源:" style="width: 80%;">
            <template>
              <el-input v-model="estateForm.reportType" disabled/>
            </template>
          </el-form-item>
          <el-form-item label="分公司:" style="width: 80%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.branchOffice" disabled/>
              <el-input v-else v-model="estateForm.branchOffice"/>
            </template>
          </el-form-item>
          <el-form-item label="审核员:" style="width: 80%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.checker" disabled/>
              <el-input v-else v-model="estateForm.checker"/>
            </template>
          </el-form-item>
          <el-form-item label="评估机构:" style="width: 80%;">
            <template>
              <el-input v-if="lookOrEdit" v-model="estateForm.assessOrg" style="width: 400px;" disabled/>
              <el-input v-else v-model="estateForm.assessOrg" style="width: 400px;"/>
            </template>
          </el-form-item>
          <el-form-item label="文件上传" class="fl" style="display: block;">
            <el-upload
              ref="upload"
              :action="UploadUrl ()"
              :data="uploadData"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :auto-upload="false"
              :on-change="handleChange"
              class="upload-demo"
              :limit="1"
              name="file"
              :on-exceed="handleExceed"
              :file-list="fileList"
              accept=".doc,.docx"
              multiple  v-if="lookOrEdit">
              <!-- <el-button slot="trigger" size="small" type="primary">选择文件</el-button> -->
              <!-- <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx</div> -->
            </el-upload>
						<el-upload
						  ref="upload"
						  :action="UploadUrl ()"
						  :data="uploadData"
						  :on-preview="handlePreview"
						  :on-remove="handleRemove"
						  :before-remove="beforeRemove"
						  :auto-upload="false"
						  :on-change="handleChange"
						  class="upload-demo"
						  :limit="1"
						  name="file"
						  :on-exceed="handleExceed"
						  :file-list="fileList"
						  accept=".doc,.docx"
						  multiple v-else>
						  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
						  <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx</div>
						</el-upload>
          </el-form-item>
          <el-form-item style="display: block;">
            <el-button v-show="!lookOrEdit" @click="submitForm(estateForm)">提交</el-button>
            <el-button @click.native="ypgFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getEntryList, deleteReport, postCheckId, getReportData } from '@/api/entry'
import { mapGetters } from 'vuex'
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
		...mapGetters(['name']),
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
			console.log(this.name)
      const state = this.editForm.status
      const branchOffice = this.editForm.branchName
			let para
			if(localStorage.getItem('userId') == "root"){
				para = {
					"state": "",
					"branchOffice": "",
					"login": ""
				}
			}else{
				para = {
					"state": state,
					"branchOffice": branchOffice,
					"login": localStorage.getItem('userId')
				}
			}
      getEntryList(para).then((res) => {
        this.totalPriceEvaluation = res.data
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
          // alert('submit!');
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
					let para
					if(localStorage.getItem('userId') == "root"){
						para = {
							"state": state,
							"branchOffice": branchOffice,
							"login": ""
						}
					}else{
						para = {
							"state": state,
							"branchOffice": branchOffice,
							"login": localStorage.getItem('userId')
						}
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
		  // this.fileList = fileList
		  // this.file = file
		  console.log(file)
    },
    submitForm(estateForm) {
      this.$refs.estateForm.validate((valid) => {
			  if (valid) {
					// this.handleChange();
          this.$confirm('确认提交该记录吗?', '提示', {
            type: 'warning'
          }).then(() => {
            // this.$refs.upload.submit()
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
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style lang="scss" scoped>
	.el-dialog{
		width: 80% !important;
	}
</style>
