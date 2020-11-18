import { reqspecsList, reqspecsCount } from "../../utils/http"
const state = {
    //分类
    list: [],
    total: 0,
    size: 2,
    page: 1
}
const mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr;
    },
    changeTotal(state, num) {
        state.total = num;
    },
    changePage(state, page) {
        state.page = page
    }
}

const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}

const actions = {
    //发起请求
    reqList(context, bool) {
        let params = bool ? {} : { page: context.state.page, size: context.state.size }
            //发请求，成功之后，修改list
        reqspecsList(params).then(res => {
            let list = res.data.list ? res.data.list : []
            if (list.length == 0 && context.state.page > 1) {
                context.commit('changePage', context.state.page - 1)
                context.dispatch('reqList');
                return
            }
            list.forEach(item => {
                item.attrs = JSON.parse(item.attrs)
            })
            context.commit('changeList', list)
        })
    },
    //请总数
    reqCount(context) {
        reqspecsCount().then(res => {
            context.commit('changeTotal', res.data.list[0].total)
        })
    },
    //修改页码
    changePage(context, page) {
        context.commit('changePage', page)
        context.dispatch('reqList')
    }
}
export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}