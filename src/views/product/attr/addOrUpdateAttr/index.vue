<template>
  <el-card class="container">
    <el-form inline :model="attr" :rules="rules">
      <el-form-item label="属性名" prop="attrName">
        <el-input placeholder="请输入属性名" v-model="attr.attrName"></el-input>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      icon="el-icon-plus"
      :disabled="!attr.attrName"
      @click="addAttrValue"
    >
      添加属性值
    </el-button>

    <el-table :data="attrValueList" border class="table">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column label="属性值名称" prop="valueName">
        <el-input
          size="mini"
          placeholder="请输入属性值名称"
          ref="input"
        ></el-input>
      </el-table-column>

      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-tooltip content="删除属性值" placement="top">
            <el-button size="mini" type="danger" icon="el-icon-delete">
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-button type="primary">确定</el-button>
    <el-button>取消</el-button>
  </el-card>
</template>

<script>
export default {
  name: "AddOrUpdateAttr",
  data() {
    return {
      attrValueList: [],
      attr: {
        attrName: "",
      },
      rules: {
        attrName: [
          {
            required: true,
            message: "请输入属性名",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 添加属性值
    addAttrValue() {
      this.attrValueList.push({});
      // 更新为异步的
      this.$nextTick(()=>{
        // 让input聚焦
      this.$refs.input.focus()
      })
    },
  },
};
</script>

<style scoped>
.table {
  margin: 10px 0;
}
</style>