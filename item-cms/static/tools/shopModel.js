const key = "goods";
export const saveShopData = (ShopObj) => {
    var savedata = JSON.parse(localStorage.getItem(key) || "[]")
    var tmp = true
    for (let i = 0; i < savedata.length; i++) {
        if (savedata[i].goodsId == ShopObj.goodsId) {
            savedata[i].count += ShopObj.count
            tmp = false
            break
        }
    }
    tmp && savedata.push(ShopObj)
    localStorage.setItem(key, JSON.stringify(savedata))
}
export const getShopNumber = () => {
    var sum = 0
    var savedata = JSON.parse(localStorage.getItem(key) || "[]")
    for (let i = 0; i < savedata.length; i++) {
        sum += savedata[i].count
    }
    return sum
}
export const tmpData = function() {
    var item = arguments[0]
    if (typeof item == "string") {
        return sessionStorage.getItem(item)
    } else if (typeof item == "object") {
        sessionStorage.setItem(item.key, item.data)
    }
}