export default {
    state:{
        UA:''
    },
    mutations: {
        SET_UA(state,data){
            state.UA = data
        }
    },
    actions: {
        async nuxtServerInit({ dispatch, commit, getters }, { req }) {
            //服务端初始化设置用户代理
            let getUA = req.headers['user-agent']
            if (getUA.match(/(iPhone|Android.*Mobile)/) || getUA.match(/MSIE [6,7,8,9]/)) {
              commit('SET_UA',0)
            }else{
              commit('SET_UA',1)
            }
        }
    }
}

