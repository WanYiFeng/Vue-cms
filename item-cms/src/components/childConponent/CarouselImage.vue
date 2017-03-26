<template>
    <div>
        <mt-swipe class="mtitem"
                  :auto="4000">
            <mt-swipe-item v-for="item in imgData"
                           :key="item.img">
                <a :href="item.url">
                    <img :src="item.img">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<style scoped>
.mtitem {
    height: 250px;
    width: 100%;
}

.mtitem img {
    height: 250px;
    width: 100%;
}
</style>
<script>
    export default {
       props: ["imgData"]
    }
</script>