<template>
  <div>
    <head_nav></head_nav>
    <div class="product-banner">企业新闻-</div>
    <div class="main-box layout1200">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>企业新闻</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="article-list-box" v-for="(item,index) in articleList" :key="index">
        <div class="article-title">{{item.name}}</div>
        <div class="article-main">
          <div class="article-time">发布时间：{{item.CreateTime}}</div>
          <div class="article-detail">
            <a :href="'/article_detail?articleId='+item.P1">查看全文>></a>
          </div>
          <div style="clear:both"></div>
        </div>
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
import axios from "axios";
export default {
  components: { head_nav, contact_right, floor_nav },
  async asyncData() {
    let { data } = await axios({
      method: "post",
      url: "http://120.76.160.41:3000/crosslist?page=longting_article",
      data: {
        pageSize: 12,
        sortJson: { P1: 1 }
      }
    });
    return { articleList:data.list,pageCount:data.page.pageCount}
  },
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head(){
      return{
          title:'深圳中央空调-文章列表',
          meta:[
              {hid:'description',name:'nesw1',content:"这是一个SEO"}
          ]
      }
  },
  data() {
    return {
      pageIndex: 1
    };
  },
  methods: {
    async changePageIndex() {
      let { data } = await axios({
        method: "post",
        url: "http://120.76.160.41:3000/crosslist?page=longting_article",
        data: {
          pageSize: 12,
          sortJson: { P1: 1 },
          pageIndex: this.pageIndex
        }
      });
      this.articleList = data.list;
    }
  }
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
.main-box {
  padding: 10px 0;
}
.article-list-box {
  padding: 20px 5px;
  border-bottom: 1px solid gray;
}
.article-title {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
}
.article-main {
  width: 100%;
}
.article-time {
  float: left;
  font-size: 14px;
  color: gray;
  line-height: 20px;
}
.article-detail {
  float: right;
  font-size: 14px;
  color: gray;
  line-height: 20px;
  cursor: pointer;
}
.paging-box {
  margin: 20px 30px;
  float: right;
}
</style>
