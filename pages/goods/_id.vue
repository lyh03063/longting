<template>
  <div>
    <page_head></page_head>
    <!-- <div class>objWxShare:{{objWxShare}}</div> -->
    <div class="main-box layout1200">
      <div class="box-res MB10">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <a href="/">首页</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>商品详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <goods_specs_front v-bind="cfGoodsSpecs"></goods_specs_front>

      <div class="case-box">
        <!-- doc:{{doc}} -->

        <el-row :gutter="2">
          <el-col :span="24" :sm="12">
            <div class="img-box MT10">
              <img :src="doc.imgSrc" class="image" />
            </div>
          </el-col>
          <el-col :span="24" :sm="12">
            <ul class="n-flex-ul">
              <li>
                <!-- <b>销售价：</b> -->
                <i class="FM4 C_f00">
                  ￥
                  <span class="FS20 FM4">{{getGoodsPrice(doc)}}</span>
                </i>
                <!-- .priceSell -->
              </li>
              <li>
                <!-- <b>市场价：</b> -->
                <div class="LH30 MR5">价格</div>
                <i class="price-market">￥{{doc.priceMarket}}</i>
              </li>
              <li>
                <div class="case-title">{{doc.title}}</div>
              </li>
              <!-- <li>
             
                <i class>
                  优惠
                  <el-tag type="danger" size="small">满1000减100元</el-tag>
                </i>
              </li>-->
              <li v-if="doc.deliveryDesc">
                <span class="C_f60 FS12" v-html="doc.deliveryDesc"></span>
              </li>
            </ul>
          </el-col>
        </el-row>
        <div class="case-detail doneDetailImg n-mobile-img-box" v-html="doc._detail"></div>
      </div>
    </div>

    <wx_user_bar></wx_user_bar>
    <!-- <page_foot></page_foot> -->
    <contact_right></contact_right>
  </div>
</template>
<script>
let T;
import page_head from "@/components/page_head.vue";
import page_foot from "@/components/page_foot.vue";
import contact_right from "@/components/contact_right.vue";
import wx_user_bar from "@/components/wx_user_bar.vue";
import axios from "axios";
import goods_specs_front from "@/components/bussiness/goods_specs_front.vue";

export default {
  mixins: [MIX.pageWXLogin, MIX.wx_js_sdk], //混入
  components: {
    page_head,
    contact_right,
    page_foot,
    wx_user_bar,
    goods_specs_front
  },

  async asyncData({ route, params }) {
    let { data } = await axios({
      //请求接口
      method: "post",
      withCredentials: true, //携带cookie aaa
      url: `${PUB.domain}/info/commonDetail`,
      data: {
        _id: params.id,
        _dataType: "goods",
        _systemId: PUB._systemId
      } //传递参数
    });
    let doc = data.doc;
    doc.imgSrc = lodash.get(doc, `album[0].url`);
    return { doc: doc };
  },
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head() {
    return {
      title: `${T.doc.title}-商品详情-深圳龙庭空调制冷有限公司`
    };
  },

  data() {
    return {
      //规格选择组件配置
      cfGoodsSpecs: {}
    };
  },
  computed: {},
  methods: {
    getGoodsPrice: FN.getGoodsPrice
  },
  beforeCreate() {
    T = this;
  },

  async created() {
    let { listSpecs, listSpecPrice } = T.doc;
    T.cfGoodsSpecs = {
      docGoods: T.doc,
      listSpecs,
      listSpecPrice
    };

    //设置微信分享数据
    T.objWxShare.title = T.doc.title;
    T.objWxShare.imgUrl = T.doc.imgSrc;
  },
  async mounted() {
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.main-box {
  padding: 10px 0;
}
.case-box {
  border: 1px solid #eeeeee;
  padding: 10px 20px;
}
.case-title {
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
}
.img-box {
  width: 500px;
  height: 390px;
}
/*屏幕宽度小于640px*/
@media screen and (max-width: 640px) {
  .img-box {
    width: 100%;
    height: auto;
  }
}
.image {
  width: 100%;
  height: 100%;
}
.case-detail >>> p {
  font-size: 16px;
  line-height: 20px;
  margin: 0;
  padding: 0;
}
.case-detail {
  margin: 10px 0;
}

.price-market {
  text-decoration: line-through;
}
</style>
