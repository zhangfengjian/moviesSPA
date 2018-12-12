import Axios from 'axios'
import globalConfig from '../server/config'
let options = {
  timeout: 9000,
  // 发送请求时带上cookie
  withCredentials: true,
  headers: {
    post: {
       'Content-Type': 'application/json'
    }
  }
}
if(process.env.NODE_ENV === 'production'){
  options.baseURL = `http://${globalConfig.app.domain}/${globalConfig.app.routerBaseApi}`
}else{
  options.baseURL = `http://${globalConfig.app.host}:${globalConfig.app.port}/${globalConfig.app.routerBaseApi}`
}
const axios = Axios.create(options)
export default {
  actions: {
    //用户操作
    async REGISTER({ commit, state, getters }, params) {
      const { data } = await axios.post(`/register`, params)
      return data
    },
    async LOGIN({ commit, state, getters }, params) {
      const { data } = await axios.post(`/login`, params)
      commit('SET_TOKEN', data.data.token)
      return data
    },
    async GETUSERINFO({ commit, state, getters }, token) {
      const { data } = await axios.get(`/user/${token}`)
      return data
    },
    async LOGOUT({ commit, state, getters }) {
      const { data } = await axios.post(`/logout`)
      return data
    },
    //获取分类
    async GETCATEGORY({ commit, state, getters }) {
      const { data } = await axios.get(`/category`)
      return data.data[0]
    },
    //视频管理
    async MOVIEHOME({ commit, state, getters }, detail) {
      const { data } = await axios.post(`/pushVideos`, detail)
      return data
    },
    async GETMOVIEHOME({ commit, state, getters }, {currentPage, pageSize, tabType}) {
      const { data } = await axios.get(`/getVideos/${currentPage}/${pageSize}/${tabType}`)
      return data
    },
    async GETSEARCH({ commit, state, getters }, {currentPage, pageSize, keywords}) {
      const { data } = await axios.get(`/searchVideos/${currentPage}/${pageSize}/${keywords}`)
      return data
    },
    async GETVIDEODETAIL({ commit, state, getters }, id) {
      const { data } = await axios.get(`/getVideoDetail/${id}`)
      return data
    }
  }
}

