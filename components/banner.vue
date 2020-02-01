
<template>
  <div>
    <!-- height="480px" -->
    <el-carousel class="banner-main" :height="height">
      <el-carousel-item v-for="(item,index) in list" :key="index">
        <a  :href="item.link">
          <div class="bg_slide" :style="{'background-image': `url(${item.imgSrc})`}">
            <!--背景层-->
          </div>
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    height:{
      default:`180px`
    },
    list: {
      default(){
        return []
      }
    }
  },

  data() {
    return {
     
    };
  },
  methods: {},
  created() {},
 
};
</script>

<style scoped>
.bg_slide {
  width: 100%;
  height: 100%;
  background-position: center center;
}


</style>
