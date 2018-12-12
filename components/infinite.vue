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
                    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                    let clientH = document.documentElement.clientHeight
                    let pageH = document.documentElement.scrollHeight
                    if (scrollTop + clientH == pageH) {
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