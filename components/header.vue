<template>
    <section class="header-wrap">
        <div class="container">
            <header class="header">
                <button class="menu" @click.stop="showCategory = !showCategory">
                    <i class="iconfont icon-menu2"></i>
                </button>
                <button class="search" @click.stop="showSearch = !showSearch">
                    <i class="iconfont icon-sousuo" ></i>
                </button>
                <div class="logo">
                    <nuxt-link to="/">
                        <img src="~assets/img/logo.png" alt="">
                    </nuxt-link>
                </div>
                <el-col :span="8" class="searBar">
                    <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click.stop="search()"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6" class="outLink">
                    <span>The Best Site To Join Free</span> 
                </el-col>
                <div class="log-and-join">
                    <a class="join" href="/register">Join for FREE</a>
                    <a class="log" href="/login">Log in</a>
                </div>
                <div class="user">
                    <button  class="user-triggle" @click.stop="showUser = !showUser" @blur="showUser = false">
                        <i class="iconfont icon-yonghu"></i>
                    </button>
                    <ul class="user-list" v-if="showUser">
                        <li><nuxt-link to="/register">Join free</nuxt-link></li>
                        <li v-if="!userInfo"><nuxt-link to="/login">Sign in</nuxt-link></li>
                        <li v-else @click.stop="logout">Sing out</li>
                    </ul>
                </div>
            </header>
            <category :visible.sync="showCategory"></category>
            <search-bar :visible.sync="showSearch"></search-bar>
        </div>
    </section>
</template>
<script>
import { mapState } from 'vuex'
import Category from '~/components/category.vue'
import SearchBar from '~/components/searchbar.vue'
export default {
    data(){
        return {
            showCategory: false,
            showSearch: false,
            showUser: false,
            keyword: ''
        }
    },
    components: {
        Category,
        SearchBar
    },
    computed: {
        ...mapState({
            userAgent: state => state.UA.UA,
            userInfo: state => state.User.userInfo
        })
    },
    methods:{
        search(){
            let keyword = encodeURIComponent(this.keyword)
            if (!keyword) { 
                this.$refs.tip.openTip('The keyword cannot be empty!')
                return false
            }
            this.$router.push({
                name: 'search-id',
                params: {
                    id: keyword
                }
            })
        },
        logout(){
            this.$store.dispatch('LOGOUT').then(ret => {
                if(ret.success) {
                    this.$store.state.token = ''
                    this.$router.push('/')
                }
            })
        }
    }
}
</script>
<style lang="scss">
.header-wrap{
    position: fixed;
    width: 100%;
    background: #161616;
    color: #fff;
    top: 0;
    left: 0;
    z-index: 999;
    .header{
        width: 100%;
        position: relative;
        height: 40px;
        padding: 0 8px;
        .iconfont{
            font-size: 1.5rem;
        }
        .menu,.search,.user-triggle{
            display: inline-block;
            width: 40px;
            height: 100%;
            line-height: 40px;
            text-align: center;
            padding: 0;
            background: none;
        }
        .searBar,.outLink,.log-and-join{
            display: none;
        }
        .logo{
            position: absolute;
            height: 100%;
            top: 0;
            left: 50%;
            transform: translate(-50%,0);
            a{
                display: block;
                height: 100%;
            }
            img{
                max-height: 100%;
            }
        }
        .user{
            float: right;
            position: relative;
            height: 100%;
            .user-list{
                position: absolute;
                top: 100%;
                right: 0;
                width: 100px;
                margin-right: -10px;
                z-index: 9;
                list-style: none;
                li{
                    line-height: 30px;
                    background: #333;
                    text-align: center;
                    border-top: 1px solid #dedede;
                }
            }
        }
    }
}
@media screen and (min-width: 768px) {
    .header-wrap{
        background: #fff;
        padding: 8px 0;
        .header{
            display: flex;
            align-items: stretch;
            justify-content: space-between;
            .menu,.search,.user{
                display: none;
            }
            .logo{
                position: relative !important;
                left: auto !important;
                transform: translate(0,0) !important;
            }
            .searBar{
                display: inherit;
                .el-input-group__append{
                    background-color: #3e3e3e;
                    border-color: #3e3e3e !important;
                }
            }
            .outLink{
                display: inherit;
                line-height: 40px;
                span{
                    color: #777;
                    font-size: 14px;
                    font-weight: bold;
                }
            }
            .log-and-join{
                float: right;
                display: flex;
                height: 100%;
                align-items: center;
                a{
                    background: #de2600;
                    padding: 4px 12px;
                    font-size: 16px;
                    line-height: 20px;
                    font-weight: bold;
                    color: #fff;
                }
                .log{
                    background: none;
                    color: #777;
                }
            }
        }
    }
}
@media screen and (min-width: 992px){
    .outLink span{
        font-size: 20px !important;
    }
    .log-and-join a{
        font-size: 20px !important;
    }
}
</style>