import request from "@/utils/request";

// 获取属性列表
export function reqGetAttrkList({ category1Id, category2Id, category3Id }) {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "GET"
  });
}
