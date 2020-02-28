<template>
  <div>
    <page_head></page_head>
  
    <div class="main-box layout1200">
      <div class=" box-res  MB10">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <a href="/">首页</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>工程案例</el-breadcrumb-item>
          <el-breadcrumb-item>案例详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="case-box">
        <div class="case-title">{{caseDetail.name}}</div>
        <div class="time-box">发布时间:{{caseDetail.UpdateTime}}</div>
        <div class="img-box MT10">
          <img :src="caseDetail.imgSrc" class="image" />
        </div>
        
        <div class="case-detail" v-html="caseDetail.detail"></div>
      </div>
    </div>
    <page_foot></page_foot>
    <contact_right></contact_right>
  </div>
</template>

<script>
import page_head from "@/components/page_head.vue";
import page_foot from "@/components/page_foot.vue";
import contact_right from "@/components/contact_right.vue";
import axios from "axios";
let T;
export default {
  components: { page_head, contact_right, page_foot },
  async asyncData({ route ,params}) {
    let { data } = await axios({
      method: "post",
      url: `${global.PUB.domain}/crossDetail?page=longting_case`,
      data: {
        id: params.id
      }
    }).catch(() => {});
    return { caseDetail: data.Doc };
  },
  // 此方法设定当前页面的标题以及SEO优化的meta标签中的内容
  head() {
    return {
      title: `${T.caseDetail.name}-工程案例详情-深圳龙庭空调制冷有限公司`,
      meta: [{  name: "description",
      content: ""
      }]
    };
  },
  data() {
    return {};
  },
  methods: {},
  beforeCreate() {
    T = this;
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>

.main-box {
  padding: 10px 0;
}
.case-box {
  border: 1px solid #eeeeee;
  padding: 10px 20px;
}
.case-title {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
}
.time-box {
  color: gray;
  font-size: 14px;
  line-height: 30px;
  border-bottom: 1px dashed #eeeeee;
}
.img-box {
  
  width: 720px;
  height: 540px;
}


/*屏幕宽度小于640px*/

@media screen and (max-width: 640px) {
    
    .img-box{
        width: 100%;
        height:auto;
    }

}

.image {
  width: 100%;
  height: 100%;
}
.case-detail >>> p {
  font-size: 16px;
  line-height: 20px;
  margin: 0;
  padding: 0;
}
.case-detail {
  margin: 10px 0;
}
</style>
