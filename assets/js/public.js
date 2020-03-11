let WIN;
if (typeof(window) === "undefined") { //如果{000}000
    WIN = global;
} else {
    WIN = window;
}
WIN.PUB = WIN.PUB || {}
//WIN.PUB.domain = `https://www.dmagic.cn`

WIN.PUB.domain = `http://e6234kn.hn3.mofasuidao.cn`




//WIN.PUB.domain = "http://localhost:3000"
//WIN.PUB.domain = 'http://test.dmagic.cn'
// WIN.PUB.urlUpload = `${PUB.domain}/api_third_part/qiniu_upload?scope=test`
WIN.PUB.urlUpload = `https://up-z2.qiniup.com` //七牛云上传地址（域名）
WIN.PUB.urlGetQiniuToken = `${PUB.domain}/api_third_part/get_qiniu_token?scope=test`


WIN.PUB.systemName = "深圳龙庭后台系统1111";
WIN.PUB.KeySys = "longting";
WIN.PUB._systemId = `sys_${PUB.KeySys}`;