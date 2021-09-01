<template>
  <div>
    <CategorySelector :disabled="!isShowAttrList" />
    <AttrList
      v-show="isShowAttrList"
      @updateIsShowAttrList="updateIsShowAttrList"
    />
    <AddOrUpdateAttr v-show="!isShowAttrList" />
  </div>
</template>

<script>
import AttrList from "./attrList";
import AddOrUpdateAttr from "./addOrUpdateAttr";
import CategorySelector from "@/components/CategorySelector";

export default {
  name: "Attr",
  data() {
    return {
      isShowAttrList: false,
    };
  },
  methods: {
    updateIsShowAttrList(isShowAttrList) {
      this.isShowAttrList = isShowAttrList;
    },
  },
  components: {
    CategorySelector,
    AttrList,
    AddOrUpdateAttr,
  },
};
</script>

<style scoped>
</style>