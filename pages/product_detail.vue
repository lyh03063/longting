<template>
  <div>
    <head_nav></head_nav>
    <hr />
    <div class="main-box layout1200">
      <div style="margin: 10px 0px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>产品详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="product-box">
        <div class="img-box">
          <img :src="productDetail.album" class="image" />
        </div>
        <div class="product-detail">
          <div class="product-title">{{productDetail.name}}</div>
          <div class="detail-box">
            <div>类别：{{categoryName}}</div>
            <div>型号：{{productDetail.model}}</div>
            <div>品牌：{{productDetail.brand}}</div>
            <div>简介：{{productDetail.description}}</div>
          </div>
        </div>
        <div style="clear:both"></div>
      </div>
    </div>
    <hr />
    <floor_nav></floor_nav>
    <contact_right></contact_right>
  </div>
</template>

<script>
import head_nav from "@/components/head_nav.vue";
import floor_nav from "@/components/floor_nav.vue";
import contact_right from "@/components/contact_right.vue";
import axios from "axios";
export default {
  components: { head_nav, contact_right, floor_nav },
 async asyncData({  route }) {
    let productData = await axios({
    method: "post",
    url: 'http://120.76.160.41:3000/crossDetail?page=longting_product',
    data: {
      id: route.query.productId
    }
  }).catch(() => {});
  let categoryData = await axios({
      method: "post",
      url: "http://120.76.160.41:3000/crossList?page=longting_product_category",
      data: {
        pageSize: 100,
        sortJson: { P1: 1 }
      }
    });
    return {productDetail:productData.data.Doc,categoryList:categoryData.data.list}
  },
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head(){
      return{
          title:'深圳中央空调-产品详情-'+this.productDetail.name,
          meta:[
              {hid:'description',name:'nesw1',content:"这是一个SEO"}
          ]
      }
  },
  data() {
    return {
        categoryName:''
    };
  },
  methods: {},
  mounted(){
      this.categoryList.forEach(item=> {
          if (item.P1==this.productDetail.categoryId) {
              this.categoryName = item.name
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
  float: left;
  width: 450px;
  height: 320px;
  margin-right: 30px;
}
.product-detail {
  float: left;
  width: 60%;
}
.image {
  width: 100%;
  height: 100%;
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
</style>
