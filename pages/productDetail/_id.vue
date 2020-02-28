<template>
  <div>
    <page_head></page_head>
    <div class="main-box layout1200">
      <div class="box-res MB10">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <a href="/">首页</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>产品详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="product-box">
        <div class="box-res-flex">
          <div class="img-box">
            <img :src="productDetail.album" class="image" />
          </div>
          <div class="product-detail">
            <div class="product-title">{{productDetail.name}}-{{productDetail.model}}</div>
            <div class="detail-box">
              <div>类别：{{categoryName}}</div>
              <div>型号：{{productDetail.model}}</div>
              <div>品牌：{{productDetail.brand}}</div>
              <div>简介：{{productDetail.description}}</div>
            </div>
          </div>
        </div>

        <p class="H10 OF2 CL1"></p>
        <pannel class title="产品详情">
          <div class="MT10" v-html="productDetail.detail"></div>
        </pannel>
      </div>
    </div>
    <page_foot></page_foot>
    <contact_right></contact_right>
  </div>
</template>

<script>
import pannel from "@/components/pannel.vue";
import page_head from "@/components/page_head.vue";
import page_foot from "@/components/page_foot.vue";
import contact_right from "@/components/contact_right.vue";
import axios from "axios";
let T;
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  components: { page_head, contact_right, page_foot, pannel },
  async asyncData({ route, params }) {
    let productData = await axios({
      method: "post",
      url: `${global.PUB.domain}/crossDetail?page=longting_product`,
      data: {
        id: params.id
      }
    }).catch(() => {});
    let categoryData = await axios({
      method: "post",
      url: `${global.PUB.domain}/crossList?page=longting_product_category`,
      data: {
        pageSize: 100,
        sortJson: { P1: 1 }
      }
    });
    return {
      productDetail: productData.data.Doc,
      categoryList: categoryData.data.list
    };
  },
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head() {
    return {
      title: `${T.productDetail.name}-${T.productDetail.model}-产品详情-深圳龙庭空调制冷有限公司`
      // meta: [{ hid: "description", name: "nesw1", content: "" }]
    };
  },
  data() {
    return {
      categoryName: ""
    };
  },
  methods: {},
  beforeCreate() {
    T = this;
  },
  mounted() {
    T.categoryList.forEach(item => {
      if (item.P1 == T.productDetail.categoryId) {
        T.categoryName = item.name;
      }
    });
  }
};
</script>

<style scoped>
.main-box {
  padding: 10px 0;
}
.product-box {
  border: 1px solid #eeeeee;
  padding: 40px;
}
.img-box {
  width: 450px;

  margin-right: 30px;
}
.product-detail {
  width: 60%;
}
.image {
  width: 100%;
  height: auto;
}

.product-title {
  width: 100%;
  font-size: 25px;
  font-weight: 700;
  line-height: 60px;
  padding-bottom: 10px;
  border-bottom: 1px solid gray;
  text-align: center;
}
.detail-box {
  margin-top: 10px;
  color: gray;
  line-height: 20px;
  font-size: 14px;
}

/*屏幕宽度小于640px*/

@media screen and (max-width: 640px) {
  .product-box {
    padding: 10px;
    border: none;
  }

  .product-detail {
    width: 100%;
  }

  .product-title {
    font-size: 18px;
    line-height: 30px;
    
  }
}
</style>
