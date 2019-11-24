<template>
  <div>
    <head_nav></head_nav>
    <hr />
    <div class="main-box layout1200">
      <div style="margin: 10px 0px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>企业新闻</el-breadcrumb-item>
          <el-breadcrumb-item>文章标题</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="article-box">
        <div class="article-title">{{articleDetail.name}}</div>
        <div class="article-time">发布时间：{{articleDetail.CreateTime}}</div>
        <div class="article-detail" v-html="articleDetail.detail"></div>
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
import axios from 'axios'
export default {
  components: { head_nav, contact_right, floor_nav },
  async asyncData({ route }) {
    let { data } = await axios({
      method: "post",
      url: "http://120.76.160.41:3000/crossDetail?page=longting_article",
      data: {
        id: route.query.articleId
      }
    }).catch(() => {});
    return { articleDetail: data.Doc };
  },
  data() {
    return {};
  },
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head(){
      return{
          title:'深圳中央空调-'+this.articleDetail.name,
          meta:[
              {hid:'description',name:'nesw1',content:"这是一个SEO"}
          ]
      }
  },
};
</script>

<style scoped>
.main-box {
 padding: 10px 0;
}
.article-box {
  border: 1px solid #eeeeee;
  padding: 10px 20px;
}
.article-title {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}
.article-time {
  font-size: 14px;
  color: gray;
  line-height: 20px;
  border-bottom: 1px #eeeeee dashed;
  padding-bottom: 5px;
}
.article-detail {
  margin: 10px 0px;
}
.article-detail >>> p {
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 20px;
}
</style>
