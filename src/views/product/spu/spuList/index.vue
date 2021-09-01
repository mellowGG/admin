<template>
  <el-card class="container">
    <el-button
      type="primary"
      icon="el-icon-plus"
      class="el-btn"
      :disabled="!category3Id"
    >
      添加SPU
    </el-button>

    <el-table :data="spuList" border>
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="spuName" label="SPU名称"></el-table-column>
      <el-table-column prop="description" label="SPU描述" > </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-tooltip content="添加SKU" placement="top">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-plus"
            >
            </el-button>
          </el-tooltip>

          <el-tooltip content="修改SPU" placement="top">
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-edit"
            >
            </el-button>
          </el-tooltip>

          <el-tooltip content="查看SKU列表" placement="top">
            <el-button
              size="mini"
              type="info"
              icon="el-icon-info"
            >
            </el-button>
          </el-tooltip>

          <el-popconfirm
            icon="el-icon-info"
            icon-color="red"
            title="确定删除吗？"
          >
            <el-tooltip
              class="el-tool"
              content="删除SPU"
              placement="top"
              slot="reference"
            >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
              >
              </el-button>
            </el-tooltip>
          </el-popconfirm>
        </template>
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
  </el-card>
</template>

<script>
import { mapState } from "vuex";
import { reqGetSpuList } from "@/api/product/spu";
export default {
  name: "SpuList",
  data() {
    return {
      spuList: [],
      // 每页条数
      currentPage: 1,
      // 当前页
      pageSize: 3,
      // 总数
      total: 0,
    };
  },
  computed: {
    ...mapState("category", ["category3Id"]),
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getSpuList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getSpuList();
    },
    // 获取spu列表
    async getSpuList() {
      const { category3Id, currentPage, pageSize } = this;
      const res = await reqGetSpuList({
        category3Id,
        page: currentPage,
        limit: pageSize,
      });
      this.spuList = res.records;
      this.total = res.total;
    },
  },
  watch: {
    category3Id: {
      handler(category3Id) {
        if (!category3Id) {
          // 重置数据
          this.spuList = [];
          this.total = 0;
          this.currentPage = 1;
          this.pageSize = 3;
          return;
        }
        this.getSpuList();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.attr-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
.el-tool {
  margin-left: 10px;
}
</style>