
import lodash from "lodash";

console.log(typeof (window));
let WIN;
if (typeof (window) === "undefined") {//如果{000}000
    WIN = global;
} else {
    WIN = window;
}
WIN.PUB = {}
WIN.lodash = lodash//ladash加入全局变量
WIN.PUB.domain="https://www.dmagic.cn"
 //WIN.PUB.domain = "http://localhost:3000"
//WIN.PUB.domain = 'http://test.dmagic.cn'
// WIN.PUB.urlUpload = `${PUB.domain}/api_third_part/qiniu_upload?scope=test`
WIN.PUB.urlUpload = `https://up-z2.qiniup.com`//七牛云上传地址（域名）
WIN.PUB.urlGetQiniuToken = `${PUB.domain}/api_third_part/get_qiniu_token?scope=test`


WIN.PUB.systemName = "深圳龙庭后台系统";
WIN.PUB.KeySys = "longting";
WIN.PUB._systemId = `sys_${PUB.KeySys}`;



WIN.util = {}
//#region deepCopy:深拷贝函数
util.deepCopy = function (obj) {//深拷贝一个Json对象的函数
    return lodash.cloneDeep(obj);
}
//#endregion


//#region type:返回对象数据类型函数
let class2type = {},
    //用于记录[object class]样式  
    arrObjs = "Boolean Number String Function Array Date RegExp Null Undefined".split(" ");
for (var i = 0, l = arrObjs.length; i < l; i++) {
    class2type["[object " + arrObjs[i] + "]"] = arrObjs[i].toLowerCase();
}
util.type = function (obj) {
    return class2type[Object.prototype.toString.call(obj)] || "object";
};
//#endregion
//#region timeout:基于promise的延迟函数
util.timeout = function (ms) {//使用promise封装一个延迟方法
    return new Promise((resolve) => {//resolve延迟解决后的回调函数, reject延迟异常的处理函数
        setTimeout(resolve, ms, 'done');
    });
}
//#endregion
//#region getTimeStatus:获取时间段状态函数
/**
 * 
 * @param {开始时间} _json.startTime
 * @param {结束时间} _json.endTime
 *  @param {当前时间} _json.currTime
 */
util.getTimeStatus = function (param) {//
    let { start, end, now } = param;
    let flag = 2;
    let msg = "进行中";
    if (!(start && end)) {
        start = start || "——";
        end = end || "——";
        flag = 4;
        msg = "时间段设置有误，时间段不完整";
        return { flag, msg, start, end }
    }
    let fomatStr = "YYYY-MM-DD HH:mm";
    now = now || moment();
    now = moment(now).format(fomatStr);
    start = moment(start).format(fomatStr);
    end = moment(end).format(fomatStr);
    //先格式化才能正确比较大小
    if (start > end) {
        start = start || "——";
        end = end || "——";
        flag = 4;
        msg = "时间段设置有误，开始时间大于结束时间";
        return { flag, msg, start, end }
    }
    if (now < start) {//如果当前时间小于开始时间
        msg = "未开始";
        flag = 1;
    } else if (now > end) {//如果当前时间大于结束时间
        flag = 3;
        msg = "已结束";
    }
    return { flag, msg, start, end, now }
}
//#endregion
//#region ajaxPopulate:ajax填充数据列表的某个字段函数
/**ajax填充数据列表的某个字段函数
 * 可用于动态数据字典
 */
util.ajaxPopulate = async function (populateConfig) {
    let { listData, page, populateColumn, idColumn, idColumn2, findJson = {} } = populateConfig;
    let arrId = [];
    listData.forEach(itemEach => {//循环：{原数据数组}
        let idEach = itemEach[idColumn]
        if (idEach) {//如果{idEach}存在
            if (util.type(idEach) == "array") {//Q1:idEach是数组
                arrId = arrId.concat(idEach);//拼接
            } else {//Q2:idEach不是数组
                arrId.push(idEach);
            }
        }
    })
    arrId = Array.from(new Set(arrId))//去重
    console.log("arrId#####", arrId);
    //变量：{填充查询条件}
    let findJsonNeed = {
        [idColumn2]: {
            "$in": arrId
        }
    }
    Object.assign(findJsonNeed, findJson);//合并对象
    let { data } = await axios({
        //请求接口
        method: "post",
        url: WIN.PUB.domain + `/crossList?page=${page}`,
        data: {
            findJson: findJsonNeed, pageSize: 999
        } //传递参数
    });
    var dict = lodash.keyBy(data.list, idColumn2)
    listData.forEach(itemEach => {//循环：{原数据数组}
        let idEach = itemEach[idColumn]
        if (idEach) {//如果{idEach}存在
            if (util.type(idEach) == "array") {//Q1:idEach是数组
                itemEach[populateColumn] = [];
                idEach.forEach(idOneEach => {//循环：{id数组}
                    itemEach[populateColumn].push(dict[idOneEach])
                })
            } else {//Q2:idEach不是数组
                itemEach[populateColumn] = dict[idEach]
            }
        }
    })
    return util.deepCopy(listData);//深拷贝，返回一个全新的对象
    //return listData
}
//#endregion
//#region stringify:json转字符串函数（含function处理）
util.stringify = function (_json) {//函数定义：{json转字符串函数（含function处理）}
    var strJson = JSON.stringify(_json, function (key, val) {
        if (typeof val === "function") {
            return val + ""; //将函数代码转换成字符串
        }
        return val;
    });
    return strJson
}
//#endregion
//#region parseJson:字符串转json函数（含function还原处理）
util.parseJson = function (str) {//函数定义：{字符串转json函数（含function还原处理）}
    //将带function字符串的还原成真正发function
    let json = JSON.parse(str, function (k, v) {
        if (v.indexOf && v.indexOf("function") > -1) {
            return eval("(function(){return " + v + " })()");
        }
        return v;
    });
    return json;
}
//#endregion
//#region moveData:数组元素上下移动函数
util.moveData = function (index, type, list) { //函数：{数据移动函数}-注意调用对象的KEY等配置
    list = list || this[this.KEY.arrRelate];//KEY配置相关数组
    let objIndex = {
        "up": index - 1,
        "down": index + 1,
        "top": 0,
        "bottom": list.length,
    }
    if ((type == "up" || type == "top") && index < 1) { //如果已到最上
        return alert("已到最上");
    } else if ((type == "down" || type == "bottom") && index >= list.length - 1) { //如果已到最上
        return alert("已到最底");
    }
    let doc = list[index]
    list.splice(index, 1); //先删除
    list.splice(objIndex[type], 0, doc); //再插入
};
//#endregion


//#region sortByArrId:根据id数组重排集合的函数
util.sortByArrId = function (param) {
    let { list, idKey = "P1", arrId } = param;
    if (!(list && list.length && arrId && arrId.length)) return list;
    var dict = lodash.keyBy(list, idKey); //转成数据字段，方便重排
    let arrNeed = arrId.map(id => dict[id]); //获取排序后的列表数据
    arrNeed = arrNeed.filter(doc => doc)//过滤null的数据
    return arrNeed; //获取排序后的列表数据
};
//#endregion
//#region toFixed/money:将数字转换成保留小数点，默认2位
util.toFixed = function (num, length = 2) {
    num = parseFloat(num);
    let result;
    if (isNaN(num) || num == 0 || num === undefined || num === null) {//结果为数字
        num = 0;
    }
    result = Number(num.toFixed(length));
    return result
}
util.money = util.toFixed;
//#endregion
//#region getTimeRandom:返回带时间戳的随机数
util.getTimeRandom = function () {
    return moment().format("YYYYMMDDHHmmSSsss_") + lodash.random(99999)
};
//#endregion
//#region handelItem:处理字段数组的某个字段配置的函数

util.handelItem = function (cf) {
    let { action, items, prop, itemNew, key = "prop" } = cf;
    if (!items) return;
    let index = items.findIndex(item => item[key] == prop);
    if (index < 0) return;//找不到目标，return
    if (action == "replace") {//Q1:replace
        this.$set(items, index, itemNew); //修改memberId对应的字段配置
    } else if (action == "delete") { //Q2:delete
        items.splice(index, 1)
    }

}
// 
//#endregion


//#region setListPower:根据当前角色权限设置列表配置的函数-需要用到window.rolePower变量

util.setListPower = function (cfList) {

    let { powerPath } = cfList;
    if (!powerPath) return cfList

    let hasPowerAdd = lodash.get(WIN.rolePower, `${powerPath}.add`);
    //如果没有新增权限
    if (!hasPowerAdd) {
        //删除新增按钮
        util.handelItem({ items: cfList.batchBtns.addon, action: "delete", key: "eventType", prop: "add" })
    }
    let hasPowerDelete = lodash.get(WIN.rolePower, `${powerPath}.delete`);
    //如果没有删除权限
    if (!hasPowerDelete) {
        //删除单项删除按钮
        util.handelItem({ items: cfList.singleBtns.addon, action: "delete", key: "eventType", prop: "delete" })
        //删除批量删除按钮
        util.handelItem({ items: cfList.batchBtns.addon, action: "delete", key: "eventType", prop: "delete" })
    }

    let hasPowerModify = lodash.get(WIN.rolePower, `${powerPath}.modify`);
    //如果没有修改权限
    if (!hasPowerModify) {
        //删除单选修改按钮
        util.handelItem({ items: cfList.singleBtns.addon, action: "delete", key: "eventType", prop: "modify" })

    }
    return cfList
};
//#endregion

//#region setLocalStorageObj:设置一个对象到LocalStorage函数
util.setLocalStorageObj = function (key, val) {

    if (util.type(val) == "array" || util.type(val) == "object") {//Q1:数据类型是数组活对虾
        val = JSON.stringify(val);//Json对象转换Json字符串
    }
    localStorage[key] = val

}
//#endregion


//#region getLocalStorageObj:从LocalStorage获取一个对象的函数
util.getLocalStorageObj = function (key) {
    if (!localStorage[key]) return false;
    return JSON.parse(localStorage[key]);//

}
//#endregion



//#region cfList:标准列表的一些配置项
util.cfList = {}
util.cfList.bBtns = {}
util.cfList.bBtns.add = {
    text: "新增",
    eventType: "add",
    cfElBtn: {
        type: "primary",
    }
}
util.cfList.bBtns.delete = {
    text: "删除选中",
    eventType: "delete",
    needSelect: true,
    cfElBtn: {}
}

util.cfList.sBtns = {}



util.cfList.sBtns.detail = {
    title: "详情",
    eventType: "detail",
    cfElBtn: {
        circle: true,
        icon: "el-icon-notebook-2"
    }
}
util.cfList.sBtns.modify = {
    title: "编辑",
    eventType: "modify",
    cfElBtn: {
        circle: true,
        icon: "el-icon-edit"
    }
}
util.cfList.sBtns.delete = {
    title: "删除",
    eventType: "delete",
    cfElBtn: {
        circle: true,
        icon: "el-icon-close"
    }
}


//#endregion


//#region setObjDefault:给一个对象设置默认属性（但不整个替换对象，并且默认属性优先级低于已有属性）
util.setObjDefault = function (obj, objDeault) {
    //for of循环遍历对象，for of不能直接处理对象，本质上是同个Object.keys拼装一个新数组进行辅助
    console.log("Object.objDeault结果", Object.keys(objDeault));
    for (var key of Object.keys(objDeault)) {
        if (obj[key] === null || obj[key] === undefined) {//如果属性不存在
            obj[key] = objDeault[key]
        }
    }


}
//#endregion
//#region setObj:拓展vue实例的data数据函数
util.setObj = function (path, extend) {
    let objOld = lodash.get(this, path);
    let objNew = lodash.cloneDeep(objOld);
    if (objNew === null || objNew === undefined) {//如果{000}000
        objNew = {}
    }
    Object.assign(objNew, extend);//合并对象
    lodash.set(this, path, objNew);

}
//#endregion



//#region MIX:MIX混入

let MIX = {};


//表单字段组件配置
MIX.form_item = {
    props: ["value"],
    data() {
        return {
            valueNeed: this.value
        };
    },

    watch: {//监听器，双向同步
        value: {
            handler(newVal, oldVal) {
                this.valueNeed = this.value
            },
            deep: true
        },
        valueNeed: {
            handler(newVal, oldVal) {
                this.$emit("input", this.valueNeed); //同步valueNeed值到value
            },
            // immediate: true,//组件初始化时立即执行一次变动
            deep: true //深度监听
        }
    },


}




WIN.MIX = MIX;
//#endregion

//#region 本站点新增公共函数
//函数：{处理分组数据列表数据函数}-使之适用于列表渲染
util.handleGDataList = function(list) {
    return list.map(doc => {
      return {
        _id: lodash.get(doc, `targetDoc._id`),
        title: lodash.get(doc, `targetDoc.title`),
        link: lodash.get(doc, `targetDoc.link`),
        alias: lodash.get(doc, `targetDoc.alias`),
        imgSrc: lodash.get(doc, `targetDoc.album[0].url`)
      };
    });
  };
  
  //函数：{根据别名获取子分组数据列表的函数}-更稳定的定位方式
  util.getSonListByAlias = function({ list, alias }) {
    console.log("list:", list);
    console.log("alias:", alias);
    let obj = list.find(doc => doc.targetDoc.alias == alias);
    if (!obj) return [];
    return util.handleGDataList(obj.sonList); //调用：{处理列表数据函数}
  };
//#endregion






export default util