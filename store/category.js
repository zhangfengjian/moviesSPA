export default {
    state: {
        category: ''
    },
    mutations: {
        SET_CATEGORY(state, payload){
            state.category = payload
        }
    },
    actions: {
        async nuxtServerInit({ dispatch, commit, getters }, { req }) {
            //初始化分类
            const { category } = await dispatch('GETCATEGORY')
            commit('SET_CATEGORY',category)
        }
    }
}