import Vue from 'vue'
import resource from 'vue-resource'
Vue.use(resource)
const host = "http://webhm.top:8899/"
Vue.prototype.getDataGet = function(url, callback) {
    this.$http.get(host + url).then(res => {
        callback(res.body)
    }, err => {
        console.log(err)
    })
}
Vue.prototype.getDataPsst = function(url, data, callback) {
    this.$http.post(host + url, data, { emulateJSON: true }).then(res => {
        callback(res.body)
    }, err => {
        console.log(err)
    })
}