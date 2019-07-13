<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input placeholder="请输入搜索内容"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新建项目</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="projectList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
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
			<el-table-column prop="note" label="备注" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<span class="handleBtn" style="color: #1890FF;cursor: pointer;" @click="handleLook(scope.$index, scope.row)">查看</span>
					<span class="handleBtn" style="color: #1890FF;cursor: pointer;" @click="handleEdit(scope.$index, scope.row)">编辑</span>
					<span class="handleBtn" style="color: #1890FF;cursor: pointer;" @click="handleUpload(scope.$index, scope.row)">上传资料</span>
					<span class="handleBtn" style="color: #1890FF;cursor: pointer;" @click="handleDel(scope.$index, scope.row)">删除</span>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<!--编辑界面-->
		<el-dialog title="编辑信息" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="200px" ref="editForm" class="clearfix">
				<el-form-item label="项目编号" prop="id" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.id" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="行政区位级别" prop="area" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.area" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="项目名称" prop="name" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.name" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="报告编号" prop="assessment" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.assessment" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="房屋性质" prop="type" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.type" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="估价目的" prop="purpose" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.purpose" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="用途" prop="useFor" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.useFor" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="房屋征收决定公告" prop="notice" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.notice" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="成套标准房屋单价（元/㎡）" prop="completePrice" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.completePrice" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="非成套标准房屋单价（元/㎡）" prop="notCompletePrice" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.notCompletePrice" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="地大于房价格（元/㎡）" prop="overPrice" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.overPrice" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="价值时点" prop="valueTime" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.valueTime" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="是否有折扣率" prop="isDiscount" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.isDiscount" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="折扣率" prop="discount" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.discount" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="评估机构" prop="institutions" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.institutions" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="项目负责人" prop="projectLeader" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.projectLeader" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="技术负责人" prop="technicalLeader" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.technicalLeader" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="估价委托方" prop="assess" class="fl" style="width: 50%;float: left;">
					<el-input v-model="editForm.assess" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark" class="fl" style="width: 50%;float: left;">
					<el-input type="textarea" v-model="editForm.remark"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="submitEditForm(editForm)">保存</el-button>
				<el-button @click.native="editFormVisible = false">取消</el-button>
			</div>
		</el-dialog>
		
		<!--查看界面-->
		<el-dialog title="查看信息" :visible.sync="lookFormVisible" :close-on-click-modal="false">
			<el-form :model="searchForm" label-width="200px" ref="searchForm" class="clearfix">
				<el-form-item label="项目编号" prop="id" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.id" auto-complete="off" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="行政区位级别" prop="area" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.area" auto-complete="off" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="项目名称" prop="name" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.name" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="报告编号" prop="assessment" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.assessment" auto-complete="off" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="房屋性质" prop="type" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.type" auto-complete="off" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="估价目的" prop="purpose" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.purpose" auto-complete="off" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="用途" prop="useFor" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.useFor" auto-complete="off" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="房屋征收决定公告" prop="notice" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.notice" auto-complete="off" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="成套标准房屋单价（元/㎡）" prop="completePrice" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.completePrice" auto-complete="off" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="非成套标准房屋单价（元/㎡）" prop="notCompletePrice" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.notCompletePrice" auto-complete="off" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="地大于房价格（元/㎡）" prop="overPrice" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.overPrice" auto-complete="off" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="价值时点" prop="valueTime" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.valueTime" auto-complete="off" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="是否有折扣率" prop="isDiscount" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.isDiscount" auto-complete="off" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="折扣率" prop="discount" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.discount" auto-complete="off" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="评估机构" prop="institutions" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.institutions" auto-complete="off" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="项目负责人" prop="projectLeader" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.projectLeader" auto-complete="off" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="技术负责人" prop="technicalLeader" class="fl" style="width: 50%;float: left;">
					<el-input v-model="searchForm.technicalLeader" auto-complete="off" class="edit-input" disabled></el-input>
				</el-form-item>
				<el-form-item label="注册房地产估价师" prop="estateAppraiser " class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.estateAppraiser" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="委托单位" prop="valuationPrincipal " class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.valuationPrincipal " auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="现场评估工作地点" prop="assess" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.assess" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark" class="fl" style="width: 50%;float: left;">
					<el-input type="textarea" v-model="searchForm.remark" disabled></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<!-- <el-button @click="submitForm(searchForm)">保存</el-button> -->
				<el-button @click.native="lookFormVisible = false">取消</el-button>
			</div>
		</el-dialog>
		
		<!--新增信息界面-->
		<el-dialog title="新增信息界面" :visible.sync="newFormVisible" :close-on-click-modal="false">
			<el-form :model="newAddForm" label-width="200px" ref="editForm" class="clearfix">
				<el-form-item label="项目编号" prop="id" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.id" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="行政区位级别" prop="area" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.area" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="项目名称" prop="name" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.name" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="报告编号" prop="assessment" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.assessment" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="房屋性质" prop="type" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.type" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="估价目的" prop="purpose" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.purpose" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="用途" prop="use" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.use" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="房屋征收决定公告" prop="notice" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.notice" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="成套标准房屋单价（元/㎡）" prop="completePrice" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.completePrice" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="非成套标准房屋单价（元/㎡）" prop="notCompletePrice" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.notCompletePrice" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="地大于房价格（元/㎡）" prop="overPrice" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.overPrice" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="价值时点" prop="valueTime" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.valueTime" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="是否有折扣率" prop="isDiscount" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.isDiscount" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="折扣率" prop="discount" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.discount" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="评估机构" prop="institutions" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.institutions" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="项目负责人" prop="projectLeader" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.projectLeader" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="技术负责人" prop="technicalLeader" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.technicalLeader" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="注册房地产估价师" prop="estateAppraiser " class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.estateAppraiser" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="委托单位" prop="valuationPrincipal " class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.valuationPrincipal " auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="现场评估工作地点" prop="assess" class="fl" style="width: 50%;float: left;">
					<el-input v-model="newAddForm.assess" auto-complete="off" class="edit-input"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark" class="fl" style="width: 50%;float: left;">
					<el-input type="textarea" v-model="newAddForm.remark"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="submitAddForm(newAddForm)">保存</el-button>
				<el-button @click.native="newFormVisible = false">取消</el-button>
			</div>
		</el-dialog>
		
		
		<!-- 上传文件 -->
		<el-dialog title="项目资料归档" :visible.sync="uploadFormVisible">
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
	</section>
</template>

<script>
import { getProjectList, removeUser, addNewProject, searchProjectData, deleteProject, updateProject } from '@/api/project'
export default{
	data() {
		return {
			projectList:[],
			fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
			total: 0,
			page: 1,
			listLoading: false,
			sels: [],//列表选中列
			editFormVisible: false,//编辑界面是否显示
			lookFormVisible: false,
			newFormVisible: false,
			editLoading: false,
			uploadFormVisible: false,
			searchForm: {},
			newAddForm: {},
			//编辑界面数据
			editForm: {},
			titleMap: {
				addProject: "新建项目",
				editProject: "查看/编辑项目"
			},
			dialogStatus: ''
		}
	},
	mounted() {
		this.fetchProjectList()
	},
	methods: {
		handleCurrentChange(val) {
			this.page = val;
			this.fetchProjectList();
		},
		fetchProjectList() {
			let para = {
				page: this.page
			};
			this.listLoading = true;
			getProjectList(para).then((res) => {
				this.total = res.total;
				this.projectList = res.body;
				this.listLoading = false;
				console.log(res);
			})
		},
		selsChange: function (sels) {
			this.sels = sels;
		},
		// 新建项目
		handleAdd: function(){
			this.newAddForm = {
				id: '',
				name: "",
				area:"",
				assessment:"",
				status: '',
				allcount: '',
				notEnable: '',
				enable: '',
				checkCount:'',
				completePrice: "",
				notCompletePrice: "",
				registrar: "",
				type: "",
				remark:"",
				purpose:'',
				use:'',
				notice:'',
				overPrice:'',
				valueTime:'',
				isDiscount:'',
				discount:'',
				institutions:'',
				projectLeader:'',
				technicalLeader:'',
				assess:'',
				estateAppraiser: '',
				valuationPrincipal: ''
			};
			this.newFormVisible = true;
			// this.dialogStatus = "addProject";
			// this.editForm = Object.assign({});
		},
		// 查看
		handleLook: function(index, row){
			let para = row.id;
			searchProjectData(para).then((res) => {
				// this.listLoading = false;
				this.lookFormVisible = true;
				this.searchForm = res.body.houseAssessProject;
				console.log(res.body.houseAssessProject);
				// this.fetchProjectList();
			});
		},
		//删除
		handleDel: function (index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				//NProgress.start();
				let para = row.id;
				deleteProject(para).then((res) => {
					this.listLoading = false;
					//NProgress.done();
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.fetchProjectList();
				});
			}).catch(() => {
		
			});
		},
		handleUpload: function(index, row){
			this.uploadFormVisible = true;
		},
		//显示编辑界面
		handleEdit: function (index, row) {
			let para = row.id;
			searchProjectData(para).then((res) => {
				// this.listLoading = false;
				this.editFormVisible = true;
				this.editForm = res.body.houseAssessProject;
				console.log(res.body.houseAssessProject);
				// this.fetchProjectList();
			});
			// this.editFormVisible = true;
			// // this.dialogStatus = "editProject";
			// this.editForm = Object.assign({}, row);
			// console.log(this.editForm);
		},
		submitEditForm(editForm){
			this.$refs.editForm.validate((valid) => {
			  if (valid) {
				let para = {list: editForm};
				updateProject(para).then((res) => {
					// this.listLoading = false;
					this.editFormVisible = false;
					// this.editForm = res.data;
					console.log(res.msg);
					this.fetchProjectList();
					
				});
			  } else {
				console.log('error submit!!');
				return false;
			  }
			});
		},
		// 提交表单
		submitAddForm(newAddForm){
			console.log(newAddForm);
			let para = {list: newAddForm};
			addNewProject(para).then((res) => {
				this.newFormVisible = false;
				this.fetchProjectList();
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

<style scoped>
	.el-form-item{
		width: 50%;
		float: left;
	}
	.edit-input{
		width: 175px;
	}
	.fl{
		float: left;
	}
	/* 清理浮动 */
	.clearfix:before, .clearfix:after {
		content: "";
		display: table;
	}
	.clearfix:after {
		clear: both;
	}
	.clearfix {
		zoom: 1;
	}
	.handleBtn{
		color: #1890FF;
		font-size: 14px;
	}
<style>

