<template>
    <div class="publicHeader">
        <CarouselImage :imgData ="this.imgData" ></CarouselImage>
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
                    v-for="item in iconData">
                    <router-link :to="item.router">
                        <div v-bind:class="'my-icon '+item.class"></div>
                        <div class="mui-media-body">{{item.name}}</div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
/*icon style*/
.my-icon {
    width: 50px;
    height: 50px;
    margin: 0 auto;
}

.news {
    background: url("../../../static/images/menu9.png") round;
}

.mpan {
    background: url("../../../static/images/menu3.png") round;
}

.mui-content>ul.mui-table-view {
    background-color: #fff;
    border-top:none;
}

.mui-table-view.mui-grid-view .mui-table-view-cell {
    border-bottom: 0;
    border-right: 0;
}
</style>
<script>
import getIconData  from '../../tools/data.js'
import CarouselImage from "../childConponent/CarouselImage.vue"
  export default {
    data(){
      return {
        imgData:[],
        iconData:getIconData.homeIcon
      }
    },
    created(){
        this.getDataGet("api/getlunbo",res=>{
            this.imgData = res.message
        })
    },
    components: {
        CarouselImage
    }
  }
</script>