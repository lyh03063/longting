<template>
  <div class>
    <!-- 导航栏组件 -->
    <page_head></page_head>

    <!-- banner轮播图 -->
    <banner class="MB20" :list="listBanner" :height="hBanner"></banner>

    <pannel class="layout1200 MB20" title="空调工程案例" link_more="/projectCaseList">
      <!-- 响应式弹性列表-工程案列 -->
      <list_flex_res  class="MT20"  :list="caseList" com="case_old"></list_flex_res>
    </pannel>

    <pannel class="layout1200 MB20" title="产品中心" link_more="/productList">
      <!-- 响应式弹性列表-产品列表 -->
      <list_flex_res  class="MT20"  :list="productList" com="product_old"></list_flex_res>
    </pannel>

    <pannel class="layout1200 MB20" title="合作伙伴">
      <!-- 响应式弹性列表-合作伙伴 -->
      <list_flex_res  class="MT10"  :list="partnerList" com="partner" col="5"></list_flex_res>
    </pannel>

    <!-- 底部导航栏组件 -->
    <page_foot></page_foot>
    <!-- 右侧联系我们组件 -->
    <contact_right></contact_right>
    
  </div>
</template>

<script>
import pannel from "@/components/pannel.vue";
import page_head from "~/components/page_head.vue";
import banner from "@/components/banner.vue";

import page_foot from "@/components/page_foot.vue";
import contact_right from "@/components/contact_right.vue";
import list_flex_res from "@/components/list_flex_res.vue";

import axios from "axios";
 let T;
export default {
  components: {
    pannel,
    page_head,
    banner,
    page_foot,
    contact_right,
    list_flex_res,
  },
  data() {
    return {
      hBanner: "480px",
      listBanner: T.listBannerS
    };
  },

  // 此方法设定当前页面的预处理数据
  async asyncData() {
    console.log("global.PUB:####4444", global.PUB);
    let {
      data: { list: caseList }
    } = await axios({
      method: "post",
      url: `${global.PUB.domain}/crossList?page=longting_case`,
      data: {
        pageSize: 4
      }
    });
    let {
      data: { list: productList }
    } = await axios({
      method: "post",
      url: `${global.PUB.domain}/crossList?page=longting_product`,
      data: {
        pageSize: 4,
        findJson: {
          showToSite: "1"
        },
        sortJson: { P1: 1 }
      }
    });
    let {
      data: { list: partnerList }
    } = await axios({
      method: "post",
      url: `${global.PUB.domain}/crossList?page=longting_partner`,
      data: {
        pageSize: 10,
        findJson: {}
      }
    });

    let listBannerB, listBannerS;
    {
      let {
        data: { list }
      } = await axios({
        method: "post",
        url: `${global.PUB.domain}/info/getCommonGroupList`,
        data: {
          _systemId: global.PUB._systemId,
          groupId: "5e34131319c644042851133e"
        }
      });
      //调用：{根据别名获取子分组数据列表的函数}
      listBannerB = util.getSonListByAlias({ list, alias: "banner_big" });
      listBannerS = util.getSonListByAlias({ list, alias: "banner_small" });
    }
    console.log("listBannerS:$$$$", listBannerS);

    return { listBannerS, listBannerB, caseList, productList, partnerList };
  },
  computed: {},
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head() {
    return {
      title: "深圳中央空调-深圳市龙庭空调制冷有限公司-首页",
      meta: [
        {
          name: "description",
          content:
            "深圳市龙庭空调制冷有限公司主营中央空调业务，业务范围覆盖珠三角地区"
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
        T.listBanner = T.listBannerB;
        T.hBanner = `480px`;
      } else {
        //Q2:{页面宽度}小于640
        T.listBanner = T.listBannerS;
        T.hBanner = `180px`;
      }
    }
  },
  beforeCreate() {
    T = this;
  },
  created() {},
  mounted() {
    T.setBanner(); //调用：{设置banner图函数}
    //事件绑定：窗口变化
    window.addEventListener("resize", () => {
      console.log("resize####");
      T.setBanner(); //调用：{设置banner图函数}
    });
  }
};
</script>

<style scoped>
</style>