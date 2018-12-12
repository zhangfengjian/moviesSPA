import Vue from 'vue'
import lazyload from './lazyload'

const directives = {
  lazyload,
}

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
