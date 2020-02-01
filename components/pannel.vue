<template>
  <div class>
    <div class="title-bar">
      <div class="title-text">{{title}}</div>
      <div class="more-box" v-if="link_more">
        <a :href="link_more">更多&gt;&gt;</a>
      </div>
    </div>
    <div class="content-box clearfix" v-bind="cf_content_box">
      <slot ></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {},
    caseList: {},
    link_more: {},
    //内容盒子样式
    cf_content_box: {
      type: Object,
      default: function() {
        return {
          style: { } 
        };
      }
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
  created() {
    //调用：{给一个对象设置默认属性函数}
    global.util.setObjDefault(this.cf_content_box, { style: { padding: "0" } });

    console.log("this.cf_content_box:", this.cf_content_box);

   
  }
};
</script>

<style scoped>
a {
  
  color: #666;
}

.title-bar {
  display: flex;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid #ccc;
  font-size: 18px;
}
.title-text {
  flex: 1;
}
.more-box {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}

@media screen and (max-width: 640px) {
  .title-bar{
    padding: 0 10px
  }
  .content-box{
    padding: 0 10px
  }
}
</style>
