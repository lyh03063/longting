<template>
  <div>
    <head_nav></head_nav>
    <hr />
    <div class="main-box layout1200">
      <div style="margin: 10px 0px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>工程案例</el-breadcrumb-item>
          <el-breadcrumb-item>案例详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="case-box">
        <div class="case-title">{{caseDetail.name}}</div>
        <div class="time-box">发布时间:{{caseDetail.UpdateTime}}</div>
        <div class="img-box">
          <img :src="caseDetail.imgSrc" class="image" />
        </div>
        <div class="case-detail" v-html="caseDetail.detail"></div>
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
 async asyncData({ route }) {
    let { data } = await axios({
    method: "post",
    url: 'http://120.76.160.41:3000/crossDetail?page=longting_case',
    data: {
      id: route.query.caseId
    }
  }).catch(() => {});
  return {caseDetail:data.Doc}
  },
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head(){
      return{
          title:'深圳中央空调-空调案例-'+this.caseDetail.name,
          meta:[
              {hid:'description',name:'nesw1',content:"这是一个SEO"}
          ]
      }
  },
  data() {
    return {};
  },
  methods: {},
  created() {

  },
  mounted(){

  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.main-box {
  padding: 10px 0;
}
.case-box {
  border: 1px solid #eeeeee;
  padding: 10px 20px;
}
.case-title {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
}
.time-box {
  color: gray;
  font-size: 14px;
  line-height: 30px;
  border-bottom: 1px dashed #eeeeee;
}
.img-box {
  margin: 10px 5px;
  width: 720px;
  height: 540px;
}
.image {
  width: 100%;
  height: 100%;
}
.case-detail >>> p {
  font-size: 16px;
  line-height: 20px;
  margin: 0;
  padding: 0;
}
.case-detail {
  margin: 10px 0;
}
</style>
