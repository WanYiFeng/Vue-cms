<template>
    <div class="publicHeader">
        <div class="title">
            <h2>{{goodsDesc.title}}</h2>
        </div>
        <div class="content">
            <p v-html="goodsDesc.content"></p>
        </div>
    </div>
</template>
<style scoped>
.title {
    border-bottom: 1px solid rgba(92, 92, 92, 0.3);
}

.title h2 {
    font-size: 20px;
    font-weight: bold;
    color: #0094ff;
}

.title,
.content {
    padding: 5px;
}
</style>
<script>

export default {
    data() {
        return {
            goodsDesc: {}
        }
    },
    created() {
        this.getGoodsDescData();
    },
    methods: {
        getGoodsDescData() {
            this.getDataGet("api/goods/getdesc/"+this.$route.query.infoid, res => {
                this.goodsDesc = res.message[0]
            })
        }
    }
}
</script>
