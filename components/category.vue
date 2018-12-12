<template>
    <section class="category" v-show="visible">
        <aside class="aside-menu">
            <div class="super-list">
                <div class="item" v-for="item in getCategory" :key="item.superId" @click.stop="changeCate(item)">
                    {{item.levelName}}
                    <span class="el-icon-caret-right arrow-icon" v-show="item.subCategory&&item.subCategory.length>0"></span>
                    <div class="sub-list" v-show="item.superId == subShow">
                        <div class="itemChild" v-for="itemChild in item.subCategory" :key="itemChild.subId" @click.stop="changeCate(itemChild)">
                            {{itemChild.levelName}}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    </section>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data(){
            return {
                subShow: "957301"
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapState({
                getCategory: state => state.Category.category
            })
        },
        methods: {
            changeCate(val){
                if(!val.subCategory||val.subCategory.length==0){
                    window.location.href = `/search/${val.superId || val.subId}`
                }else{
                    this.subShow = val.superId
                }
            }
        }
    }
</script>
<style lang="scss">
.category{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    margin-top: 40px;
    z-index: 999;
    .aside-menu{
        position: relative;
        width: 50%;
        height: 100%;
        background: #181818;
        .super-list{
            .item{
                font-weight: bold;
                padding-left: 20px;
                line-height: 40px;
                border-bottom: 1px solid #666;
                &.active{
                    background: #666;
                    -webkit-box-shadow: -8px 0 12px -10px rgba(0,0,0,.9) inset;
                }
            }
            .arrow-icon{
                float: right;
                margin-top: 12px;
                margin-right: 10px;
            }   
        }
        .sub-list{
            position: absolute;
            width: 100%;
            top: 0;
            left: 100%;
            background: #666;
            height: 100%;
            .itemChild{
                line-height: 40px;
                padding-left: 20px;
                border-bottom: 1px solid #777;
            }
        }
    }
}
</style>