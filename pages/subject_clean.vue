<template>
  <div class>
  
  </div>
</template>

<script>
let T;
export default {
  components: {
   
  },
  // 此方法设定当前页面的预处理数据
  async asyncData() {
    
  },
  computed: {

  },
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head(){
      return{
          title:'xxxx',
          meta:[
              {hid:'description',name:'nesw1',content:"中央空调清洗-安装-深圳龙庭空调"}
          ]
      }
  },
  methods: {},
  beforeCreate() {
    T = this;
  },
  created() {},
  mounted() {
  }
};
</script>

<style scoped>
</style>