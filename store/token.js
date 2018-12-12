export default {
    state: {
        token: ''
    },
    mutations: {
        SET_TOKEN(state, payload){
          state.token = payload
        }
    },
    getters: {
        GET_TOKEN(state){
            return state.token
        }
    },
    actions: {
        async TOKEN_INIT({ commit }, req) {
            if (req.headers.cookie) {
                // 解析cookie
                let cookie = req.headers.cookie, cookieObj = {}, cookieArr = [], key = '', value = '';
                cookie = cookie.split(';')
                for (let i = 0; i < cookie.length; i++) {
                  cookieArr = cookie[i].trim().split('=')
                  key = cookieArr[0]
                  value = cookieArr[1]
                  cookieObj[key] = value
                }
                commit('SET_TOKEN', cookieObj.token || '')
                // if(cookieObj.githubToken){
                //   commit('SET_GITHUB_TOKEN', cookieObj.githubToken)
                // }
            }

        }
    }
}