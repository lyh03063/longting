<template>
  <div>
    <page_head></page_head>
    <div class="main-box layout1200">
      <div class="box-res  MB10">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><a  href="/">首页</a></el-breadcrumb-item>
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
    <page_foot></page_foot>
    <contact_right></contact_right>
  </div>
</template>

<script>
import page_head from "@/components/page_head.vue";
import page_foot from "@/components/page_foot.vue";
import contact_right from "@/components/contact_right.vue";
import axios from 'axios'
let T;
export default {
  components: { page_head, contact_right, page_foot },
  async asyncData({ route,params }) {
    let { data } = await axios({
      method: "post",
      url: `${global.PUB.domain}/crossDetail?page=longting_article`,
      data: {
        id: params.id
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
          title:`${T.articleDetail.name}-深圳龙庭空调制冷有限公司`,
          // meta:[
          //     {hid:'description',name:'nesw1',content:""}
          // ]
      }
  },
  beforeCreate() {
    T = this;
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
