let WIN;
if (typeof (window) === "undefined") {//如果{000}000
    WIN = global;
} else {
    WIN = window;
}
WIN.PUB = WIN.PUB || {}


import axios from "axios";
import moment from "moment";

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


//变量：{需要微信JSSDK的混入配置}
{

    let T

    WIN.MIX.wx_js_sdk = {
        data() {
            return {
                wx: null,//微信对象
                objWxShare: {
                    title: "深圳市龙庭空调制冷有限公司", // 分享标题
                    desc: "提供专业的空调工程设计施工", // 分享描述
                    link: null, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: "http://qn-dmagic.dmagic.cn/longting/longting_logo_square.jpg", // 分享图标
                }

            };
        },
        methods: {

            async setWXJSSDK() {
                //如果在微信中
                if (util.inWX()) {
                    let url = document.URL.split("#")[0]; //获取当前页面地址，注意要去掉#后面部分

                    //变量：{参数对象}
                    let objParam = {
                        timestamp: util.getTimeStamp(),
                        noncestr: "nonceStr123",
                        url
                    };

                    let { data } = await axios({
                        //请求接口
                        method: "post",
                        withCredentials: true, //携带cookie aaa
                        url: `${global.PUB.domain}/api_third_part/get_wx_jssdk_sign`,
                        data: objParam
                    });

                    let signature = data.sign;
                    // alert111(`网址5：${url} \n签名：${signature}`);

                    // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    wx.config({
                        // debug: true,
                        appId: "wxdd969a55e83a3e13", // 必填，公众号的唯一标识
                        timestamp: objParam.timestamp, // 必填，生成签名的时间戳
                        nonceStr: objParam.noncestr, // 必填，生成签名的随机串
                        signature: signature, // 必填，签名
                        jsApiList: [
                            "updateAppMessageShareData", "updateTimelineShareData",
                            "showAllNonBaseMenuItem", "hideAllNonBaseMenuItem",
                            "closeWindow",
                            "getLocation", "openLocation"
                            , "openAddress"] // 必填，需要使用的JS接口列表
                    });

                    wx.ready(function () {
                        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                        T.objWxShare.link = url;//网址设置


                        //发送给朋友的信息配置
                        let param = {
                            title: "深圳市龙庭空调制冷有限公司", // 分享标题
                            desc: "提供专业的空调工程建设、维护保养、清洗服务", // 分享描述
                            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: "http://qn-dmagic.dmagic.cn/longting/longting_logo_square.jpg", // 分享图标
                            success: function () {
                                // 设置成功
                            }
                        }

                        Object.assign(param, T.objWxShare);//合并对象
                        wx.updateAppMessageShareData(param);

                        //朋友圈分享信息配置
                        let paramTimeline = {
                            ...T.objWxShare,
                            success: function () {
                                // 用户点击了分享后执行的回调函数
                            }
                        }
                        wx.updateTimelineShareData(paramTimeline)


                        wx.showAllNonBaseMenuItem();



                    });
                    wx.error(function (res) {
                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        // alert("wx.error")

                    });
                }
            },
            wx_getLocation: function () {
                if (!wx) return
                wx.getLocation({//
                    type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
                    success: function (res) {
                        alert(`纬度：${res.latitude};经度：${res.longitude};`);
                        wx.openLocation({
                            latitude: res.latitude, // 纬度，范围为-90~90，负数表示南纬
                            longitude: res.longitude, // 经度，范围为-180~180，负数表示西经
                            scale: 8, // 缩放比例
                            name: "龙庭空调",
                            address: "平湖茗萃园",
                            success: function (r) {
                                alert("openLocation-success");
                            }
                        })
                    }
                })
            },
            wx_openAddress() {
                wx.openAddress({
                    success: function (res) {
                        var userName = res.userName; // 收货人姓名
                        var postalCode = res.postalCode; // 邮编
                        var provinceName = res.provinceName; // 国标收货地址第一级地址（省）
                        var cityName = res.cityName; // 国标收货地址第二级地址（市）
                        var countryName = res.countryName; // 国标收货地址第三级地址（国家）
                        var detailInfo = res.detailInfo; // 详细收货地址信息
                        var nationalCode = res.nationalCode; // 收货地址国家码
                        var telNumber = res.telNumber; // 收货人手机号码


                        alert(`userName:${userName}postalCode:${postalCode};provinceName:${provinceName};cityName:${cityName};countryName:${countryName};detailInfo:${detailInfo};nationalCode:${nationalCode};telNumber:${telNumber};`)
                    }
                });

            }


        },
        beforeCreate() {
            T = this;
        },
        async mounted() {
            T.wx = wx;
            T.setWXJSSDK()//调用：{设置微信JS-SDK函数}
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
    arr = arr.filter(doc => doc)
    return arr.join(" + ");
}

//函数：{获取商品价格(区间)的函数}-可能存在多个价格
FN.getGoodsPrice = function (docGoods) {
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
    //请求接口
    let { data: docOrder } = await axios({
        withCredentials: true, //携带cookie
        method: "post",
        url: `${PUB.domain}/api_third_part/order_wx_longting`,
        data: param
    });
    if (docOrder.code != 0) {
        return { code: docOrder.code, message: docOrder.message, docOrder }
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
        return { code: 0, message: "支付成功", resWX, docOrder }

    } else {
        return { code: 1001, message: "支付失败", resWX, docOrder }

    }



}




//#endregion
