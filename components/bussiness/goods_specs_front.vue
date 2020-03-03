<template>
  <div>
    <!-- <div class="MB10">arrSpecSelected: {{arrSpecSelected}}</div> -->
    <!-- <div class>listSpecs: {{listSpecs}}</div> -->
    <!--    
    <div class>IN_listSpecPrice: {{IN_listSpecPrice}}</div>
    <div class>dictSpecPrice: {{dictSpecPrice}}</div>-->

    <div class="n-cover" v-if="isShowSpecPannel" @click="isShowSpecPannel=false"></div>

    <div class="n-bottom-bar" style="z-index:201" v-if="isShowSpecPannel">
      <div class="MB10 DPF">
        <img class="goods_spec_img MR6" :src="imgSrcSpec" alt />
        <div class style="flex:1">
          <div class="LH30">{{docGoods.title}}</div>
          <div class>
            <i class="n-icon-rmb">￥</i>
            <i class="n-icon-money FS18 C_f00">{{priceSpec}}</i>
          </div>
        </div>
        <i class="el-icon-close FS18 Cur1 H50" style="padding:10px" @click="isShowSpecPannel=false"></i>
      </div>
      <div class="spec-box MB10" v-for="(specEach,i) in IN_listSpecs" :key="specEach.__id">
        <div class="CL1" v-if="isShowSpec(specEach)">
          <div class="spec-name">{{specEach.name}}</div>
          <i
            class="btn-spec"
            :class="{'focus':focusItem(i,itemEach.__id)}"
            v-for="(itemEach) in specEach.options"
            :key="itemEach.__id"
            @click="changeItem(itemEach,specEach)"
          >
            <img :src="itemEach.imgSrc" alt v-if="itemEach.imgSrc" />
            <s>{{itemEach.name}}</s>
          </i>
        </div>
      </div>
      <div class="MB10 CL1">
        <b>购买数量：</b>
        <span>
          <el-input-number size="small" v-model="countBuy" :min="1" :max="999" label="描述文字"></el-input-number>
        </span>
      </div>
      <!-- <el-button type="primary" @click="addCart" v-if="typeBuy=='cart'">确定加入购物车</el-button>
      <el-button type="primary" >确定直接购买</el-button>-->
      <van-button type="info" size="large" @click="addCart" v-if="typeBuy=='cart'">确定加入购物车</van-button>
      <van-button type="info" size="large" @click="buy" v-if="typeBuy=='buy'">确定直接购买</van-button>
    </div>
    <div class="n-bottom-bar H50">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :info="countCartGoods?countCartGoods:null"
          @click="goCart"
        />
        <van-goods-action-button type="warning" text="加入购物车" @click="showPannel('cart')" />
        <van-goods-action-button type="danger" text="立即购买" @click="showPannel('buy')" />
      </van-goods-action>
    </div>
    <!-- <div class="n-bottom-bar DPF">
      <a class="ML100 MT10" href="/user/cart" style="flex:1">
        <el-badge :value="countCartGoods" :max="99" class="item MR20" :hidden="countCartGoods==0">
          <i class="el-icon-shopping-cart-2 FS24"></i>
        </el-badge>
      </a>
      <div class>
        <el-button size="normal" type="primary" @click="showPannel('cart')">加入购物车</el-button>
        <el-button size="normal" @click="showPannel('buy')">直接购买</el-button>
      </div>
    </div>-->
  </div>
</template>

<script>
let T;
export default {
  components: {},
  props: {
    docGoods: {},
    listSpecs: {},
    listSpecPrice: {}
  },

  data() {
    return {
      typeBuy: "", //购买方式
      isShowSpecPannel: false, //是否显示规格选择
      countCartGoods: null, //购物车商品种数
      countBuy: 1,

      imgSrcSpec: "",
      priceSpec: null,
      //存储已选规格项的数组
      arrSpecSelected: null,
      //数据字典-规格价格表
      dictSpecPrice: {},
      IN_listSpecs: null,
      IN_listSpecPrice: null
    };
  },
  methods: {
    //函数：{跳转到购物车函数}
    goCart: function(typeBuy) {
      window.location.href = "/user/cart";
    },
    //函数：{返回是否显示规格的逻辑标记的函数}
    isShowSpec(specEach) {
      let flag = true;
      //如果当前规格存在显示条件
      if (specEach.objSpecTerm) {
        console.log("存在显示条件:");
        let indexTerm; //条件规格所在的位置
        let nameTerm; //条件值
        //遍历条件对象，key和value都要用到
        for (var prop in specEach.objSpecTerm) {
          indexTerm = T.listSpecs.findIndex(doc => doc.name == prop);
          nameTerm = specEach.objSpecTerm[prop];
        }
        //变量：{当前条件列选中的名称}
        let name = lodash.get(T.arrSpecSelected, `[${indexTerm}].objSOp.name`);
        console.log("name:", name);
        if (name != nameTerm) {
          //如果{000}000
          flag = false;
        }
      }

      return flag;
    },
    //函数：{显示规格面板函数}
    showPannel: function(typeBuy) {
      T.isShowSpecPannel = true;
      T.typeBuy = typeBuy;
    },
    //函数：{初始化函数}
    init: function() {
      //初始化已选项
      T.arrSpecSelected = T.IN_listSpecs.map(doc => {
        let { __id, name } = doc;
        return { __id, name, objSOp: null };
      });

      T.initIconCart(); //调用：{初始化购物车图标函数}
    },
    //函数：{初始化购物车图标函数}
    initIconCart: function() {
      //调用：{从LocalStorage获取一个对象的函数}
      let objGoodsCart = util.getLocalStorageObj("objGoodsCart");
      objGoodsCart = objGoodsCart || { listGoods: [] };
      T.countCartGoods = objGoodsCart.listGoods.length;
    },
    //函数：{点击购买函数}
    buy() {
      if (T.isCompleteSelected()) {
        //Q1:选择规格完整
        let objGoods = T.getObjGoods(); //调用：{获取当前商品对象函数}
        let orderData = util.getLocalStorageObj("orderData") || {};
        Object.assign(orderData, {
          priceOrder: objGoods.priceTotal,
          listGoods: [objGoods]
        }); //合并对象
        util.setLocalStorageObj("orderData", orderData); //调用：{设置一个对象到LocalStorage}
        window.location.href = "/user/confirm_order?type=direct_buy";
      } else {
        //Q2:选择规格不完整

        T.$$msg({ type: "error", message: "请选择完整规格" });
      }
    },
    //函数：{加入购物车函数}
    addCart: function() {
      if (T.isCompleteSelected()) {
        let objGoods = T.getObjGoods(); //调用：{获取当前商品对象函数}
        T.goodsAddCart(objGoods); //调用：{商品加入到购物车函数}
        T.initIconCart(); //调用：{初始化购物车图标函数}

        T.$$msg({ type: "success", message: "加入购物车成功" });

        T.isShowSpecPannel = false;
      } else {
        //Q2:选择规格不完整
        T.$$msg({ type: "error", message: "请选择完整规格" });
      }
    },
    //函数：{一组商品加入到购物车函数}-多种情况
    goodsAddCart: function(objGoods) {
      //调用：{从LocalStorage获取一个对象的函数}
      let objGoodsCart = util.getLocalStorageObj("objGoodsCart");
      objGoodsCart = objGoodsCart || { listGoods: [] };

      let isExist; //变量：{同种商品是否存在}

      objGoodsCart.listGoods.forEach(goodsEach => {
        let { _id, arrSpec = [] } = goodsEach;
        //变量：{遍历到商品的规格链id}
        let idSpecChainEach = FN.getIdSpecChian(arrSpec); //调用：{获取规格链id函数}
        //变量：{当前商品的规格链id}
        let idSpecChainCurr = FN.getIdSpecChian(objGoods.arrSpec); //调用：{获取规格链id函数}
        let flag = _id == objGoods._id && idSpecChainCurr == idSpecChainEach;
        //Q1:同“商品id”和“规格Id链”的商品已存在
        if (flag) {
          isExist = true;
          goodsEach.count += objGoods.count; //购买数量叠加
          goodsEach.priceTotal += objGoods.priceTotal; //总价叠加
        }
      });

      if (!isExist) {
        //Q1:{同种商品是否存在}为真
        objGoodsCart.listGoods.unshift(objGoods); //加入一组商品
      }

      //调用：{设置一个对象到LocalStorage}
      util.setLocalStorageObj("objGoodsCart", objGoodsCart);
    },
    //函数：{获取当前商品对象函数}
    getObjGoods: function() {
      let { _id, title, deliveryDesc } = T.docGoods;
      let objGoods = {
        _id,
        idSpecChain: FN.getIdSpecChian(T.arrSpecSelected), //调用：{获取规格链id函数}
        nameSpecChain: FN.getNameSpecChian(T.arrSpecSelected), //调用：{获取规格链名称函数}
        title,
        imgSrc: T.imgSrcSpec,
        count: T.countBuy,
        priceSell: T.priceSpec,
        priceTotal: T.priceSpec * T.countBuy,
        arrSpec: T.arrSpecSelected,
        deliveryDesc
      };
      return objGoods;
    },

    //函数：{判断规格是否选择完整的函数}
    isCompleteSelected() {
      let flag = T.arrSpecSelected.every(doc => !!doc.objSOp);
      //当T.arrSpecSelected的objSOp都存在时，代表已选择完
      return flag;
    },
    //函数：{规格项变动函数}
    changeItem(itemEach, specEach) {
      console.log("changeItem:#####");
      let dictTerm = { 机型: "风管机" };

      //变量：{受影响的规格数组}
      let arrSpecRel = [];

      T.listSpecs.forEach((doc, index) => {
        if (doc.objSpecTerm) {
          //如果添加对象中存在当前规格的name
          for (var prop in doc.objSpecTerm) {
            if (prop == specEach.name) {
              arrSpecRel.push({
                keyTerm: prop,
                index,
                objSpecTerm: doc.objSpecTerm
              });
            }
          }
        }
      });

      console.log("arrSpecRel:######", arrSpecRel);
      //循环：{受影响的规格数组}
      arrSpecRel.forEach(docEach => {
        let { keyTerm, index, objSpecTerm } = docEach;
        console.log("当前规格是条件规格，将影响已选规格项");
        //如果不满足条件，
        if (itemEach.name != objSpecTerm[keyTerm]) {
          console.log("不满足@@@@");
          T.arrSpecSelected[index].objSOp = {}; //将选项设置为空对象
        } else {
          T.arrSpecSelected[index].objSOp = null; //将选项设置为空对象

          console.log("满足");
        }
      });

      let { __id: idSpec } = specEach;
      //变量：{匹配的已选项}
      let itemTarget = T.arrSpecSelected.find(doc => doc.__id == idSpec);
      itemTarget.objSOp = itemEach;
      T.updateImg(itemEach); //调用：{规格变动后更新商品图片的函数}
      T.updatePrice(); //函数：{规格变动后更新商品价格函数}
    },
    //函数：{规格变动后更新商品价格函数}
    updatePrice() {
      if (T.isCompleteSelected()) {
        console.log(":#######选择规格完整");
        //Q1:选择规格完整
        let idSpecChain = FN.getIdSpecChian(T.arrSpecSelected); //调用：{获取规格链id函数}
        let price = lodash.get(T.dictSpecPrice, `${idSpecChain}.price`); //从数据字典获取价格
        T.priceSpec = price;
        if (util.isNullUndefined(price)) {
          console.log(":#######数据字典规格价格不存在");
          //如果数据字典规格价格不存在
          T.priceSpec = FN.getGoodsPrice(T.docGoods);
        }
      } else {
        console.log(":#######选择规格不完整");
        //Q2:选择规格不完整
        T.priceSpec = FN.getGoodsPrice(T.docGoods); //调用：{获取商品价格(区间)的函数}
      }
      console.log("T.priceSpec:#######", T.priceSpec);
    },
    //函数：{规格变动后更新商品图片的函数}
    updateImg(itemEach) {
      let { imgSrc } = itemEach;
      let specHasImg = T.arrSpecSelected.find(doc =>
        lodash.get(doc, `objSOp.imgSrc`)
      );
      if (specHasImg) {
        //如果imgSrc存在
        T.imgSrcSpec = specHasImg.objSOp.imgSrc;
      } else {
        T.imgSrcSpec = T.docGoods.imgSrc;
      }
    },
    //函数：{规格项变动函数}
    focusItem(indexSpec, idItem) {
      //变量：{当前规格组的已选的规格项id}
      let IdSelected = lodash.get(
        T.arrSpecSelected,
        `[${indexSpec}].objSOp.__id`
      );
      if (IdSelected == idItem) {
        return "primary";
      }
    }
  },
  beforeCreate() {
    T = this;
    console.log("T.$$msg:####222", T.$$msg);
  },
  created() {
    let { docGoods, listSpecs, listSpecPrice } = T.$props;
    T.IN_listSpecs = lodash.cloneDeep(listSpecs);
    T.IN_listSpecPrice = lodash.cloneDeep(listSpecPrice);
  },
  mounted() {
    T.init(); //调用：{初始化函数}

    T.dictSpecPrice = lodash.keyBy(T.IN_listSpecPrice, "id");
    T.updatePrice(); //函数：{规格变动后更新商品价格函数}

    T.imgSrcSpec = T.docGoods.imgSrc;
  }
};
</script>

<style scoped>
.spec-box .spec-name {
  line-height: 30px;
  font-weight: 700;
}

.n-icon-rmb {
  font-size: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-style: normal;
}
.n-icon-money {
  color: #f00;
  font-family: Arial;
  font-style: normal;
}

.goods_spec_img {
  border: 1px #ddd solid;
  width: 60px;
  height: 60px;
}

.n-bottom-bar {
  box-shadow: 2px 2px 10px #999;
}


 /****************************规格按钮-START****************************/
.btn-spec {
  float: left;
  display: flex;
  border-radius: 5px;
  color: #666;
  padding: 0 4px;
  height: 36px;
  line-height: 36px;
  background: #f7f8fa;
  cursor: pointer;
  font-size: 14px;
  margin: 0 8px 8px 0;
  font-style: normal;
  min-width: 40px;
}

.btn-spec.focus {
  color: #ee0a24;
  background: #fde7e9;
}

.btn-spec img {
  width: 30px;
  height: 30px;
  margin-right: 4px;

  align-self: center;
}
.btn-spec s {
  text-decoration: none;
  display: inline-block;
  min-width: 32px;
  text-align: center;
  padding: 0 4px;
 
}
 /****************************规格按钮-END****************************/

</style>
