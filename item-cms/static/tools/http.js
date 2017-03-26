export default {
    host: "http://127.0.0.1:8888/",
    web: "http://webhm.top:8899/",
    getDataGet(url, obj, callback) {
        obj.$http.get(this.web + url).then(res => {
            callback(res.body)
        }, err => {
            console.log(err)
        })
    }
}