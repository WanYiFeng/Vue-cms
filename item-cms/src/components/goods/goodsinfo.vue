<template>
    <div class="publicHeader">
        <CarouselImage :imgData="this.imgData"></CarouselImage>
    
        <!-- 2.购买信息 -->
        <div class="purchase">
            <h4>{{goodsInfo.title}}</h4>
            <p>
                市场价:￥
                <s>{{goodsInfo.market_price}}</s>&nbsp;&nbsp; 销售价:￥
                <span>{{goodsInfo.sell_price}}</span>
            </p>
            <subAdd @goodsCount="getgoodsCountData"
                    :stockcount="goodsInfo.stock_quantity"></subAdd>
            <mt-button type="primary"
                       size="small">立即购买</mt-button>
            <mt-button type="danger"
                        @click= "addShopCart" 
                       size="small">加入购物车</mt-button>
        </div>
        <!-- 3.商品参数 -->
        <div class="goodsParams">
            <h5>商品参数</h5>
            <ul>
                <li>商品货号:{{goodsInfo.goods_no}}</li>
                <li>库存情况:剩余{{goodsInfo.stock_quantity}}件</li>
                <li>上架时间:{{goodsInfo.add_time | timeFilter('YYYY-MM-DD HH:mm:ss')}}</li>
            </ul>
        </div>
    
        <!-- 4.尾部 -->
        <div class="footer">
            <mt-button @click="goPictureAndText"
                       plain
                       size="large"
                       type="primary">图文介绍</mt-button>
    
            <mt-button @click="goComment"
                       class="goodsCommentStyle"
                       plain
                       size="large"
                       type="danger">商品评论</mt-button>
        </div>
    </div>
</template>
<style scoped>
.subimagesilder,
.purchase,
.goodsParams,
.footer {
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid rgba(92, 92, 92, 0.1);
}

.purchase h4 {
    color: #0094ff;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid rgba(92, 92, 92, 0.2);
    padding-bottom: 10px;
}

.purchase p {
    font-size: 14px;
    color: black;
}

.purchase span {
    font-size: 16px;
    color: red;
}

.goodsParams h5 {
    border-bottom: 1px solid rgba(92, 92, 92, 0.2);
    padding-bottom: 10px;
}

.goodsParams li {
    list-style: none;
    font-size: 16px;
}

.goodsParams ul {
    padding: 0;
}

.goodsCommentStyle {
    margin-top: 20px;
}
</style>
<script>
import CarouselImage from '../childConponent/CarouselImage.vue'
import subAdd from '../childConponent/subAdd.vue'
import { bus } from '../../tools/bus.js'
import  {saveShopData,getShopNumber} from '../../tools/shopModel.js'
export default {
    data() {
        return {
            imgData: [],
            id: this.$route.params.infoid,
            goodsInfo: {},
            shopNumber: 1
        }
    },
    created() {
        this.getImgData()
        this.getGoodsInfoData()
    },
    methods: {
        getImgData() {
            this.getDataGet("api/getthumimages/" + this.id, res => {
                this.imgData = res.message;
            })
        },
        getGoodsInfoData() {
            this.getDataGet("api/goods/getinfo/" + this.id, res => {
                this.goodsInfo = res.message[0];
            })
        },
        goPictureAndText() {
            this.$router.push({
                path: '/goods/desc', query: {
                    infoid: this.id
                }
            })
        }, goComment() {
            this.$router.push({
                path: "/goods/comment", query: {
                    infoid: this.id
                }
            })
        },
        getgoodsCountData(data) {
            this.shopNumber = data
        },
        addShopCart(){
            saveShopData({goodsId:this.id,count:this.shopNumber})
            bus.$emit("shopCartNumber",getShopNumber())
        }
    },
    components: {
        CarouselImage,
        subAdd
    }
}
</script>
