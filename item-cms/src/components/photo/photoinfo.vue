<template>
    <div class="publicHeader">
        <div class="title">
            <h4>{{photoInfo.title}}</h4>
            <p>{{photoInfo.add_time | timeFilter('YYYY-MM-DD')}}&nbsp;{{photoInfo.click}}次浏览</p>
        </div>
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li v-for="(item, index) in thumimageList"
                    class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <img class="preview-img"
                         :src="item.src"
                         height="67"
                         width="100"
                         @click="$preview.open(index, thumimageList)">
                </li>
            </ul>
        </div>
        <div class="content"
             v-html="photoInfo.content"></div>
             <comment :ID="this.ID"></comment>
    </div>
</template>
<style scoped>
/**
        标题样式
    */

.title {
    padding: 5px;
    border-bottom: 2px solid rgba(92, 92, 92, 0.3);
    height: 100%;
}

.title h4 {
    font-size: 16px;
    font-weight: bold;
    color: #0094ff;
}

.title p {
    font-size: 12px;
    color: #777777;
}

.content {
    padding: 5px;
    font-size: 14px;
    color: #777777;
}
</style>
<script>

import comment from '../childConponent/comment.vue'
export default {
    data() {
        return {
            photoInfo: {},
            thumimageList: [],
            ID:this.$route.params.infoid
        }
    },
    created() {
        this.getPhotoInfoData()
        this.getThumimagesData()
    },
    methods: {
        getPhotoInfoData() {
            this.getDataGet("api/getimageInfo/" + this.ID, res => {
                this.photoInfo = res.message[0]
            })
        },
        getThumimagesData() {
            this.getDataGet("api/getthumimages/" + this.ID, res => {
                res.message.forEach(value => {
                    value.w = 600;
                    value.h = 400;
                })
                this.thumimageList = res.message
            })
        }
    },
    components: {
        comment
    }
}
</script>
