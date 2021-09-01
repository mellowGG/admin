<template>
  <div>
    <CategorySelector :disabled="!isShowAttrList" />
    <AttrList
      v-if="isShowAttrList"
      @updateIsShowAttrList="updateIsShowAttrList"
    />
    <AddOrUpdateAttr
      v-if="!isShowAttrList"
      @updateIsShowAttrList="updateIsShowAttrList"
    />
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
      isShowAttrList: true,
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