<template>
  <div class>
    <!-- 导航栏组件 -->
    <page_head></page_head>

    <!-- banner轮播图 -->
    <banner class="MB20" :list="listBanner" :height="hBanner"></banner>

    <pannel class="layout1200 MB20" title="家用中央空调客户案例" link_more="aaa">
      <!-- 响应式弹性列表-工程案列 -->
      <list_flex_res class="MT20" :list="listCase" com="card_case"></list_flex_res>
    </pannel>

    <pannel
      class="layout1200 MB20"
      title="关于我们"
      link_more="/articleDetail/1"
      :cf_content_box="cfContentBox1"
    >
      <div class="PT10 PB10 FS16">
        深圳市龙庭空调制冷有限公司成立于2016年，是集空调制冷、净化、电子设备及零配件的销售；建筑工程节能系统产品、智能控制系统产品、建筑节能环保产品的研发、销售和上门维修；机电设备工程的上门安装于一体的综合性空调工程公司，致力于工厂、酒店、商业场所提供舒适清新环境 。
        目前市场覆盖范围主要是广东深圳，广州，珠海，惠州，河源，佛山等。
      </div>
    </pannel>

    <pannel class="layout1200 MB20" title="合作伙伴">
      <!-- 响应式弹性列表-合作伙伴 -->
      <list_flex_res :list="listPartner" com="partner" col="5"></list_flex_res>
    </pannel>
    <!-- 底部导航栏组件 -->
    <page_foot></page_foot>
    <!-- 右侧联系我们组件 -->
    <contact_right></contact_right>
  </div>
</template>

<script>

import page_head from "~/components/page_head.vue";
import banner from "@/components/banner.vue";

import list_flex_res from "@/components/list_flex_res.vue";
import pannel from "@/components/pannel.vue";

import page_foot from "@/components/page_foot.vue";
import contact_right from "@/components/contact_right.vue";
import axios from "axios";


export default {
  components: {
    list_flex_res,
    page_head,
    banner,
    pannel,
    page_foot,
    contact_right
  },
  // 此方法设定当前页面的预处理数据
  async asyncData() {
    let {
      data: { list }
    } = await axios({
      method: "post",
      url: `${global.PUB.domain}/info/getCommonGroupList`,
      data: {
        _systemId: global.PUB._systemId,
        groupId: "5e2eab695a1ded33780f1f2e"
      }
    });
    //调用：{根据别名获取子分组数据列表的函数}
    let listBannerB = util.getSonListByAlias({ list, alias: "banner_big" });
    let listBannerS = util.getSonListByAlias({ list, alias: "banner_small" });
    let listPartner = util.getSonListByAlias({ list, alias: "partner" });
    let listCase = util.getSonListByAlias({ list, alias: "project_case" });
    console.log("listCase:", listCase);

    return {
      listBannerS,
      listBannerB,
      listCase,
      listPartner,
      cfContentBox1: {
        style: { "font-size": "20px" }
      }
    };
  },
  data() {
    return {
      hBanner: null, //banner高度
      listBanner: this.listBannerS
    };
  },

  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head() {
    return {
      title: "家用中央空调报价-安装-深圳龙庭空调",
      meta: [
        {
          hid: "description",
          name: "nesw1",
          content: "家用中央空调报价-安装-深圳龙庭空调"
        }
      ]
    };
  },
  methods: {
    //函数：{设置banner图函数}
    setBanner() {
      let { clientWidth } = document.body;
      if (clientWidth >= 640) {
        //Q1:{页面宽度}大于640
        this.listBanner = this.listBannerB;
        this.hBanner = `480px`;
      } else {
        //Q2:{页面宽度}小于640
        this.listBanner = this.listBannerS;
        this.hBanner = `180px`;
      }
    }
  },
  created() {},
  mounted() {
    this.setBanner(); //调用：{设置banner图函数}
    //事件绑定：窗口变化
    window.addEventListener("resize", () => {
      console.log("resize####");
      this.setBanner(); //调用：{设置banner图函数}
    });

   
  }
};
</script>

<style scoped>
</style>