<template>
  <div class="collaborate-box layout1200">
    <div class="title-box">
      <div class="title">合作伙伴</div>
      <div style="clear:both"></div>
    </div>
    <div class="img-box">
      <ul class>
        <li>
          <img title="美的" src="http://www.szligao.cn/templets/ligao/images/1.jpg" />
        </li>
        <li>
          <img title="三菱电机" src="http://www.szligao.cn/templets/ligao/images/6.jpg" />
        </li>
        <li>
          <img title="大金" src="http://www.szligao.cn/templets/ligao/images/3.jpg" />
        </li>
        <li>
          <img title="日立" src="http://www.szligao.cn/templets/ligao/images/4.jpg" />
        </li>
        <li>
          <img title="海尔" src="http://www.szligao.cn/templets/ligao/images/5.jpg" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["productList"],
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
.img-box ul li {
  display: inline-block;
  width: 19%;
  height: 100px;
}
.img-box ul {
  margin-top:15px;
  padding: 0;
}
.img-box ul li img {
  width: 100%;
  height: 100%;
}
.collaborate-box {
  padding: 10px 0;
  padding-bottom: 10px;
}
.title-box {
  height: 40px;
  margin-top: 10px;
  line-height: 40px;
  padding: 0 10px;
  border-bottom: 1px solid black;
}
.title {
  float: left;
  font-size: 18px;
}

</style>
