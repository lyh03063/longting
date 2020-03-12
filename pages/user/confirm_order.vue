<template>
  <div>
    <page_head></page_head>
    <div class="main-box layout1200">
      <div class="out-box PT10">
        <!-- {{formData}} -->
        <!-- type:{{type}} -->
        <van-panel title="订单商品" v-if="type=='direct_buy'&&orderData">
          <ul class="n-flex-ul MB10 BC_fff PL10 PR10">
            <li v-for="(item) in orderData.listGoods" :key="item._id+item.idSpecChain">
              <b class="img-box">
                <el-link type="primary" :href="`/goods/${item._id}`">
                  <img :src="item.imgSrc" alt />
                </el-link>
              </b>
              <i>
                <p class="MB6">{{ item.title }}</p>
                <p class="MB6">规格：{{ item.nameSpecChain }}</p>
                <p class="MB6">
                  <el-input-number
                    @change="changeCount(item)"
                    v-model="item.count"
                    :min="1"
                    :max="999"
                    label="描述文字"
                    size="mini"
                  ></el-input-number>
                </p>

                <div class="DPF">
                  <div class="FX1">
                    <span class="FM4">￥{{ item.priceSell }}</span> &nbsp;
                    商品总额：
                    <span class="FM4 C_f30">￥{{ item.priceTotal }}</span>
                  </div>
                </div>
              </i>
            </li>
          </ul>
        </van-panel>

        <van-panel class title="填写收货地址及备注" v-if="ready">
          <div class="PL10 PR10">
            <ul class="n-flex-ul">
              <li>
                <!-- <b>地区选择：</b> -->
                <i>
                  <select_area
                    v-model="formData.arrArea"
                    value-type="arrObj"
                    :op-level1="arrLevel1"
                  ></select_area>
                </i>
              </li>
              <li>
                <!-- <b>详细地址：</b> -->
                <i>
                  <el-input placeholder="手机号" v-model="formData.phone"></el-input>
                </i>
              </li>
              <li>
                <!-- <b>详细地址：</b> -->
                <i>
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入详细地址"
                    v-model="formData.addressDetail"
                  ></el-input>
                </i>
              </li>
              <li>
                <!-- <b>备注：</b> -->
                <i>
                  <el-input type="textarea" :rows="3" placeholder="订单备注" v-model="formData.remark"></el-input>
                </i>
              </li>
            </ul>
            <div class="TAC PT10 PB10">
              <el-button type="primary" :loading="isLoadingPay" v-if="isLoadingPay">请求支付中</el-button>
              <!-- <el-button type="primary" @click="callWxPay" v-else>提交订单</el-button> -->
              <van-button type="info" size="large" @click="callWxPay" v-else>提交订单</van-button>
            </div>
          </div>
        </van-panel>
      </div>
      <!-- <wx_user_bar></wx_user_bar> -->
      <!-- <div class>微信支付结果：{{resWXPay}}</div> -->
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
import wx_user_bar from "@/components/wx_user_bar.vue";
import select_area from "@/components/form_item/select_area.vue";
import axios from "axios";
let T;
export default {
  mixins: [MIX.pageWXLogin], //混入
  components: {
    page_head,
    contact_right,
    page_foot,
    pannel,
    wx_user_bar,
    select_area
  },

  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head() {
    return {
      title: `确认订单-深圳龙庭空调制冷有限公司`
    };
  },
  async asyncData({ route, params }) {
    return { type: route.query.type };
  },
  data() {
    return {
      orderData: null,
      isLoadingPay: false,
      ready: false,
      arrLevel1: [
        {
          value: "44",
          label: "广东"
        }
      ],
      resWXPay: { msg: "未支付123" }, //微信支付的响应结果
      formData: {
        arrArea: null
      }
    };
  },
  methods: {
    //函数：{购买数量变化函数}
    changeCount: function(item) {
      item.priceTotal = item.priceSell * item.count; //更新总价
      item.priceTotal = util.money(item.priceTotal);
      let orderData = util.getLocalStorageObj("orderData"); //调用：{从LocalStorage获取一个对象的函数}

      orderData.priceTotal = item.priceTotal;
      orderData.priceOrder = item.priceTotal;
      orderData.listGoods = T.orderData.listGoods;

      util.setLocalStorageObj("orderData", orderData); //调用：{设置一个对象到LocalStorage}
    },
    //函数：{ajax下订单函数}
    async ajaxOrder() {
      let orderData = util.getLocalStorageObj("orderData"); //调用：{从LocalStorage获取一个对象的函数}
      let param = { ...orderData, ...T.formData }; //合并参数
      util.setLocalStorageObj("orderData", param); //调用：{设置一个对象到LocalStorage}
      //地址对象拼接
      param.addressObj = {
        arrArea: T.formData.arrArea,
        detail: T.formData.addressDetail
      };

      param.openid = lodash.get(T.wxUser, `openid`);
      //请求接口
      let { data } = await axios({
        withCredentials: true, //携带cookie
        method: "post",
        url: `${PUB.domain}/api_third_part/order_wx_longting`,
        data: param
      });
      return data;
    },
    //函数：{表单校验函数}
    valid: function(xxx) {
      let isOk = true;
      let error;
      if (!T.formData.arrArea) {
        isOk = false;
        error = "请填写收货地址";
      } else if (!T.formData.phone) {
        isOk = false;
        error = "请填写手机";
      } else if (!T.formData.addressDetail) {
        isOk = false;
        error = "请填写详细地址";
      }
      return { isOk, error };
    },
    //函数：{调用微信内支付组件}
    async callWxPay() {
      let { isOk, error } = T.valid();
      if (!isOk) {
        return T.$$msg({ type: "error", message: error });
      }
      T.isLoadingPay = true;

      let orderData = util.getLocalStorageObj("orderData"); //调用：{从LocalStorage获取一个对象的函数}
      let param = { ...orderData, ...T.formData }; //合并参数
      util.setLocalStorageObj("orderData", param); //调用：{设置一个对象到LocalStorage}
      //地址对象拼接
      param.addressObj = {
        arrArea: T.formData.arrArea,
        detail: T.formData.addressDetail
      };

      param.openid = lodash.get(T.wxUser, `openid`);
      //***
      let { code, resWX, message, docOrder } = await FN.$payWxOrder({ param }); //调用：{支付微信订单函数}
      T.resWXPay = resWX;
      if (code == 0) {
        T.$$msg({ type: "success", message: message });
      } else {
        T.$$msg({ type: "error", message: message });
      }
      // return;

      T.isLoadingPay = false;
      FN.clearCartCache(); //调用：{清空购物车缓存数据函数}
      await util.timeout(500); //延迟
      window.location.href = `/order/${docOrder.orderId}`;
    }
  },
  beforeCreate() {
    T = this;
  },
  mounted() {
    T.orderData = util.getLocalStorageObj("orderData"); //调用：{从LocalStorage获取一个对象的函数}

    let { arrArea, addressDetail, remark, phone } = T.orderData;
    T.formData = { arrArea, addressDetail, remark, phone };
    T.ready = true;
  }
};
</script>

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
