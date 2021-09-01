<template>
  <el-card class="container">
    <el-form inline :model="attr" :rules="rules" ref="form">
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
        <template v-slot="{ row, $index }">
          <el-input
            size="mini"
            placeholder="请输入属性值名称"
            :ref="$index"
            v-model="attr.valueName"
            @blur="setAttrValue(row, $index)"
            v-show="row.isEdit"
            @keyup.enter.native="$event.target.blur()"
          ></el-input>
          <span
            class="isEditText"
            v-show="!row.isEdit"
            @click="showEdit(row, $index)"
            >{{ row.valueName }}</span
          >
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template v-slot="{ $index }">
          <el-popconfirm
            icon="el-icon-info"
            icon-color="red"
            title="确定删除吗？"
            @onConfirm="delAttrValue($index)"
          >
            <el-tooltip content="删除属性值" placement="top" slot="reference">
              <el-button size="mini" type="danger" icon="el-icon-delete">
              </el-button>
            </el-tooltip>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-button type="primary" @click="addAttr">确定</el-button>
    <el-button @click="cancel">取消</el-button>
  </el-card>
</template>

<script>
import { mapState } from "vuex";
import { reqSaveAttr } from "@/api/product/attr";
export default {
  name: "AddOrUpdateAttr",
  data() {
    return {
      attrValueList: [],
      attr: {
        attrName: "",
        valueName: "",
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
  computed: {
    ...mapState("category", ["category3Id"]),
  },
  methods: {
    // 添加属性值
    addAttrValue() {
      this.attrValueList.push({
        // 属性值
        valueName: "",
        // 是否是编辑模式
        isEdit: true,
      });
      // 更新为异步的
      this.$nextTick(() => {
        // 让input聚焦
        this.$refs[this.attrValueList.length - 1].focus();
      });
    },
    // 设置属性值 编辑到显示
    setAttrValue(row, index) {
      const { valueName } = this.attr;
      if (!valueName) {
        this.attrValueList.splice(index, 1);
        return;
      }
      // this.attrValueList[index].valueName = this.attr.valueName;
      row.valueName = valueName;
      // this.$set(row, "valueName", this.attr.valueName);
      // 切换回显示模式
      row.isEdit = false;
      // 临时数据为空
      this.attr.valueName = "";
    },
    // 显示到编辑
    showEdit(row, index) {
      row.isEdit = true;

      this.attr.valueName = row.valueName;
      this.$nextTick(() => {
        // 让input聚焦
        this.$refs[index].focus();
      });
    },
    // 删除属性值
    delAttrValue(index) {
      this.attrValueList.splice(index, 1);
    },
    // 添加属性
    async addAttr() {
      const {
        attrValueList,
        attr: { attrName },
      } = this;
      // 判断是否由属性名
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        // 判断至少有一个属性值
        if (!attrValueList.length) {
          this.$message({
            type: "error",
            message: "请添加至少一个属性值",
          });
          return;
        }
        // 都有才添加
        const attr = {
          attrName: attrName,
          attrValueList: attrValueList,
          categoryId: this.category3Id,
          categoryLevel: 3,
        };

        await reqSaveAttr(attr);
        this.cancel();
      });
    },
    //
    cancel() {
      // 清空数据
      this.attrValueList = [];
      this.attr = {
        attrName: "",
        valueName: "",
      };
      // 去上个页面
      this.$emit("updateIsShowAttrList", true);
    },
  },
};
</script>

<style scoped>
.table {
  margin: 10px 0;
}
.isEditText {
  display: block;
}
</style>