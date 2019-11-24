<template>
  <div>
    <head_nav></head_nav>
    <div class="product-banner">龙庭工程案列</div>
    <div class="product-main layout1200">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>工程案列</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="case-main">
        <div
          v-for="(item, index) in caseList"
          :key="index+10"
          class="case-box"
          :class="index==3?'finally':''"
        >
          <case_card :caseListMsg="item"></case_card>
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
import case_card from "@/components/case_card.vue";
import axios from "axios";
export default {
  components: { head_nav, contact_right, floor_nav, case_card },
  // 该方法在页面跳转进此路由触发
  // 触发vuex中的action方法
  // 缓存页面所需数据
  async asyncData() {
    let caseData = await axios({
      method: "post",
      url: "http://120.76.160.41:3000/crossList?page=longting_case",
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
        url: "http://120.76.160.41:3000/crossList?page=longting_case",
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
          title:'深圳中央空调-空调案例列表',
          meta:[
              {hid:'description',name:'nesw1',content:"这是一个SEO"}
          ]
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
