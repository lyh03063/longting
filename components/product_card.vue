<template>
  <div class>
    <el-card :body-style="{ padding: '0px' }">
          <div class="case-img-box">
            <img :src="product.album" class="image" />
          </div>
          <div class="action-box">
            <div class="case-name" :title="product.name">
              <div>{{product.name}}</div>
              <div style="font-size:14px;color:gray">{{product.brand}}</div></div>
            <el-button type="text" class="action-button"><a :href="'/product_detail?productId='+product.P1">了解详情</a></el-button>
          </div>
        </el-card>
  </div>
</template>

<script>
export default {
    props: ["product"],
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
a {
  text-decoration: none;
}
.case-img-box {
  width: 100%;
  height: 207px;
}
.image {
  width: 100%;
  height: 100%;
}
.action-box {
  height: 60px;
  line-height: 60px;
  padding: 0 10px;
}
.case-name {
  width: 160px;
  margin-top:10px;
  line-height: 20px;
   white-space:nowrap;
   text-overflow:ellipsis;
   overflow: hidden;
   cursor: pointer;
   float: left;
}
.action-button{
  float: right;
  margin-top:10px;
}
</style>