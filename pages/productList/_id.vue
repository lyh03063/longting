<template>
  <div>
    <page_head></page_head>
    <div class="product-banner">龙庭产品中心</div>
    <div class="product-main layout1200 clearfix">
      <div class="box-res">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <a href="/">首页</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>产品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="category-box clearfix box-res">
        <div class="category" :class="activeIndex==-1?'avtive':''">
          <a href="/productList/" :class="activeIndex==-1?'avtive':''">全部</a>
        </div>
        <div
          class="category"
          v-for="(item,index) in categoryList"
          :key="index"
          :class="activeIndex-1==index?'avtive':''"
        >
          <a :href="'/productList/'+item.P1" :class="activeIndex-1==index?'avtive':''">{{item.name}}</a>
        </div>
      </div>
      <div class="case-main clearfix MT10">
        <!-- 响应式弹性列表-产品列表 -->
        <list_flex_res :list="productList" com="product_old"></list_flex_res>
      </div>
      <div class="paging-box">
        <el-pagination
          @current-change="changePageIndex"
          :current-page.sync="pageIndex"
          :page-size="8"
          layout="prev, pager, next, jumper"
          :total="pageCount*8"
        ></el-pagination>
      </div>
    </div>
    <page_foot></page_foot>
    <contact_right></contact_right>
  </div>
</template>

<script>
import page_head from "@/components/page_head.vue";
import page_foot from "@/components/page_foot.vue";
import contact_right from "@/components/contact_right.vue";

import list_flex_res from "@/components/list_flex_res.vue";
import axios from "axios";
axios.defaults.withCredentials = true//携带cookie
let T;
export default {
  // validate({ params }) {
  //   return /^\d+$/.test(params.id);
  // },
  components: {
    page_head,
    contact_right,
    page_foot,

    list_flex_res
  },
  // 该方法在页面跳转进此路由触发
  // 触发vuex中的action方法
  // 缓存页面所需数据
  async asyncData({ route, params, payload }) {
    console.log("payload:", payload);
    console.log("params:", params);
    console.log("route:", route);
    let productData = await axios({
      method: "post",
      url: `${global.PUB.domain}/crossList?page=longting_product`,
      data: {
        pageSize: 12,
        findJson: {
          showToSite: "1",
          categoryId: params.id
        },
        sortJson: { P1: 1 }
      }
    });
    let {
      data: { list: categoryList }
    } = await axios({
      method: "post",
      url: `${global.PUB.domain}/crossList?page=longting_product_category`,
      data: {
        pageSize: 100,
        sortJson: { P1: 1 }
      }
    });
    let currentCategory = { name: "" };
    //如果分类id存在
    if (params.id) {
      currentCategory = categoryList.find(
        doc => doc.P1 == params.id
      );
    }

    return {
      currentCategory,
      categoryList,
      productList: productData.data.list,
      pageCount: productData.data.page.pageCount
    };
  },
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head() {
    return {
      title: `${T.currentCategory.name||"全部产品"}-产品列表-深圳龙庭空调制冷有限公司`
      // meta: [{ hid: "description", name: "nesw1", content: "" }]
    };
  },
  data() {
    return {
      activeIndex: T.$route.params.id || -1,
      pageIndex: 1
    };
  },
  methods: {
    // 修改当前分页请求axios获取数据
    async changePageIndex() {
      console.log("T.$route.params.id:", T.$route.params.id);
      let { data } = await axios({
        method: "post",
        url: `${global.PUB.domain}/crossList?page=longting_product`,
        data: {
          pageSize: 12,
          pageIndex: T.pageIndex,
          findJson: {
            showToSite: "1",
            categoryId: T.$route.params.id
          },
          sortJson: { P1: 1 }
        }
      });
      T.productList = data.list;
    }
  },
  beforeCreate() {
    T = this;
  },
  created() {}
};
</script>

<style scoped>
a {
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
  margin: 0 15px 10px 0;
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
