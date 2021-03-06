import Vue from 'vue'
import Router from 'vue-router'
//roter
import home from './components/home/home.vue'
import newslist from './components/news/newsList.vue'
import newslnfo from './components/news/newsInfo.vue'
import photolist from './components/photo/photolist.vue'
import photoinfo from './components/photo/photoinfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfo.vue'
import goodscomment from './components/goods/goodscomment.vue'
import goodsdocs from './components/goods/goodsdocs.vue'
import shopCartlist from './components/shopcart/shopcartlist.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: "/", redirect: "home" },
        { name: "home", path: "/home", component: home },
        { name: "newslist", path: "/news/list", component: newslist },
        { name: "newslnfo", path: "/news/info/:infoid", component: newslnfo },
        { name: "photolist", path: "/photo/list", component: photolist },
        { name: "photoinfo", path: "/photo/info/:infoid", component: photoinfo },
        { name: "goodslist", path: "/goods/list", component: goodslist },
        { name: "goodsinfo", path: "/goods/info/:infoid", component: goodsinfo },
        { name: "goodscomment", path: "/goods/comment", component: goodscomment },
        { name: "goodsdocs", path: "/goods/desc", component: goodsdocs },
        { name: "shopCartlist", path: "/shopCart", component: shopCartlist },
    ],
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            console.log(savedPosition)
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})