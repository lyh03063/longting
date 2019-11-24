<template>
    <div class="home-head">
      <div class="home-logo">
        <div style="float:left"><a><img class="logo-img" alt="深圳龙庭中央空调" src="//www.dmagic.cn/images/IconS/IconS_2568.png"/></a></div>
      <span class="head-title">龙庭中央空调</span></div>
      <div class="home-nav">
        <ul>
          <li v-for="(item,index) in navList" :key="index">
            <div v-if="item.child">
              <el-dropdown >
                <span class="">
                  <span style="font-size:18px;">
                            {{item.value}}
                     </span>
                     
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(child,i) in item.child" :key="i" >
                      <a :href="child.url">{{child.value}}</a>
                     </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div v-else><a :href="item.url">{{item.value}}</a></div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        { value: "首页", url: "/" },
        {
          value: "产品中心",
          url: "",
          child: [
            { value: "单元式中央空调", url: "/product_list?categoryId=1" },
            { value: "多联式中央空调", url: "/product_list?categoryId=2" },
            { value: "冷水式中央空调", url: "/product_list?categoryId=3" },
            { value: "末端产品", url: "/product_list?categoryId=4" },
            { value: "新风机组", url: "/product_list?categoryId=5" }
          ]
        },
        
        { value: "工程案列", url: "/case_list" },
        { value: "家用中央空调", url: "/subject_family" },
        { value: "中央空调清洗", url: "/subject_clean" },
        { value: "关于我们", url: "" ,child: [
            { value: "联系我们", url: "/article_detail?articleId=2" },
            { value: "企业新闻", url: "/article_list" }
        ]}
      ]
    };
  },
  methods: {
      gotoPage(url){
            this.$router.push({path:url})
      }
     
  },
  created() {}
};
</script>

<style scoped>
a{
  text-decoration: none;
  color:#666
}
.home-head{
      width: 1200px;
  margin-top: 20x;
  margin-bottom: 13px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}
.home-logo {
  flex: 0 0 40%;
}
.home-nav {
  flex: 0 0 60%;
}

.home-nav ul li {
  display: inline-block;
  cursor: pointer;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 18px;
  line-height: 30px;
  margin-top:20px;
}
.logo-img{
    width: 90px;
    /* height: 50px; */
    margin-right: 10px;
}
.head-title{
    color: #666;
    font-size: 30px;
    margin-top:15px;
    height: 50px;;
    display: inline-block;
}
</style>
