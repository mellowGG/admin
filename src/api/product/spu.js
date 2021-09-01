import request from "@/utils/request";

// 获取spu列表
export function reqGetSpuList({ page, limit, category3Id }) {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: "GET",
    params: {
      category3Id
    }
  });
}
