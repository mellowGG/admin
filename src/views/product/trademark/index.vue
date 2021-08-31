<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button style="float: left" type="primary" icon="el-icon-plus" @click="showSaveTrademark"
        >添加</el-button
      >
    </div>

    <el-table :data="trademarkList" border style="width: 100%" >
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称"></el-table-column>
      <el-table-column label="品牌LOGO" prop="logoURL">
        <template v-slot="{row}">
          <img class="trademarkList-img" :src="row.logoUrl" :alt="row.tmName">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="warning" icon="el-icon-edit">修改</el-button>
        <el-button type="danger" icon="el-icon-delete">删除</el-button>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="currentPage"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="pageSize"
      layout="prev, pager, next, jumper, total, sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </el-pagination>


    <el-dialog
      title="修改品牌"
      :visible.sync="visible"
    >
      <!-- body -->
      <el-form ref="form" :model="trademark" :rules="rules" label-width="100px">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="trademark.tmName" />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <!--
            图片上传组件
          -->
          <el-upload
            class="avatar-uploader"
            :action="`${baseAPI}/admin/product/fileUpload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            accept="image/jpeg,image/png"
          >
            <img
              v-if="trademark.logoUrl"
              :src="trademark.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- footer -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible= false">取 消</el-button>
        <el-button type="primary" @click="addTrademark">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { reqGetTrademarkList ,reqSaveTrademark} from "@/api/product/tardemark";
export default {
  name: "Trademark",
  data() {
    return {
      // 每页条数
      currentPage: 1,
      // 当前页
      pageSize: 3,
      // 总数
      total: 100,
      // 品牌管理列表
      trademarkList: [],
      // 添加属性框隐藏
      visible: false,
      // 品牌数据
      trademark: {
        tmName: "",
        logoUrl: "",
      },
      baseAPI: process.env.VUE_APP_BASE_API,
      // 表单验证规则
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
        ],
        logoUrl: [{ required: true, message: "请上传品牌LOGO" ,trigger: "change"}],
      },
    };
  },
  mounted() {
    //   // const res = await reqGetTrademarkList(this.currentPage, this.pageSize);
    //   // this.trademarkList = res.records;
    //   // this.total = res.total;
    this.getTrademarkList(this.currentPage, this.pageSize);
  },
  methods: {
    async getTrademarkList(currentPage, pageSize) {
      const res = await reqGetTrademarkList(currentPage, pageSize);
      this.trademarkList = res.records;
      this.total = res.total;
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getTrademarkList(this.currentPage, pageSize);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getTrademarkList(currentPage, this.pageSize);
    },
    // 上传成功触发的回调
    handleAvatarSuccess(res) {
      this.trademark.logoUrl = res.data;
      // 清空图片的表单验证效果
      this.$refs.form.clearValidate(['logoUrl'])
    },
    // 上传之前触发的回调
    beforeAvatarUpload(file) {
      const validFileType = ["image/jpeg", "image/jpg", "image/png"];
      const isValidFileType = validFileType.indexOf(file.type) > -1;
      const isLt = file.size / 1024 < 500;

      if (!isValidFileType) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt) {
        this.$message.error("上传头像图片大小不能超过 500KB!");
      }
      return isValidFileType && isLt;
    },
    // 添加品牌
    addTrademark(){
      this.$refs.form.validate(async(valid)=>{
        if(valid){
          const {tmName, logoUrl} =this.trademark
          await reqSaveTrademark(tmName, logoUrl)
          this.$message({
            type:'success',
            message:"添加成功"
          })
          this.getTrademarkList(this.currentPage, pageSize);
          this.visible=false
        }
      })
    },
    // 显示添加品牌
    showSaveTrademark(){
      this.visible=true
      this.$refs.form.resetFields()
    }
  },
};
</script>

<style scoped lang="sass">
.trademarkList-img
  width: 120px
  height: 100px

.avatar-uploader .el-upload

  border-radius: 6px
  cursor: pointer
  position: relative
  overflow: hidden

  .avatar-uploader-icon
    border: #d9d9d9 1px dashed
    font-size: 28px
    color: #8c939d
    width: 178px
    height: 178px
    line-height: 178px
    text-align: center
    &:hover
      border-color: #409EFF

  .avatar
    width: 178px
    height: 178px
    display: block
</style>