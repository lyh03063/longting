<template>
  <ul class="clearfix n-flex-main" :class="arrClass" >
    <li v-for="(item, index) in list" :key="index" class="n-flex-group">
      <component :is="com" :item="item"></component>
    </li>
    <!--循环5个空盒子-配合flex列表-->
    <li class="n-flex-group" v-for="item in 5" :key="'item'+item"></li>
  </ul>
</template>

<script>
import card_case from "@/components/card/case.vue";
import partner from "@/components/card/partner.vue";
import case_old from "@/components/card/case_old.vue";
import product_old from "@/components/card/product_old.vue";
export default {
  props: {
    col: {
      default: 4
    },
    com: {
      default: "card_case"
    },

    list: {}
  },
  components: { card_case,case_old, partner,product_old },
  data() {
    return {
      arrClass:[],


    };
  },
  methods: {},
  created() {
    let classCol=`n-col-${this.col}`
    this.arrClass.push(classCol)



  }
};
</script>

<style scoped>

 /****************************flex列表+响应式-START****************************/


 
.n-flex-main {
    display: flex;
    /*开启换行*/
    flex-wrap: wrap;
    justify-content: space-between;
    /* border: 1px solid #f00; */
  }
  
  .n-flex-main .n-flex-group {
    margin: 0 0 10px 0;
  }
  
  /* 在3栏以上布局时，会出现中间空缺商品的情况，需要通过补充这种空元素来解决 */
  .n-flex-main .n-flex-group:empty {
    height: 0;
    margin: 0;
  }


  
.n-flex-main.n-col-4 .n-flex-group {
    width: 23%;
  
  }
  .n-flex-main.n-col-5 .n-flex-group {
    width: 19%;
  
  }
  /*屏幕宽度小于640px*/
  @media screen and (max-width: 640px) {
    .n-flex-main{
      padding:10px;
    }
    .n-flex-main.n-col-4 .n-flex-group {
      width: 48%;
    }
    .n-flex-main.n-col-5 .n-flex-group {
        width: 32%;
      }
  }
  
  /*屏幕宽度小于360px*/
  @media screen and (max-width: 360px) {
    .n-flex-main.n-col-4 .n-flex-group {
      width: 100%;
    }
    .n-flex-main.n-col-5 .n-flex-group {
        width: 48%;
      }
  }
 /****************************flex列表+响应式-END****************************/
</style>
