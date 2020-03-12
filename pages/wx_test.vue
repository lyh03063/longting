<template>
  <div class style="padding:10px">
    <div class="LH40">此页面需要在微信端测试！！！在微信开发者工具能测试出部分效果。</div>
    <el-button class="btn-test" plain @click="wx_getLocation" size="mini">打开地图选择位置</el-button>

    <el-button class="btn-test" plain @click="wx.hideAllNonBaseMenuItem()" size="mini">隐藏所有非基础按钮接口</el-button>
    <el-button class="btn-test" plain @click="wx.showAllNonBaseMenuItem()" size="mini">显示所有功能按钮接口</el-button>

    <el-button class="btn-test" plain @click="wx.showAllNonBaseMenuItem()" size="mini">显示所有功能按钮接口</el-button>

    <el-button class="btn-test" plain @click="wx_openAddress()" size="mini">获取收货地址</el-button>
    <el-button class="btn-test" plain @click="wx.closeWindow()" size="mini">关闭网页</el-button>

    <div class="CL1"></div>
    <a target="_blank" href="https://www.weixinsxy.com/jssdk">查看微信官方JS-SDK的演示demo</a>
  </div>
</template>

<script>
import axios from "axios";
let T;
export default {
  mixins: [MIX.wx_js_sdk], //混入
  components: {},
  data() {
    return {
      hBanner: "480px",
      listBanner: T.listBannerS
    };
  },

  // 此方法设定当前页面的预处理数据
  async asyncData() {
    return {};
  },
  computed: {},
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head() {
    return {
      title: "微信接口测试"
    };
  },
  methods: {},
  beforeCreate() {
    T = this;
  },
  created() {
    //设置微信分享数据
    T.objWxShare.title = "微信接口测试";
  },
  async mounted() {}
};
</script>

<style scoped>
.btn-test {
  margin-bottom: 8px;
}
</style>