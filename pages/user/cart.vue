<template>
  <div>
    <page_head></page_head>
    <div class="main-box layout1200">
      <div>
        <div class="PL10 PR10">
          <div class="TAC PT10 PB10 FS16 FWB">购物车</div>

          <ul class="n-flex-ul MB10" v-if="hasGoods">
            <li v-for="(item,index) in objGoodsCart.listGoods" :key="item._id+item.idSpecChain">
              <b class="img-box">
                <el-link type="primary" :href="`/goods/${item._id}`">
                  <img :src="item.imgSrc" alt />
                </el-link>
              </b>
              <i>
                <p class="MB6">
                  {{ item.title }}
                 
                </p>
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
                <div class="FX1" >
                
               <span class="FM4">￥{{ item.priceSell }}</span> &nbsp;
                小计：<span class="FM4 C_f30">￥{{ item.priceTotal }}</span></div>
                


                 <a
                    class="W40  FS12 n-a"
                    href="javascript:;"
                    @click="removeGoods(index)"
                  >移除</a>
                 
                </div>
              </i>
            </li>
          </ul>
          <div class="H50 TAC C_999 LH50" v-else-if="!ready">数据加载中...</div>
          <div class="H50 TAC C_999 LH50" v-else>购物车空空如也</div>
        </div>
        <div class="DPF n-bottom-bar">
          <div class="LH40" style="flex:1">
            合计：
            ￥<span class="C_f30 B FS18">{{objGoodsCart.priceTotal}}</span>
          </div>

          <div class>
            <el-button type="primary" :disabled="!hasGoods" @click="goSettlement">去结算</el-button>
            <el-button plain @click="clearCart" size="mini">清空</el-button>
            <!-- <el-button plain @click="initCart" size="mini">刷新</el-button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let T;
let { PUB, lodash, util } = global; //从global中提取常用变量
import pannel from "@/components/pannel.vue";
import page_head from "@/components/page_head.vue";
import page_foot from "@/components/page_foot.vue";
import axios from "axios";
export default {
  mixins: [MIX.pageWXLogin], //混入
  components: {
    page_head,
    page_foot,
    pannel
  },

  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head() {
    return {
      title: `购物车-深圳龙庭空调制冷有限公司`
    };
  },
  data() {
    return {
      ready: false,
      objGoodsCart: {},
      listGoods: []
    };
  },
  computed: {
    hasGoods() {
      return util.isNotEmptyArr(T.objGoodsCart.listGoods);
    }
  },

  methods: {
    //函数：{删除商品函数}
    removeGoods: async function(index) {
      let clickStatus = await T.$$confirm("确定删除该商品？");
      // let clickStatus = await T.$confirm("确定删除该商品？").catch(() => {});
      if (clickStatus == "confirm") {
        T.objGoodsCart.listGoods.splice(index, 1);
        T.updateCart(); //调用：{更新购物车数据函数}
        //如果点击了确定
        T.$$msg({ type: "success", message: "删除成功" });
      }
    },
    //函数：{购买数量变化函数}
    changeCount: function(item) {
      item.priceTotal = item.priceSell * item.count; //更新总价
      item.priceTotal= util.money(item.priceTotal)
      T.updateCart(); //调用：{更新购物车数据函数}
    },
    //函数：{清空购物车函数}
    clearCart: async function() {
      let clickStatus = await T.$$confirm("确定清空购物车？");
      if (clickStatus == "confirm") {
        FN.clearCartCache(); //调用：{清空购物车缓存数据函数}
        T.$$msg({ type: "success", message: "删除成功" });
        T.initCart(); //调用：{初始化购物车函数}
      }
    },
    //函数：{去结算按钮触发函数}
    goSettlement: function(xxx) {
      // alert("goSettlement");
      //localStorage.objGoodsCart的数据传入到localStorage.orderData中
      //进入确认订单页

      let orderData = util.getLocalStorageObj("orderData") || {};

      Object.assign(orderData, {
        priceOrder: T.objGoodsCart.priceTotal,
        listGoods: T.objGoodsCart.listGoods
      }); //合并对象

      console.log("orderData:####", orderData);

      util.setLocalStorageObj("orderData", orderData); //调用：{设置一个对象到LocalStorage}

      window.location.href = `/user/confirm_order`;
    },
    //函数：{更新购物车数据函数}
    updateCart: function() {
      //reduce求和，指定初始n值为0
      let priceTotal = T.objGoodsCart.listGoods.reduce(
        (n, doc) => n + (doc["priceTotal"] || 0),
        0
      );
     priceTotal= util.money(priceTotal)

      T.$set(T.objGoodsCart, "priceTotal", priceTotal);
      util.setLocalStorageObj("objGoodsCart", T.objGoodsCart); //调用：{设置一个对象到LocalStorage}
    },
    //函数：{初始化购物车函数}
    initCart: function(xxx) {
      //调用：{从LocalStorage获取一个对象的函数}
      let objGoodsCart = util.getLocalStorageObj("objGoodsCart");
      objGoodsCart = objGoodsCart || { listGoods: [] };

      T.objGoodsCart = objGoodsCart;
      T.updateCart(); //调用：{更新购物车数据函数}
      T.ready = true;
    }
  },

  beforeCreate() {
    T = this;
  },
  mounted() {
    T.initCart(); //调用：{initCart}
  }
};
</script>

<style scoped>
.img-box {
  width: 110px;
}
.img-box img {
  width: 100px;
  height: 100px;
}

.n-flex-ul li {
  border-bottom: 1px solid #ddd;
}
</style>
