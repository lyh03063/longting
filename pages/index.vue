<template>
  <div class>
    <!-- 导航栏组件 -->
    <head_nav></head_nav>
    <!-- 轮播图组件 -->
    <banner></banner>
    <!-- 工程案列列表组件 -->
    <case_list :caseList="caseList"></case_list>
    <!-- 产品列表组件 -->
    <product_list :productList="productList"></product_list>
    <!-- 合作伙伴组件 -->
    <collaborate></collaborate>
    <hr />
    <!-- 底部导航栏组件 -->
    <floor_nav></floor_nav>
    <!-- 右侧联系我们组件 -->
    <contact_right></contact_right>
  </div>
</template>

<script>
import head_nav from "~/components/head_nav.vue";
import banner from "@/components/banner.vue";
import case_list from "@/components/case_list.vue";
import product_list from "@/components/product_list.vue";
import collaborate from "@/components/collaborate.vue";
import floor_nav from "@/components/floor_nav.vue";
import contact_right from "@/components/contact_right.vue";
import axios from "axios";
export default {
  components: {
    head_nav,
    banner,
    case_list,
    product_list,
    collaborate,
    floor_nav,
    contact_right
  },
  // 此方法设定当前页面的预处理数据
  async asyncData() {
    let caseData = await axios({
      method: "post",
      url: "http://120.76.160.41:3000/crossList?page=longting_case",
      data: {
        pageSize: 4
      }
    });
    let productData = await axios({
      method: "post",
      url: "http://120.76.160.41:3000/crossList?page=longting_product",
      data: {
        pageSize: 4,
        findJson: {
          showToSite: "1",
        },
        sortJson: { P1: 1 }
      }
    });
    return { caseList: caseData.data.list,productList:productData.data.list};
  },
  computed: {

  },
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head(){
      return{
          title:'深圳中央空调-深圳市龙庭空调制冷有限公司-首页',
          meta:[
              {hid:'description',name:'nesw1',content:"这是一个SEO"}
          ]
      }
  },
  methods: {},
  created() {},
  mounted() {
    // console.log("aaa", this.caseList);
  }
};
</script>

<style scoped>
</style>