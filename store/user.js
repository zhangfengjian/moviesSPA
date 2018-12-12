export default {
    state: {
        userInfo: ''
    },
    mutations: {
        SETUSERINFO(state, payload){
            state.userInfo = payload
        }
    },
    actions:{
        async USER_INIT({ dispatch, commit, getters }) {
            const { data } = await dispatch('GETUSERINFO', getters.GET_TOKEN)
            commit('SETUSERINFO', data || null)
        },
        async nuxtServerInit({ dispatch }, { req }){
            await dispatch('TOKEN_INIT', req)
            await dispatch('USER_INIT')
        }
    }
}