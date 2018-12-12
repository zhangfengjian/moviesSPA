import Vuex from 'vuex'
import Api from './api'
import Category from './category'
import Token from './token'
import UA from './ua'
import User from './user'

const createStroe = () => {
  return new Vuex.Store({
    modules: {
      Api,
      Category,
      Token,
      UA,
      User
    }
  })
}

export default createStroe
