import Vue from 'vue'
import router from './router'
import App from './App'
//通讯模块
import Http from './resource/Http.js'
//mint ui
import mintUi from 'mint-ui'
import "../node_modules/mint-ui/lib/style.min.css"
Vue.use(mintUi)
    //略缩图
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
    //日历框架
import moment from 'moment'
//mui
import "../static/mui/css/mui.min.css"
import "../static/mui/css/icons-extra.css"
//自定义css
import "../static/css/public.css"
//时间格式过滤器
Vue.filter("timeFilter", (input, str = "YYYY-MM-DD") => {
    return moment(input).format(str);
})
Vue.config.productionTip = false
new Vue({
    el: '#app',
    router,
    render: c => c(App)
})