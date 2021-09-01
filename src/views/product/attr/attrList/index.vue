<template>
  <el-card class="container">
    <el-button
      type="primary"
      icon="el-icon-plus"
      class="el-btn"
      :disabled="!category3Id"
      @click="$emit('updateIsShowAttrList', false)"
    >
      添加属性
    </el-button>

    <el-table :data="attrList" border>
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="attrName" label="属性名"></el-table-column>
      <el-table-column label="属性值列表" prop="attrValueList">
        <template v-slot="{ row }">
          <el-tag
            class="attr-tag"
            v-for="attrValue in row.attrValueList"
            :key="attrValue.id"
          >
            {{ attrValue.valueName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-tooltip content="修改属性" placement="top">
            <el-button class="el-btn" size="mini" type="warning" icon="el-icon-edit">
            </el-button>
          </el-tooltip>
          <el-popconfirm
            icon="el-icon-info"
            icon-color="red"
            title="确定删除吗？"
            @onConfirm="delAttr(row.id)"
          >
            <el-tooltip content="删除属性" placement="top" slot="reference">
              <el-button class="el-btn" size="mini" type="danger" icon="el-icon-delete">
              </el-button>
            </el-tooltip>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { mapState } from "vuex";

import { reqGetAttrList, reqDelAttr } from "@/api/product/attr";

export default {
  name: "AttrList",
  data() {
    return {
      attrList: [],
    };
  },

  computed: {
    ...mapState("category", ["category1Id", "category2Id", "category3Id"]),
  },
  methods: {
    // 删除属性
    async delAttr(id) {
      await reqDelAttr(id);

      this.$message({
        type: "success",
        message: "删除成功~",
      });

      this.getAttrList(this.category3Id);
    },
    // 获取属性列表
    async getAttrList(category3Id) {
      // 如果没有3Id，不发送请求
      if (!category3Id) return;
      const { category1Id, category2Id } = this;
      const attrList = await reqGetAttrList({
        category1Id,
        category2Id,
        category3Id,
      });
      this.attrList = attrList;
    },
  },
  watch: {
    category3Id: {
      handler: "getAttrList",
      immediate: true,
    },
  },
};
</script>

<style scoped>
.el-btn {
  margin-bottom: 20px;
  margin-right: 10px;
}
.attr-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>