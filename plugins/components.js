import Vue from 'vue'
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
import VideoCard from '../components/video-card.vue'
import Infinite from '../components/infinite'

const components = { Header, Footer, VideoCard, Infinite}

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})
