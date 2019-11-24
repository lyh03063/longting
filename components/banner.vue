
<template>
  <div >
    <el-carousel height="480px">
      <el-carousel-item v-for="(item,index) in bannerList" :key="index">
         <div class="bg_slide  " :style="{'background-image': `url(${item.img})`}">
                <!--背景层-->
            </div>
      </el-carousel-item>
    </el-carousel>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerList:[
        {img:'//www.dmagic.cn/images/IconS/jpg/1337.jpg'},
        {img:'//www.dmagic.cn/images/IconS/jpg/1338.jpg'}
      ]
    };
  },
  methods: {
    
  },
  created() {}
};
</script>

<style scoped>
.bg_slide{
  width: 100%;
  height: 100%;
  background-position: center center
}
</style>
