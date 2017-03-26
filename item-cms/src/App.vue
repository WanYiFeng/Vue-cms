<template>
    <div>
        <header class="mint-header is-fixed">
            <div class="mint-header-button is-left">
                <div class="Back"
                     @click="Back"
                     v-if="isShow">&lt;返回</div>
            </div>
            <h1 class="mint-header-title">固定在顶部</h1>
            <div class="mint-header-button is-right">
            </div>
        </header>
            <router-view></router-view>
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item"
                         to="home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item"
                         to="member">
                <span class="mui-icon mui-icon-email"></span>
                <span class="mui-tab-label"></span>
            </router-link>
            <router-link class="mui-tab-item "
                         to="shopCart">
                <span class="mui-icon mui-icon-contact"><span class="mui-badge" id = "shopNum">{{shopNumber}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item"
                         to="settings">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">设置</span>
            </router-link>
        </nav>
    </div>
</template>
<style scoped>
.Back {
    width: 30%;
    position: absolute;
    left: 0%;
    top: 0;
    z-index: 1;
    line-height: 40px;
    padding-left: 5%
}
</style>
<script>
import { bus } from './tools/bus.js'
bus.$on("shopCartNumber", number => {
    document.querySelector("#shopNum").innerHTML = number
})
import { getShopNumber } from "./tools/shopModel.js"
export default {
    data() {
        return {
            shopNumber: getShopNumber(),
            isShow: false,
        }
    },
    created() {
        window.addEventListener("load", this.show(this.$route.path))
    },
    methods: {
        Back() {
            this.$router.go(-1)
        },
        show(url) {
            if (url === "/home") {
                this.isShow = false
            } else {
                this.isShow = true
            }
        }
    },
    watch: {
        "$route"(to, link) {
            this.show(to.path)
        }
    }
}
</script>
