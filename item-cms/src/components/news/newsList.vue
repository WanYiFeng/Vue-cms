
<template>
    <div class="publicHeader">
        <div class="mui-content">
            <ul class="mui-table-view">
                <li v-for="item in newsList" class="mui-table-view-cell mui-media" >
                    <router-link :to="'/news/info/'+item.id" class="mui-navigate-right">
                        <img class="mui-media-object mui-pull-left" :src="item.img_url">
                        <div class="mui-media-body">
                            {{item.title}}
                            <p class='mui-ellipsis'>
                                {{item.add_time | timeFilter}}
                                <span>
                                    点击数：{{item.click}}
                                </span>
                            </p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .mui-ellipsis{
        margin-top: 20px;
        font-size: 12px;
        color: #0094ff;
    }

    .mui-ellipsis > span{
        position: absolute;
        top: 50px;
        right: 20px;
    }

    .mui-table-view-cell img{
        height: 63px;
        max-width: 63px;
    }

    .mui-navigate-right:after, .mui-push-right:after{
        content:''
    }
</style>
<script>
    export default{
        data(){
            return {
                newsList : []
            };
        },
        created(){
             this.getDataGet("api/getnewslist", res=>{
                this.newsList =  res.message
             })
        },
    }
</script>