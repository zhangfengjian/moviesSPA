<template>
    <div class="infinite" v-scroll="onLoad">
        <slot></slot>
        <div class="icon-load-wrap" v-if="isLoading">
            <span class="el-icon-loading"></span>
        </div>
        <p v-if="nomore">No More Data...</p>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:{
        isLoading:{
            type: Boolean,
            default: false
        },
        nomore:{
            type: Boolean,
            default: false
        }
    },
    directives: {
        scroll: {
            bind(el, binding) {
                let scrollHandle=function () {
                    let scrollTop = Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
                    let getVisibleHeight = document.documentElement.clientHeight
                    let pageH = document.documentElement.scrollHeight
                    if (pageH - scrollTop - getVisibleHeight <= 110) {
                        let onLoad = binding.value
                        onLoad()
                    }
                }
                window.addEventListener('scroll', scrollHandle, false)
            }
        }
    },
    methods: {
        onLoad(){
            this.$emit('infiniteLoad')
        }
    }
}
</script>
<style lang="scss">
.infinite{
    .icon-load-wrap{
        font-size: 2rem;
        text-align: center;
    }
    p{
        text-align: center;
    }
}
</style>