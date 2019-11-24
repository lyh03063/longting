<template>
  <div class>
    <el-card :body-style="{ padding: '0px' }">
      <div class="case-img-box">
        <img :src="caseListMsg.imgSrc" class="image" /> 
      </div>
      <div class="action-box">
        <div class="case-name" :title="caseListMsg.name">{{caseListMsg.name}}</div>
        <el-button type="text" class="action-button"><a :href="'/case_detail?caseId='+caseListMsg.P1">浏览案例</a></el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["caseListMsg"],
  data() {
    return {
    };
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.case-img-box {
  width: 100%;
  height: 207px;
}
.image {
  width: 100%;
  height: 100%;
}
.action-box {
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
}
.case-name {
  width: 160px;
  line-height: 50px;
   white-space:nowrap;
   text-overflow:ellipsis;
   overflow: hidden;
   cursor: pointer;
   float: left;
}
.action-button{
  float: right;
  margin-top:5px;
}
</style>