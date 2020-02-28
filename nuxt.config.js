import axios from "axios";
import lodash from "lodash";

let domain = "https://www.dmagic.cn";


let port = 30011;//生成环境使用
if (process.env.NODE_ENV == "development") {//如果是开发环境
  port = 30012;
}

export default {
  mode: 'universal',
  server: {
    port: port, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },

      { name: 'viewport', content: 'width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      // { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'http://www.dmagic.cn/images/IconS/IconS_2568.png' },
      // { rel: 'stylesheet', href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css' },
      { rel: 'stylesheet', href: 'http://qn-static.dmagic.cn/element-ui@2.12.0/index.css' },
      { rel: 'stylesheet', href: 'http://qn-static.dmagic.cn/public.1.0.5.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/vant@2.4/lib/index.css' }
    ],
    script: [
      // { src: 'https://cdn.jsdelivr.net/npm/vant@2.4/lib/vant.min.js',  defer: true },
      // { src: 'http://qn-static.dmagic.cn/polyfill.min.js' },
      // { src: 'http://qn-static.dmagic.cn/vue@2.6.10/vue.js' },
      // { src: 'http://qn-static.dmagic.cn/vuex@3.0.1/vuex.min.js' },
      // { src: 'http://qn-static.dmagic.cn/vue-router@3.0.1/vue-router.min.js' },
      // { src: 'http://qn-static.dmagic.cn/axios@0.15.3/axios.min.js' },
      // { src: 'http://qn-static.dmagic.cn/lodash@4.17.5/lodash.min.js' },
      // // { src: 'http://qn-static.dmagic.cn/element-ui/element-ui.js' },
      // { src: 'http://qn-static.dmagic.cn/util.1.2.3.js' },
      // { src: 'http://qn-static.dmagic.cn/config_base_sys_longting.1.0.3.js' },
      // { src: 'http://qn-static.dmagic.cn/config_detail.1.0.4.js' },

    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~plugins/ElementUI',
      ssr: true,
    },
    {
      src: '~plugins/vant',
      ssr: true,
    },
    //这个lodash没什么用
    { src: '~plugins/lodash.js', ssr: false },
    { src: '~assets/js/public.js', ssr: true },//服务端public
    { src: '~assets/js/util.1.2.2.js', ssr: true },//服务端util****
    { src: '~assets/js/public_after.js', ssr: true },//public_after

    //  { src: 'http://qn-static.dmagic.cn/config_detail.1.0.4.js', ssr: false },//服务端util****

    //dm组件库用于nuxt项目服务端渲染，失败，提示MIX undefinded
    // {
    //   src: '~plugins/dmagic-components',
    //   ssr: true,
    // },

    // { src: 'http://qn-static.dmagic.cn/util.1.1.8.js', ssr: true },//服务端util****
  ],
  css: [
    '~assets/css/longting.css'
    // 'element-ui/lib/theme-chalk/index.css'
  ],
  vendor: ['element-ui'],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  //生成静态资源的配置-这个后期维护比较麻烦！！！！
  generate: {
    async  routes() {
      let arrRoute = [];
      {
        //ajax获取分类列表
        let { data: { list } } = await axios({
          method: "post",
          url: `${domain}/crossList?page=longting_product_category`,
          data: {
            pageSize: 999,
            sortJson: { P1: 1 }
          }
        });
        list.forEach(itemEach => {//循环：{列表数组}
          arrRoute.push(`/productList/${itemEach.P1}`)
        })

      }
      {
        //ajax获取产品列表
        let { data: { list } } = await axios({
          method: "post",
          url: `${domain}/crossList?page=longting_product`,
          data: {
            pageSize: 999,
            sortJson: { P1: 1 }
          }
        });
        list.forEach(itemEach => {//循环：{列表数组}
          arrRoute.push(`/productDetail/${itemEach.P1}`)
        })

      }
      {
        //ajax获取文章分类列表
        let { data: { list } } = await axios({
          method: "post",
          url: `${domain}/crossList?page=longting_article_category`,
          data: {
            pageSize: 999,
            sortJson: { P1: 1 }
          }
        });
        list.forEach(itemEach => {//循环：{列表数组}
          arrRoute.push(`/articleList/${itemEach.P1}`)
        })

      }
      {
        //ajax获取文章列表
        let { data: { list } } = await axios({
          method: "post",
          url: `${domain}/crossList?page=longting_article`,
          data: {
            pageSize: 999,
            sortJson: { P1: 1 }
          }
        });
        list.forEach(itemEach => {//循环：{列表数组}
          arrRoute.push(`/articleDetail/${itemEach.P1}`)
        })

      }


      {
        //ajax获取新案例列表
        let { data: { list } } = await axios({
          method: "post",
          url: `${domain}/crossList?page=longting_case`,
          data: {
            pageSize: 999,
            sortJson: { P1: 1 }
          }
        });
        list.forEach(itemEach => {//循环：{列表数组}
          arrRoute.push(`/projectCaseDetail/${itemEach.P1}`)
        })

      }
      //函数：{处理列表数据函数}
      let fnHandaleList = function (list) {
        return list.map(doc => {
          return {
            _id: lodash.get(doc, `targetDoc._id`),
            title: lodash.get(doc, `targetDoc.title`),
            link: lodash.get(doc, `targetDoc.link`),
            imgSrc: lodash.get(doc, `targetDoc.album[0].url`)
          };
        });
      };

      {
        let { data } = await axios({
          method: "post",
          url: `${domain}/info/getCommonGroupList`,
          data: {
            _systemId: "sys_longting",
            groupId: "5e2eab695a1ded33780f1f2e"
          }
        });

        let listCase = lodash.get(data, `list[2].sonList`); //变量：{案例列表}
        listCase = fnHandaleList(listCase); //调用：{处理列表数据函数}
        listCase.forEach(itemEach => {//循环：{列表数组}
          arrRoute.push(`/data_detail/${itemEach._id}`)
        })

      }


      return arrRoute
    }
  }
}
