<template>
  <div>
    <page_head></page_head>
    <div class="product-banner MB10">企业新闻</div>
    <div class="MB10 layout1200 box-res">
      <div class=" MB10">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><a  href="/">首页</a></el-breadcrumb-item>
          <el-breadcrumb-item>企业新闻</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="article-list-box box-res" v-for="(item,index) in articleList" :key="index">
        <div class="article-title">{{item.name}}</div>
        <div class="article-main clearfix">
          <div class="article-time">发布时间：{{item.CreateTime}}</div>
          <div class="article-detail">
            <a :href="'/articleDetail/'+item.P1">查看全文>></a>
          </div>

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

    </div>

    <page_foot></page_foot>
    <contact_right></contact_right>
  </div>
</template>

<script>
import page_head from "@/components/page_head.vue";
import page_foot from "@/components/page_foot.vue";
import contact_right from "@/components/contact_right.vue";
import axios from "axios";
export default {
  components: { page_head, contact_right, page_foot },
  async asyncData() {
    let { data } = await axios({
      method: "post",
      url: `${global.PUB.domain}/crosslist?page=longting_article`,
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
          title:'深圳龙庭官网-文章列表',
          meta:[
              {hid:'description',name:'nesw1',content:"深圳龙庭官网的的相关文章/企业新闻列表"}
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
        url: `${global.PUB.domain}/crosslist?page=longting_article`,
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
