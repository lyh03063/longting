<template>
  <div>
    <page_head></page_head>
    <div class="main-box layout1200">
      <div class="box-res MB10">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <a href="/">首页</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="out-box">
        <div class="MB15 pannel">订单状态：{{doc.payStatus_text}}</div>
        <div class="MB15 pannel">
          收货地址：{{doc.address}}
        
        </div>
        <div class="MB15 pannel">
          商品列表
          <ul class="n-flex-ul" v-if="doc&&doc.listGoods">
            <li v-for="(item) in doc.listGoods" :key="item._id">
              <b class="img-box">
                <el-link type="primary" :href="`/goods/${item._id}`">
                  <img :src="item.imgSrc" alt />
                </el-link>
              </b>
              <i>
                <p class>{{ item.title }}</p>
                <p class>单价：￥{{ item.priceSell }} ×{{ item.count }}</p>
                <p class>小计：￥{{ item.priceTotal }}</p>
                <p class="FS12 " v-if="item.deliveryDesc" v-html="item.deliveryDesc"></p>
              </i>
            </li>
          </ul>
        </div>
        <div class="MB15 pannel">
          <ul class="n-flex-ul">
            <li>
              <b>订单号：</b>
              <i>{{doc.orderId}}</i>
            </li>
            <li>
              <b>下单时间：</b>
              <i>{{$moment(doc.timeOrder).format("YYYY-MM-DD HH:mm")}}</i>
            </li>
            <li>
              <b>支付时间：</b>
              <i>{{$moment(doc.timeOrder).format("YYYY-MM-DD HH:mm")}}</i>
            </li>
            <li>
              <b>支付方式：</b>
              <i>微信支付</i>
            </li>
            <li>
              <b>备注</b>
              <i>{{doc.remark}}</i>
            </li>
          </ul>
        </div>
        <div class="MB15 pannel">
           {{doc.payStatus==2?"实付款":"待付款"}}：
          <b class="C_f30">{{doc.priceOrder}}</b>元
        </div>
        <div class="MB15 pannel">
          <el-button type="primary" @click="continuePay" v-if="doc.payStatus==1">继续付款</el-button>
          <div class v-if="doc.payStatus==2">下单成功，等待上门服务</div>
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
  mixins: [MIX.pageWXLogin], //混入
  components: { page_head, contact_right, page_foot, pannel },
  async asyncData({ route, params }) {
    let { data } = await axios({
      //请求接口
      method: "post",
      withCredentials: true, //携带cookie aaa
      url: `${PUB.domain}/info/commonDetail`,
      data: {
        // _id: params.id,
        _dataType: "order",
        _systemId: PUB._systemId,
        findJson: {
          orderId: params.id
        }
      } //传递参数
    });
    let doc = data.doc;

    doc.payStatus_text = lodash.get(
      global.DYDICT,
      `payStatus.${doc.payStatus}.label`
    );

    doc.address = FN.joinAddressStr(doc.addressObj); //调用：{拼接地址字符串函数}
    console.log("doc.payStatus_text:", doc.payStatus_text);

    return { doc: doc };
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
  computed: {},
  methods: {
    //函数：{继续支付订单函数}
    continuePay: async function(xxx) {
      let param = { orderId: T.doc.orderId }; //参数
      param.openid = lodash.get(T.wxUser, `openid`);

      let { code, resWX, message, docOrder } = await FN.$payWxOrder({ param }); //调用：{支付微信订单函数}
      if (code == 0) {
        T.$$msg({ type: "success", message });
        window.location.reload(); //函数调用：{重载页面}
      } else {
        T.$$msg({ type: "error", message });
      }

      return xxx;
    }
  },
  beforeCreate() {
    T = this;
  },
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
