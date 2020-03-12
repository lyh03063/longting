<template>
  <div class>
    <div class="page-head-box M_0 clearfix" id="id_page_head">
      <!--页头-->
      <div class="logo-box">
        <a href="/" class="logo-img-link">
          <img class="logo-img" alt="深圳龙庭中央空调" src="//www.dmagic.cn/images/IconS/IconS_2568.png" />
        </a>

        <a class="logo-text-link" href="/">龙庭中央空调</a>
      </div>
      <button
        type="button"
        class="link-switch-mobile-menu navbar-toggle pull-left"
        v-bind:class="[(!isShowMenu)?'collapsed':'']"
        @click="swithMobileMenu"
      >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <div class="menu-box" v-if="isShowMenu" :style="styleMenuBox">
        <el-menu :default-active="activeIndex" class="el-menu-demo" :mode="menuMode">
          <template v-for="item in listMenu">
            <el-submenu
              :index="item.name+''"
              :key="item.name"
              v-if="item.sonMenu&&item.sonMenu.length"
            >
              <template slot="title">
                <span class>{{item.name}}</span>
              </template>
              <el-menu-item
                :index="sonItem.name+''"
                v-for="sonItem in item.sonMenu"
                :key="sonItem.name"
              >
                <a :href="sonItem.url">{{sonItem.name}}</a>
              </el-menu-item>
            </el-submenu>
            <el-menu-item :index="item.name+''" :key="item.name" v-else>
              <a :href="item.url">{{item.name}}</a>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
    </div>
  </div>
</template>



  

<script>
let T;
export default {
  data() {
    return {
      menuMode: "horizontal", //菜单模式
      activeIndex: "1",
      styleMenuBox: { display: "none" },

      listMenu: [
        { name: "首页", url: "/" },
        {
          name: "产品中心",
          url: "/productList",
          sonMenu: [
            { name: "单元式中央空调", url: "/productList/1" },
            { name: "多联式中央空调", url: "/productList/2" },
            { name: "冷水式中央空调", url: "/productList/3" },
            { name: "末端产品", url: "/productList/4" },
            { name: "新风机组", url: "/productList/5" }
          ]
        },

        { name: "工程案列", url: "/projectCaseList" },
        { name: "家用中央空调", url: "/subject_family" },

        {
          name: "空调维保",
          url: "javascript:;",
          sonMenu: [
            { name: "中央空调清洗", url: "/subject_clean" },
            { name: "中央空调保养", url: "javascript:;" }
          ]
        },
        {
          name: "关于我们",
          url: "/articleDetail/1",
          sonMenu: [
            { name: "联系我们", url: "/articleDetail/2" },
            { name: "企业新闻", url: "/articleList" }
          ]
        }
      ],

      isShowMenu: true //是否显示移动端菜单
    };
  },

  watch: {
    menuMode: {
      async handler(newVal, oldVal) {
        let flagShowMobileMenuOld = T.isShowMenu;
        T.isShowMenu = false;
        await T.$nextTick(); //延迟到视图更新
        T.isShowMenu = flagShowMobileMenuOld;
      }
    }
  },

  methods: {
    swithMobileMenu: function() {
      //函数：{移动端菜单开关函数}
      T.isShowMenu = !T.isShowMenu;
    },

    //函数：{响应界面函数}
    responseUI() {
      let { clientWidth } = document.body;
      if (clientWidth >= 640) {
        //Q1:{页面宽度}大于640
        T.menuMode = "horizontal";
        T.isShowMenu = true;
      } else {
        //Q2:{页面宽度}小于640
        T.menuMode = "vertical";
        T.isShowMenu = false;
      }
    }
  },
  beforeCreate() {
    T = this;
  },
  created() {},
  mounted() {
    //事件绑定：窗口变化
    window.addEventListener("resize", () => {
      T.responseUI(); //调用：{响应界面函数}
    });
    T.responseUI(); //调用：{响应界面函数}
    T.styleMenuBox = { display: "block" }; //移除菜单隐藏样式
  }
};
</script>

<style scoped>
.menu-box {
  float: right;
  width: 670px;
}

@media screen and (max-width: 640px) {
  /* 增大移动端下的超链接出发点 */
  .menu-box >>> .el-menu-item a {
    display: inline-block;
    width: 80%;
  }
  .menu-box {
    clear: both;
    width: 100%;
  }
}

.menu-box >>> .el-menu {
  border: none;
}

a {
  color: #666;
}
.home-head {
  /* width: 1200px; */
  margin-top: 20x;
  margin-bottom: 13px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}

/****************************盛联页头样式-START****************************/

.logo-img {
  width: 100%;
  height: 100%;
}

.link-switch-mobile-menu {
  display: none;
}

.logo-box {
  overflow: hidden;
  float: left;
}
.page-head-box {
  background-color: #fff;
}
@media screen and (max-width: 640px) {
  /*屏幕宽度小于640px*/
  .menu-hide {
    /*移动端菜单隐藏样式*/
    display: none;
  }
  .page-head-box {
    padding: 10px;
  }
  .logo-img-link {
    width: 60px;
    height: 40px;
    float: left;
    margin-right: 10px;
  }

  .logo-text-link:link,
  .logo-text-link:visited {
    color: #666;
    margin-top: 9px;
    font-size: 20px;
    height: 24px;
    line-height: 24px;
    display: inline-block;
  }
  .link-switch-mobile-menu {
    display: block;
    float: right;
  }
}

@media screen and (min-width: 640px) {
  .page-head-box {
    width: 1200px;
    padding-top: 15px;
    padding-bottom: 13px;
  }
  .logo-img-link {
    width: 90px;
    height: 60px;
    float: left;
    margin-right: 10px;
  }
  .logo-text-link:link,
  .logo-text-link:visited {
    color: #666;
    margin-top: 17px;
    font-size: 30px;
    height: 24px;
    line-height: 24px;
    display: inline-block;
  }
}

/****************************盛联页头样式-END****************************/

/*css开关按钮样式-Start*/

.navbar-toggle {
  position: relative;
  float: right;
  padding: 9px 10px;
  background-color: transparent;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}

.navbar-toggle .icon-bar {
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 1px;
}

.navbar-toggle .icon-bar {
  -webkit-transform-origin: 21px;
  -ms-transform-origin: 21px;
  transform-origin: 21px;
  -webkit-transition: -webkit-transform 0.2s, opacity 0.1s;
  transition: transform 0.2s, opacity 0.1s;
  height: 3px;
  width: 22px;
}

.navbar-toggle .icon-bar {
  background-color: #666;
}

.navbar-toggle .icon-bar + .icon-bar {
  margin-top: 4px;
}

.navbar-toggle:not(.collapsed) .icon-bar:nth-child(1) {
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.navbar-toggle:not(.collapsed) .icon-bar:nth-child(2) {
  opacity: 0;
}

.navbar-toggle:not(.collapsed) .icon-bar:nth-child(3) {
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

/*css开关按钮样式-End*/
</style>
