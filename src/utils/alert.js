import Vue from 'vue'
let vm = new Vue();
export const successAlert = (msg) => {
    vm.$message({
        message: msg,
        type: 'success'
    })
}

//失败
export const errorAlert = (msg) => {
    vm.$message({
        message: msg,
        type: 'warning'
    })
}