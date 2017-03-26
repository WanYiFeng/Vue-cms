<template>
    <div class="publicHeader"
         id="photoModle">
        <div class="headerShowDb"
             @click="showbd">分类</div>
        <ul class="mui-table-view"
            v-if="isShow">
            <li class="mui-table-view-cell"
                @click="getPhotoListByCategoryId(item.id)"
                v-for="item in categoryList">{{item.title}}</li>
        </ul>
        <!-- 图片列表 -->
        <div class="imgList">
            <ul>
                <li v-for="item in photoList">
                    <router-link v-bind='{to:"/photo/info/"+item.id}'>
                        <img v-lazy="item.img_url">
                    </router-link>
                    <p>
                        <span class="title"
                              v-text="item.title"></span>
                        <br/> {{item.zhaiyao}}
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.headerShowDb {
    width: 30%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 5;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
    text-align: right;
    padding-right: 5%
}


/**
    * 图片列表样式
   */

.imgList ul {
    padding: 2px;
}

.imgList img {
    width: 100%;
    height: 400px;
}

image[lazy=loading] {
    width: 40px;
    height: 30px;
    margin: auto;
}

.imgList li {
    list-style: none;
    position: relative;
}

.imgList p {
    color: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
}

.imgList .title {
    font-weight: bold;
}
</style>
<script>
import { Indicator } from 'mint-ui';
import { tmpData } from "../../tools/shopModel.js"
export default {
    data() {
        return {
            categoryList: [],
            photoList: [],
            isShow: false,
            photoId: tmpData("photoId") || 0,
        };
    },
    created() {
        //1.获取分类的数据
        this.getPhotoCategoryListData();
        //2.获取数据
        this.getPhotoListByCategoryId(this.photoId);
        //获取上一次访问的坐标
    },
    methods: {
        getPhotoCategoryListData() {
            this.getDataGet("api/getimgcategory", res => {
                res.message.unshift({ id: 0, title: "全部" })
                this.categoryList = res.message;
            })
        },
        getPhotoListByCategoryId(categoryId) {
            tmpData({ key: "photoId", data: categoryId })
            this.isShow = false;
            Indicator.open({
                text: '加载中...',
                spinnerType: 'triple-bounce'
            });
            this.getDataGet("api/getimages/" + categoryId, res => {
                Indicator.close();
                this.photoList = res.message;
            })
        },
        showbd() {
            this.isShow = !this.isShow
            if (this.isShow) {
                this.photoList = [];
            }else{
               this.getPhotoListByCategoryId(this.photoId)
            }
        }
    }
}
</script>