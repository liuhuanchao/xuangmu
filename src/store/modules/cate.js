import { reqCateList } from "../../utils/http"
const state = {
    //分类
    list: []
}
const mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr;
    }
}

const getters = {
    list(state) {
        return state.list
    }
}

const actions = {
    //发起请求
    reqList(context) {
        //发请求，成功之后，修改list
        reqCateList({ istree: true }).then(res => {
            context.commit('changeList', res.data.list)
        })
    }

}
export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}