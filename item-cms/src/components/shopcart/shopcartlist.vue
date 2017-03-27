<template>
    <div class="publicHeader">
        <div v-for="(item,index) in goodsList"
             class="shopCartListStyle">
            <!-- 1.0 switch开关 -->
            <div class="mySwitch">
                <mt-switch @change="statisticsTotalPriceAndTotalCount"
                           v-model="item.switchValues"></mt-switch>
            </div>
            <!-- 2.0 缩略图-->
            <div class="thumbImageStyle">
                <img width="75px"
                     height="75px"
                     :src="item.thumb_path">
            </div>
            <!-- 3.0 商品名称价格等信息-->
            <div class="shopContent">
                <h4>{{item.title}}</h4>
                <p>
                    <span>{{item.sell_price}}</span>&nbsp;商品数量:{{item.cou}}
                </p>
            </div>
            <!--  4.0 删除商品按钮-->
            <div class="deleteStyle">
                <mt-button size="small"
                           type="danger"
                           @click="deleteShop(item.id)">删除</mt-button>
            </div>
        </div>
        <div class="price">
            <span>价格为:</span><span>{{price}}</span>
        </div>
    </div>
</template>
<style scoped>
/*购物车列表*/
.shopCartListStyle {
    display: flex;
    margin-top: 5px;
    border-bottom: 1px solid rgba(1, 1, 1, 0.3);
    padding: 5px;
}

.mySwitch {
    flex: 0 0 20px;
    margin-right: 15px;
    margin-top: 30px;
}

.thumbImageStyle {
    flex: 0 0 70px;
    border: 1px solid rgba(92, 92, 92, 0.1);
    margin-right: 15px;
    padding: 3px;
    border-radius: 3px;
}

.shopContent {
    flex: 1;
}

.shopContent h4 {
    color: #0094ff;
    padding: 5px 0;
}

.shopContent p {
    color: black;
    font-size: 16px;
    margin-top: 20px;
}

.shopContent span {
    color: red;
}

.deleteStyle {
    margin-top: 30px;
}
</style>
<script>
import { getShop, getShopNumber,setShop } from '../../tools/shopModel.js'
import { bus } from '../../tools/bus.js';

export default {
    data() {
        return {
            goodsList: [],
            price: 0,
            shopNumber: getShopNumber()
        }
    },
    created() {
        this.getdata()
    },
    methods: {
        statisticsTotalPriceAndTotalCount() {
            this.getPrice()
        },
        getdata() {
            let shopArr = [];
            let getShopData = getShop("goods")
            getShopData.forEach(res => {
                shopArr.push(res.goodsId)
            })
            this.getDataGet("api/goods/getshopcarlist/" + shopArr.join(","), res => {
                res.message.forEach((item, index) => {
                    item.switchValues = true
                    for (let i = getShopData.length - 1; i >= 0; i--) {
                        item.id == getShopData[i].goodsId && (item.cou = getShopData[i].count)
                    }
                })
                this.goodsList = res.message;
                this.getPrice()
            })
        },
        getPrice() {
            let subprice = 0
            let shopNumber = 0
            this.goodsList.forEach(res => {
                if (res.switchValues) {
                    subprice += res.cou * res.sell_price
                    shopNumber += res.cou
                }
            })
            this.price = subprice
            this.shopNumber = shopNumber
            bus.$emit("shopCartNumber", shopNumber)
        },
        deleteShop(itemId) {
            var datalist = this.goodsList
            var locorData = getShop("goods")
            for (let i = datalist.length - 1; i >= 0; i--) {
                if (datalist[i].id == itemId) {
                    this.shopNumber -= datalist[i].cou 
                    datalist.splice(i, 1)
                    break
                }
            }
            for (let i = locorData.length - 1; i >= 0; i--) {
                if(locorData[i].goodsId == itemId ){
                     locorData.splice(i, 1)
                     setShop(locorData)
                     break
                }
            }
            bus.$emit("shopCartNumber", this.shopNumber)
            this.getPrice()
        }
    }
}
</script>
