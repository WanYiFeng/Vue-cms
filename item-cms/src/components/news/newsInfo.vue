<template>
    <div class="publicHeader">
        <div class="title">
            <h2>{{newsInfo.title}}</h2>
            <p>{{newsInfo.add_time | timeFilter('YYYY-MM-DD')}}
                &nbsp;{{newsInfo.click}}浏览&nbsp;分类:民生经济</p>
        </div>
        <div class="content">
            <p v-html="newsInfo.content"></p>
        </div>
        <childModle :ID="this.$route.params.infoid"></childModle>
    </div>
</template>

<style scoped>
    .title{
        padding: 5px;
        border-bottom: 1px solid rgba(92,92,92,0.2);
    }

    .content{
        padding: 5px;
    }

    h2{
        color: #0094ff;
        font-size: 16px;
        font-weight: 700;
    }
</style>

<script>
import childModle from "../childConponent/comment.vue"
    export default{
        data(){
            return {
                newsInfo : {}
            };
        },
        created(){
            this.getDataGet("api/getnew/" + this.$route.params.infoid,res=>{
                this.newsInfo = res.message[0]
            })
        },
        components: {
            childModle
        }
    }
</script>