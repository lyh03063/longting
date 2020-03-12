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

      <div class="out-box" v-if="wxUser">
        <div class="MB15 pannel TAC">
          <img class="n-head-img" :src="wxUser.headimgurl" alt />
          <div class="n-nickname">{{wxUser.nickname}}</div>
        </div>

        <div class="MB15 pannel">
          <!-- 订单列表{{listOrder}} -->
          <div class="C_999 LH50 TAC" v-if="listOrder&&listOrder.length==0">暂无订单</div>
          <ul class="n-flex-ul" v-if="listOrder">
            <li v-for="(item) in listOrder" :key="item._id">
              <b class="img-box">
                <el-link type="info" :href="`/order/${item.orderId}`">
                  <img :src="goods.imgSrc" alt v-for="(goods) in item.listGoods" :key="goods._id" />
                </el-link>
              </b>
              <i>
                <el-link type="info" :href="`/order/${item.orderId}`">
                  <p class>订单号：{{ item.orderId }}</p>
                  <p class>订单金额：{{ item.priceOrder }}元</p>
                  <p class>状态：{{ $lodash.get(DICT, `payStatus.${item.payStatus}.label`) }}</p>
                </el-link>
              </i>
            </li>
          </ul>
        </div>
      </div>
      <div class="LH50 TAC C_999" v-else>微信登录中...</div>

      <!-- <div class="" >msg: {{msg}}</div> -->
      


      <!-- listOrder: {{listOrder}}
      <br /> -->
      <!-- <div class="" >wxUser: {{wxUser}}</div> -->
 
      <br />
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
  mixins: [MIX.pageWXLogin], //混入
  components: { page_head, contact_right, page_foot, pannel },
  async asyncData({ route, params }) {},
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head() {
    return {
      title: `会员中心-深圳龙庭空调制冷有限公司`
    };
  },
  data() {
    return {
      DICT:global.DYDICT,
      listOrder: null,
      msg: ""
    };
  },
 
  methods: {
    async ajaxOrderList() {
      T.msg += `-->ajaxOrderList`;
      T.msg += `-->${T.wxUser.openid}`;
      if (!T.wxUser.openid) return;
      //ajax获取订单列表
      let {
        data: { list }
      } = await axios({
        method: "post",
        url: `${PUB.domain}/info/getCommonList`,
        data: {
          // pageIndex: 1,
          pageSize: 100,
          _dataType: "order",
          _systemId: PUB._systemId,
          findJson: { openid: T.wxUser.openid }
        }
      });
      T.listOrder = list;
      T.msg += `-->ajax结束`;
    }
  },
  beforeCreate() {
    T = this;
  },
  mounted() {
    T.msg += `-->mounted`;

    try {
      T.ajaxOrderList();
    } catch (err) {
      T.msg += `-->catch：${err.toString()}`;
    }
  }
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
  width: 70px;
}
.img-box img {
  width: 60px;
  height: 60px;
}
</style>
