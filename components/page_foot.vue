<template>
  <div class="nav-box box-res">
    <div class="LH30">
     <a href="/productList" class="nav">产品中心</a>
      <el-divider direction="vertical" ></el-divider>
      <a href="/projectCaseList" class="nav">工程案例</a>
      <el-divider direction="vertical"></el-divider>
      <a href="/projectCaseList" class="nav">空调维保</a>
      <el-divider direction="vertical"></el-divider>
      <a href="/articleList" class="nav">企业新闻</a>
      <el-divider direction="vertical"></el-divider>
      <a href="/articleDetail/1" class="nav">关于我们</a>
      <el-divider direction="vertical"></el-divider>
      <a href="/articleDetail/2" class="nav">联系我们</a>
    </div>
    <div class="LH30 C_999">公司电话：0755-27788390 13480986519  地址：深圳市宝安区西乡街道蚝业社区海城路235号海滨新村泰逸大厦F6-025</div>
    <div class="LH30 C_999">粤ICP备09035474号-1 Copyright © 2016–2018  版权所有 深圳市龙庭空调制冷有限公司</div>
    <wx_user_bar  ></wx_user_bar>
  </div>
</template>

<script>
import wx_user_bar from "@/components/wx_user_bar.vue";
let T;
export default {
   components: {
    wx_user_bar
  },
  props: ["productList"],
  data() {
    return {};
  },
  methods: {},
  beforeCreate() {
    T = this;
  },
  created() {}
};
</script>
<style scoped>

.nav-box {
  width: 100%;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  background-color: rgb(243, 243, 243);
  padding-top: 20px;
  padding-bottom: 20px;
}
.nav {
  cursor: pointer;
}
.nav:hover {
  color: orange;
}
</style>
