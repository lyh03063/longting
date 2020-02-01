<template>
  <div>
    <page_head></page_head>
    <div class="product-banner">龙庭工程案列</div>
    <div class=" layout1200 clearfix box-res MT10">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><a  href="/">首页</a></el-breadcrumb-item>
          <el-breadcrumb-item>工程案列</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="case-main clearfix MT20">
         <!-- 响应式弹性列表-工程案列 -->
      <list_flex_res  :list="caseList" com="case_old"></list_flex_res>
        
 
      </div>
      <div class="paging-box ">
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
import list_flex_res from "@/components/list_flex_res.vue";
export default {
  components: { page_head, contact_right, page_foot, list_flex_res },
  // 该方法在页面跳转进此路由触发
  // 触发vuex中的action方法
  // 缓存页面所需数据
  async asyncData() {
    let caseData = await axios({
      method: "post",
      url: `${global.PUB.domain}/crossList?page=longting_case`,
      data: {
        pageSize: 12
      }
    });
    return {caseList:caseData.data.list,pageCount:caseData.data.page.pageCount}
  },
  data() {
    return {
      pageIndex: 1
    };
  },
  methods: {
    // 修改当前分页请求axios获取数据
    async changePageIndex() {
      let { data } = await axios({
        method: "post",
        url: `${global.PUB.domain}/crossList?page=longting_case`,
        data: {
          pageSize: 12,
          pageIndex: this.pageIndex
        }
      });
      this.caseList = data.list
    }
  },
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head(){
      return{
          title:'龙庭官网-工程案例',
          // meta:[
          //     {hid:'description',name:'nesw1',content:""}
          // ]
      }
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
