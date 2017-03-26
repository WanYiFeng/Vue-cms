<template>
    <div class="subnumber">
        <div @click="substrict"
             class="left">-</div>
        <div class="middle">{{count}}</div>
        <div @click="add"
             class="right">+</div>
    </div>
</template>
<style scoped>
.subnumber {
    margin-bottom: 10px;
}
.left,
.middle,
.right {
    display: inline-block;
    border: 1px solid rgba(92, 92, 92, 0.3);
    width: 30px;
    text-align: center;
    height: 25px;
    line-height: 25px;
}

.middle {
    width: 40px;
}
</style>
<script>
export default {
    data() {
        return {
            count: 1
        }
    },
    methods: {
        substrict() {
            if (this.count <= 1) return
            this.$emit("goodsCount",--this.count)
        },
        add() {
            if (this.count >= this.stockcount) return
            this.$emit("goodsCount",++this.count)
        },
    },
    props: ["stockcount"]
}
</script>
