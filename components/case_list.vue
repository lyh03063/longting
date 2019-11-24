<template>
  <div class="case layout1200">
    <div class="case-title">
      <div style="float:left;font-size:18px;" class="title-box">空调工程案列</div>
      <div style="float:right;font-size:14px;" class="many-box"><a href="/case_list">更多>></a></div>
      <div style="clear:both"></div>
    </div>
    <div class="case-main">
      <div v-for="(item, index) in caseList" :key="index" class="case-box" :class="index==3?'finally':''">
        <case_card :caseListMsg='item'></case_card>
      </div>
      <div style="clear:both"></div>
    </div>
  </div>
</template>

<script>
import case_card from '@/components/case_card.vue'
export default {
  props:['caseList'],
  components:{ case_card },
  data() {
    return {
     
    };
  },
  methods: {
  
  },
  created() {
   
  }
};
</script>

<style scoped>
a{
  text-decoration: none;
  color:#666
}
.case {
   padding: 10px 0;
}
.case-title {
  margin-top:10px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid black;
}
.title-box {
  float: left;
  font-size: 18px;
  margin-left: 10px;
}
.many-box {
  float: right;
  font-size: 184x;
  margin-right: 10px;
  color: gray;
  cursor: pointer;
}
.case-main {
  margin-top: 20px;
}
.case-box {
  float: left;
  width: 23%;
  margin-right: 2.66%;
}
.case-main .finally{
  margin-right: 0px;
}

</style>
