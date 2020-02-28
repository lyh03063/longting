<template>
  <div>
    <page_head></page_head>
    <div class="main-box layout1200">
      <div class="box-res MB10">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <a href="/">首页</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>会员中心</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="out-box">
        <div class="MB15 pannel">头像，昵称</div>

        <div class="MB15 pannel">
          订单列表{{listOrder}}
          <ul class="n-flex-ul" v-if="listOrder">
            <li v-for="(item) in listOrder" :key="item._id">
              <b class="img-box">
                <el-link type="primary" :href="`/order/${item.orderId}`">
                  <img
                    :src="goods.imgSrc"
                    alt
                    v-for="(goods) in listOrder.listGoods"
                    :key="goods._id"
                  />
                </el-link>
              </b>
              <i>
                <el-link type="primary" :href="`/order/${item.orderId}`">
                  <p class>订单号：{{ item.orderId }}</p>
                  <p class>订单金额：{{ item.priceOrder }}元</p>
                </el-link>
              </i>
            </li>
          </ul>
        </div>
      </div>
      <!-- doc:{{doc}} -->
    </div>
  </div>
</template>

<script>
let { PUB, lodash, util } = global; //从global中提取常用变量
import pannel from "@/components/pannel.vue";
import page_head from "@/components/page_head.vue";
import page_foot from "@/components/page_foot.vue";
import contact_right from "@/components/contact_right.vue";
import axios from "axios";
let T;
export default {
  components: { page_head, contact_right, page_foot, pannel },
  async asyncData({ route, params }) {
    //ajax获取分类列表

    return { listOrder: {} };
  },
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head() {
    return {
      title: `订单详情-深圳龙庭空调制冷有限公司`
    };
  },
  data() {
    return {
      aaaa: ""
    };
  },
  beforeCreate() {
    T = this;
  },
  methods: {},
  mounted() {}
};
</script>
<style >
body {
  background: #f0f0f0;
}
</style>
<style scoped>
body {
  background: #f0f0f0;
}
.main-box {
  padding: 10px 0;
}
.out-box {
  background: #f0f0f0;
}
.pannel {
  background: #ffffff;
  padding: 8px 10px;
}
.img-box {
  width: 110px;
}
.img-box img {
  width: 100px;
  height: 100px;
}
</style>
