/**
 * 定义图片加载监听事件
 * @param  {[type]} ele     [description]
 * @param  {[type]} binding [description]
 * @return {[type]}         [description]
 */

// import config from '~/config'

const lazyload = (ele, binding) => {
  // 获取旧的src
  let oldSrc = ele.oldSrc

  // 是否加cdn
//   const imgCdn = binding.modifiers.cdn

  let listeners = []
  let imageCache = []
//   let imgSrc = imgCdn ? (config.IMG_ADDRESS + binding.value) : binding.value
  let imgSrc = binding.value

  // 如果旧的src和新传入的src相同，则不处理
  // 解决重新设置图片url数据后懒加载不重新处理的问题
  if (imgSrc === oldSrc) return

  let init = { // 初始化图片懒加载 默认图片
    lazyLoad: false,
    default: require('~/assets/img/default.png')
  }

  // 为数组添加移除功能
  if (!Array.prototype.remove) {
    Array.prototype.remove = function (item) {
      if (!this.length) return
      var index = this.indexOf(item)
      if (index > -1) {
        this.splice(index, 1)
        return this
      }
    }
  }

  const onListen = (ele, bind) => {
    if (bind) {
      ele.addEventListener('scroll', render)
    } else {
      init.lazyLoad = false
      ele.removeEventListener('scroll', render)
    }
  }

  const render = (e) => {
    for (var i = 0; i < listeners.length; i++) {
      checkCanShow(listeners[i])
    }
  }

  const setEleSrc = (ele, imgSrc) => {
    ele.src = imgSrc
    ele.style.opacity = 1
    ele.setAttribute('load', 'success')
    ele.parentNode.setAttribute('picLoad', 'success')
  }
  const alreadyLoad = (ele, imgSrc) => {
    if (imageCache.indexOf(imgSrc) > -1) {
      setEleSrc(ele, imgSrc)
      return true
    }
    return false
  }

  const checkCanShow = (item, ele) => {
    var ele = item.ele
    var top = ele.getBoundingClientRect().top
    if (top + 10 < window.innerHeight) {
      let load = ele.getAttribute('load')
      if (load === 'fail') {
        loadImgAsync(item, (ele, imgSrc) => {
          setEleSrc(ele, imgSrc)
          imageCache.push(imgSrc)
        }, (e) => {
          // ele.src = init.default
          console.log('image load fail')
        })
      }
      return true
    }
    return false
  }

  const loadImgAsync = (item, resolve, reject) => {
    let img = new Image()
    img.src = item.imgSrc
    img.onload = () => {
      resolve(item.ele, item.imgSrc)
    }
    img.onerror = (e) => {
      reject(e)
    }
    listeners.remove(item)
  }
  // 设置oldSrc
  ele.oldSrc = imgSrc
  ele.setAttribute('load', 'fail')
  ele.parentNode.setAttribute('picLoad', 'fail')
  if (alreadyLoad(ele, imgSrc)) {
    return false
  }
  let item = {
    ele: ele,
    imgSrc: imgSrc
  }
  ele.src = init.default

  if (checkCanShow(item)) {
    return false
  }
  listeners.push(item)
  if (!init.lazyLoad) {
    init.lazyLoad = true
    onListen(window, true)
  }
}

export default {
  inserted: lazyload,
  update: lazyload
}
