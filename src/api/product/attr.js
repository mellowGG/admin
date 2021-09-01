import request from "@/utils/request";

// 获取属性列表
export function reqGetAttrkList({ category1Id, category2Id, category3Id }) {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "GET"
  });
}

// 添加属性
export function reqSaveAttr(data) {
  return request({
    url: `/admin/product/saveAttrInfo`,
    method: "POST",
    data
  });
}
