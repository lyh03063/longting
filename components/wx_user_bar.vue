<template>
  <div class="n-wx-user-bar" v-if="wxUserNeed">
    <div style="flex:1">
      <a :href="`/user`" class="DPF">
        <img class="n-head-img" :src="wxUserNeed.headimgurl" alt />
        <!-- <div class="n-nickname">{{wxUser.nickname}}</div> -->
      </a>
    </div>
  </div>
</template>

<script>
let T;
export default {
  // props: [],
  computed: {
    wxUser() {
      let wxUser = T.$store.state.wxUser; //读取vuex
      return wxUser;
    }
  },
  watch: {
    wxUser: {
      handler(newVal, oldVal) {
        console.log("wxUser changed");
        console.log("newVal:", newVal);
        if (newVal) {
          //如果{000}000
          T.wxUserNeed = newVal;
        }
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      wxUserNeed: null
    };
  },
  methods: {},
  beforeCreate() {
    T = this;
  },
  mounted() {
    T.wxUserNeed = util.getLocalStorageObj("wxUser"); //调用：{从LocalStorage获取一个对象的函数}

    // T.$store.commit("set_wxUser", { msg: 1 }); //设置vuex-wxUser

 
  }
};
</script>
<style scoped>
.n-wx-user-bar .n-head-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5px;
}
.n-wx-user-bar .n-head-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5px;
}

.n-wx-user-bar .n-nickname {
  line-height: 40px;
}
</style>
