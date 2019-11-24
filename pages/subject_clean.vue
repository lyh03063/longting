<template>
  <div class>
    <!-- 导航栏组件 -->
    <head_nav></head_nav>
    <div class="layout1200  layout MB20">
     banner图，突出“龙庭中央空调清洗”优势
    </div>

    <div class="layout1200 layout MB20">
      清洗专题-案例列表
    </div>
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
    
  },
  computed: {

  },
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head(){
      return{
          title:'家用中央空调报价-安装-深圳龙庭空调',
          meta:[
              {hid:'description',name:'nesw1',content:"家用中央空调报价-安装-深圳龙庭空调"}
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