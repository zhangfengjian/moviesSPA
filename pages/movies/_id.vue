<template>
    <div class="movie-detail">
        <div class="container">
            <div class="nav-tab">
                <h2 class="page-title">{{detail.movieName}}</h2>
                <span v-for="(item,index) in getCategory" :key="item.value" @click="toSearchList(item.value)">
                    <el-tag size="small" :type="['','success','info','warning','danger'][index%5]">
                        {{item.label}}
                    </el-tag>
                </span>
            </div>
            <div class="movie-detail-play">
                <video-player
                    class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions">
                </video-player>
                <div class="banner-ad">
                    <a class="imgbox" v-for="(link,index) in detail.adsUrl" :key="index">
                        <img v-lazyload="link">
                    </a>
                </div>
            </div>
            <div class="option-group">
                <span>{{detail.viewsNum}}</span>
                <div class="icon-box">
                    <span class="iconfont icon-dianzan" @click="sharebtnClick"></span>
                    <span class="iconfont icon-shoucang" @click="sharebtnClick"></span>
                    <span class="iconfont icon-linked" @click="sharebtnClick"></span>
                    <span class="iconfont icon-twitter" @click="sharebtnClick"></span>
                    <span class="iconfont icon-skype" @click="sharebtnClick"></span>
                    <span class="iconfont icon-facebook" @click="sharebtnClick"></span>
                </div>
            </div>
            <div class="commond">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="12" :md="8" v-for="(item,index) in commondList" v-if="index<6" :key="item._id">
                        <video-card :data="item"></video-card>
                    </el-col>
                </el-row>
            </div>
            <div class="comment">
                <h3 class="title">comment</h3>
                <div class="comment-area">
                    <div class="top">
                        <div class="topbox">
                            <img src="~/assets/img/sex.png" alt="">
                        </div>
                        <span class="name">name</span>
                        <div class="oprat">
                            <span class="iconfont icon-dianzan"></span>
                            <span class="huifu"></span>
                        </div>
                    </div>
                    <div class="cont">
                        <p>PE class is always favored by students, because they can go out of the classroom and enjoy the freedom in the playground.</p>
                    </div>
                </div>
                <div class="btn-wrap">
                    <el-button>Add a comment </el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        layout: 'movieLayout',
        data(){
            return {
                playerOptions : {
                    playbackRates: [0.5, 1.0, 1.5, 2.0],
                    autoplay: true,
                    muted: false,
                    loop: false,
                    preload: 'auto',
                    language: 'zh-CN',
                    aspectRatio: '16:9',
                    // fluid: true,
                    sources: {
                        type: "video/mp4"
                    },
                    // poster: "http://wx4.sinaimg.cn/large/a1b61d0aly1fn2h3xwat6j20dw0dwtbp.jpg",
                    controlBar: {
                        playToggle: true,
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                }
            }
        },
        async asyncData({store,params}){
            let {data} = await store.dispatch('GETVIDEODETAIL', params.id)
            let commondList = await store.dispatch('GETSEARCH', {keywords: data.superId || data.subId})
            return {
                detail: data,
                commondList: commondList.data.reverse()
            }
        },
        computed: {
            ...mapState({
                category: state => state.Category.category
            }),
            getCategory(){
                let data = this.category
                let resetData = []
                let childData = []
                data.forEach((item) => {
                    let objItem = null
                    if(item.subCategory && item.subCategory.length>0){
                        item.subCategory.forEach((child)=>{
                            let childItem = {
                                value: child.subId,
                                label: child.levelName,
                            }
                            childData.push(childItem)
                        })
                    }else{
                        objItem = {
                            value: item.superId,
                            label: item.levelName
                        }
                        resetData.push(objItem)
                    }
                })
                return resetData.concat(childData)
            }
        },
        methods: {
            toSearchList(val){
                window.location.href = `/search/${val}`
            },
            sharebtnClick(){
                ga('send','share_btn-click','click','detail_evnet','22')
            }
        },
        created(){
            this.playerOptions.sources.src = this.detail.videoUrl
        }
    }
</script>
<style lang="scss">
    .movie-detail{
        margin-top: 60px;
        background: #fff;
        .page-title{
            font-size: 20px;
            line-height: 24px;
            margin: 3px 0;
            padding: 2px 4px;
        }
        .nav-tab{
            display: block;
            padding: 8px;
            .el-tag{
                margin: 2px;
            }
        }
        .movie-detail-play{
            display: flex;
            justify-content: space-between;
            padding: 8px;
            .video-player{
                width: 700px;
            }
            
            @media screen and (min-width: 768px) {
                .banner-ad{
                    display: block !important;
                }
                .vjs-custom-skin > .video-js{
                    height: 400px;
                }
            }
            .banner-ad{
                display: none;
                width: 450px;
                background: #666;
                font-size: 0;
                .imgbox{
                    width: 100%;
                    height: 200px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .option-group{
            color: #fff;
            padding:10px;
            >span{
                color: #3e3e3e;
                float: left;
                line-height: 30px;
            }
            .icon-box{
                span{
                    display: inline-block;
                    vertical-align: middle;
                    width:30px;
                    height: 30px;
                    background: #9e9e9e;
                    text-align: center;
                    line-height: 30px;
                    margin: 0 5px;
                    opacity: 0.8;
                    border-radius: 3px;
                }
            }
        }
        .comment{
            padding: 8px;
            .title{
                font-size: 24px;
                color: #3e3e3e;
                font-weight: bold;
                line-height: 50px;
            }
            .comment-area{
                border-radius: 5px;
                border: 1px solid #dedede;
                padding: 20px;
                .top{
                    min-height: 50px;
                    .topbox{
                        width: 50px;
                        height: 50px;
                        float: left;
                        border-radius: 100%;
                        overflow: hidden;
                        background: #9a8f95;
                        text-align: center;
                        img{
                            display: inline-block;
                            position: relative;
                            top: 50%;
                            transform: translate(0,-50%);
                        }
                    }
                    .name{
                        max-width: 200px;
                        display: inline-block;
                        word-break: break-all;
                        line-height: 20px;
                        margin-left: 10px;
                    }
                    .oprat{
                        float: right;
                        line-height: 24px;
                        .iconfont{
                            font-size: 24px;
                            margin-right: 10px;
                        }
                        .huifu{
                            display: inline-block;
                            width: 24px;
                            height: 24px;
                            vertical-align: top;
                            background: url("~/assets/img/feedback.png") no-repeat center;
                        }
                       
                    }
                }
                .cont{
                    padding-left: 60px;
                }
            }
            .btn-wrap{
                text-align: center;
                padding: 50px 0;
                .el-button{
                    background-color: #333;
                    color: #fff;
                }
            }
        }
    }
    

</style>