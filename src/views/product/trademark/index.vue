<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button style="float: left" type="primary" icon="el-icon-plus"
        >添加</el-button
      >
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="name" label="品牌名称"> </el-table-column>
      <el-table-column label="品牌LOGO"> </el-table-column>
      <el-table-column label="操作">
        <el-button type="warning" icon="el-icon-edit">修改</el-button>
        <el-button type="danger" icon="el-icon-delete">删除</el-button>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination> -->
    <el-pagination
      :page-sizes="[3, 6, 9, 12]"
      layout=" prev, pager, next, jumper,sizes,total"
      :total="50"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: "Trademark",
  data() {
    return {
      tableData: [
        {
          name: "小米",
        },
      ],
    };
  },
};
</script>

<style>
</style>