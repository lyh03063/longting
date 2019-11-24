<template>
  <div>
    <head_nav></head_nav>
    <div class="product-banner">龙庭产品中心</div>
    <div class="product-main layout1200">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>产品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="category-box">
        <div class="category" :class="activeIndex==-1?'avtive':''">
          <a href="/product_list" :class="activeIndex==-1?'avtive':''">全部</a>
        </div>
        <div
          class="category"
          v-for="(item,index) in categoryList"
          :key="index"
          :class="activeIndex-1==index?'avtive':''"
        >
          <a
            :href="'/product_list?categoryId='+item.P1"
            :class="activeIndex-1==index?'avtive':''"
          >{{item.name}}</a>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="case-main">
        <div
          v-for="(item, index) in productList"
          :key="index+10"
          class="case-box"
          :class="index==3?'finally':''"
        >
          <product_card :product="item"></product_card>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="paging-box">
        <el-pagination
          @current-change="changePageIndex"
          :current-page.sync="pageIndex"
          :page-size="12"
          layout="prev, pager, next, jumper"
          :total="pageCount*12"
        ></el-pagination>
      </div>
      <div style="clear:both"></div>
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
import product_card from "@/components/product_card.vue";
import axios from "axios";
export default {
  components: { head_nav, contact_right, floor_nav, product_card },
  // 该方法在页面跳转进此路由触发
  // 触发vuex中的action方法
  // 缓存页面所需数据
  async asyncData({ route }) {
    let productData = await axios({
      method: "post",
      url: "http://120.76.160.41:3000/crossList?page=longting_product",
      data: {
        pageSize: 12,
        findJson: {
          showToSite: "1",
          categoryId: route.query.categoryId
        },
        sortJson: { P1: 1 }
      }
    });
    let categoryData = await axios({
      method: "post",
      url: "http://120.76.160.41:3000/crossList?page=longting_product_category",
      data: {
        pageSize: 100,
        sortJson: { P1: 1 }
      }
    });
    return {categoryList:categoryData.data.list,productList:productData.data.list,pageCount:productData.data.page.pageCount}
  },
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head(){
      return{
          title:'深圳中央空调-产品分类列表',
          meta:[
              {hid:'description',name:'nesw1',content:"这是一个SEO"}
          ]
      }
  },
  data() {
    return {
      activeIndex: this.$route.query.categoryId || -1,
      pageIndex: 1
    };
  },
  methods: {
    // 修改当前分页请求axios获取数据
    async changePageIndex() {
      let { data } = await axios({
        method: "post",
        url: "http://120.76.160.41:3000/crossList?page=longting_product",
        data: {
          pageSize: 12,
          pageIndex: this.pageIndex,
          findJson: {
            showToSite: "1",
            categoryId: this.$route.query.categoryId
          },
          sortJson: { P1: 1 }
        }
      });
      this.productList = data.list;
    }
  },
  created() {}
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #666;
}
.product-banner {
  width: 100%;
  height: 160px;
  background-image: url("//www.dmagic.cn/images/IconS/jpg/1336.jpg");
  line-height: 160px;
  font-size: 35px;
  text-align: center;
  color: white;
}
.product-main {
   padding: 10px 0;
}
.category-box {
  margin-top: 10px;
}
.category {
  float: left;
  line-height: 40px;
  padding: 0 10px;
  margin-right: 20px;
  background-color: #eeeeee;
  cursor: pointer;
}
.avtive {
  background-color: rgb(0, 146, 211);
  color: white;
}
.case-main {
  /* display: flex; */
}
.case-box {
  margin-top: 20px;
  float: left;
  width: 22.4%;
  margin-right: 2.6%;
}
.case-main .finally {
  margin-right: 0px;
}
.paging-box {
  margin: 20px 30px;
  float: right;
}
</style>
