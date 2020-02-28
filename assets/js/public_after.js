let WIN;
if (typeof (window) === "undefined") {//如果{000}000
    WIN = global;
} else {
    WIN = window;
}
WIN.PUB = WIN.PUB || {}


import axios from "axios";
import moment from "moment";

console.log("PUB:", PUB);
{

    let T
    //变量：{需要微信登录的页面组件混入配置}
    WIN.MIX.pageWXLogin = {
        data() {
            return {
                wxUser: null,
            };
        },
        methods: {
            //函数：{从服务器获取缓存微信用户信息的函数}
            async getWXCahceUser() {
                //请求接口
                let { data } = await axios({
                    withCredentials: true, //携带cookie
                    method: "post",
                    url: `${PUB.domain}/api_third_part/get_wx_user_cache_longting`,
                    data: {}
                });

                this.wxUser = data.wxUserInfo;
                this.urlWxAuth = data.urlWxAuth;
                if (this.wxUser) {

                    util.setLocalStorageObj("wxUser", data.wxUserInfo)//调用：{设置一个对象到LocalStorage}

                    this.$store.commit("set_wxUser", data.wxUserInfo); //设置vuex-wxUser
                    //Q1:{微信用户已登录}

                } else {
                    //Q2:{微信用户未登录}
                    // T.$$msg({ type: "error", message: `微信用户未登录，跳转授权页${this.urlWxAuth}` })
                    this.gotoAuth(); //函数：{跳转到微信授权页面的函数}
                }

            },
            //函数：{跳转到微信授权页面的函数}
            gotoAuth() {
                if (!(this.wxUser || this.urlWxAuth))
                    return this.$$msg({ type: "error", message: `请先获取缓存微信用户信息` });

                window.location.href = this.urlWxAuth;
            },


        },
        beforeCreate() {
            T = this;
        },
        async mounted() {
            //如果在微信中
            if (util.inWX()) {
                let wxUser = util.getLocalStorageObj("wxUser")//调用：{从LocalStorage获取一个对象的函数}
                if (!wxUser) {//如果{LocalStorage中的微信用户信息}不存在
                    await this.getWXCahceUser(); //调用：{从服务器获取缓存微信用户信息的函数}
                } else {
                    this.wxUser = wxUser
                }

            }
        }
    }

}


Vue.prototype.$lodash = lodash//让vue实例中可访问$lodash
Vue.prototype.$moment = moment//让vue实例中可访问$moment

//#region DYDICT:数据字典

//#endregion
WIN.DYDICT = {}

DYDICT.arr_payStatus = [
    { label: "未支付", value: 1 },
    { label: "已支付", value: 2 },
    { label: "申请退款中", value: 3 },
    { label: "已退款", value: 4 },
]
DYDICT.payStatus = lodash.keyBy(DYDICT.arr_payStatus, 'value')

//#region FN：本站公共函数
WIN.FN = {}
WIN.FN.joinAddressStr = function (addressObj) {
    if (!addressObj) return;
    let { arrArea, detail } = addressObj;
    let provice = lodash.get(arrArea, `[0].label`);
    let city = lodash.get(arrArea, `[1].label`);
    let district = lodash.get(arrArea, `[2].label`);
    return `${provice}${city}${district} ${detail}`;
};



//函数：{获取规格链id函数}
FN.getIdSpecChian = function (arrSpecSelected) {
    let arrId = arrSpecSelected.map(doc => lodash.get(doc, `objSOp.__id`));
    return arrId.sort().join("__");

}

//函数：{获取规格链名称函数}
FN.getNameSpecChian = function (arrSpecSelected) {
    let arr = arrSpecSelected.map(doc => lodash.get(doc, `objSOp.name`));
    arr=arr.filter(doc=>doc)
    return arr.join(" + ");
}

//函数：{获取商品价格(区间)的函数}-可能存在多个价格
FN.getGoodsPrice = function (docGoods) {
    console.log("docGoods:#######", docGoods);
    let priceSpec;
    if (!docGoods.listSpecPrice) return docGoods.priceSell
    let arrPrice = docGoods.listSpecPrice.map(doc => {
        let { price } = doc;
        if (util.isNullUndefined(price)) {
            //如果未设置价格
            price = docGoods.priceSell || 0;
        }
        return price;
    });
    console.log("arrPrice:#######", arrPrice);
    let minPrice = Math.min(...arrPrice);
    let maxPrice = Math.max(...arrPrice);
    priceSpec = `${minPrice} ~ ${maxPrice}`;
    if (minPrice == maxPrice) {
        //如果价格都相等
        priceSpec = minPrice;
    }
    return priceSpec
}


//函数：{清空购物车缓存数据函数}
FN.clearCartCache = function () {
    util.setLocalStorageObj("objGoodsCart", { listGoods: [] }); //调用：{设置一个对象到LocalStorage}
}



//函数：{轻提示函数}-兼容移动端和PC端
FN.$$msg = function (param) {
    //参数以PC端为主，移动端去对应
    //定义变量获取屏幕视口宽度
    let widthWin = document.body.clientWidth;
    if (widthWin < 640) {
        if (param.type == "error") {//错误类型转换
            param.type = "fail"
        }
        this.$toast(param);
    } else {
        this.$message(param);
    }
}


Vue.prototype.$$msg = FN.$$msg;




//函数：{确认函数}-兼容移动端和PC端
FN.$$confirm = async function (str) {
    let clickStatus = await this.$dialog
        .confirm({
            title: str,
            // message: "删除后可重新购买"
        })
        .catch(() => { });


    return clickStatus

}

Vue.prototype.$$confirm = FN.$$confirm;


//函数：{支付微信订单函数}
FN.$payWxOrder = async function ({ param }) {
    console.log("FN.$payWxOrder");
    //请求接口
    let { data: docOrder } = await axios({
        withCredentials: true, //携带cookie
        method: "post",
        url: `${PUB.domain}/api_third_part/order_wx_longting`,
        data: param
    });
    console.log("docOrder:###", docOrder);
    if (docOrder.code != 0) {
        return { code: docOrder.code, message: docOrder.message ,docOrder}
        // return T.$$msg({ type: "error", message: docOrder.message });
    }
    let { appId, data } = docOrder;

    //这里不知道为何，不能解构package，可能是nuxt框架的保留字
    let { package: pack, nonceStr, paySign, timeStamp } = data;
    //调用：{调用网页微信支付控件的函数}
    let resWX = await util.callWXPay({
        appId: appId,
        nonceStr,
        paySign,
        timeStamp: timeStamp,
        package: pack
    });

    if (resWX.err_msg == "get_brand_wcpay_request:ok") {
        // 使用以上方式判断前端返回,微信团队郑重提示：
        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        return { code: 0, message: "支付成功",resWX,docOrder }
        
      } else {
        return { code: 1001, message: "支付失败" ,resWX,docOrder}
        
      }

 

}




//#endregion
