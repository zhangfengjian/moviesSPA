<template>
    <article class="player-box">
        <nuxt-link :to="{ name: 'movies-id', params: { id: data._id }}" tag="div">
            <div class="player">
                <a href="" class="img-box">
                    <img v-lazyload="data.pictureUrl">
                </a>
            </div>
            <div class="describ">
                <div class="name">{{data.movieName}}</div>
                <div class="view-num">
                    <span class="auth">{{data.movieAuth}}<i class="iconfont icon-icon1"></i></span>
                    <span class="line">-</span>
                    <span class="view"><i class="iconfont icon-icons-"></i>{{data.viewsNum}}</span>
                    <span class="line">-</span>
                    <span class="tiem">{{data.videoTime}}</span>
                </div>
            </div>
        </nuxt-link>
    </article>
</template>
<script>
export default {
    data(){
        return {
        
        }
    },
    props: ['data']
}
</script>
<style lang="scss">
    .player-box{
        padding: 15px;
        .describ{
            padding-top: 10px;
            text-align: center;
            color: #212121;
            .name{
                line-height: 18px;
                height: 36px;
                display: -webkit-box;    
                -webkit-box-orient: vertical;    
                -webkit-line-clamp: 3;    
                overflow: hidden;
            }
            .view-num{
                line-height: 1.5;
                .line{
                    margin: 0 5px;
                }
                .iconfont{
                    color: #6e6e6e;
                    vertical-align: middle;
                    margin: 0 5px;
                }
                .tiem:after{
                    content: 'min';
                    display: inline-block;
                    width: 22px;
                    height: 12px;
                    line-height: 12px;
                    vertical-align: middle;
                    background: #6e6e6e;
                    color: #fff;
                    font-size: 12px;
                    border-radius: 2px;
                    margin-left: 3px;
                }
            }
        }
    }
    .player{
        text-align: center;
        .img-box{
            width: 100%;
            height: 220px;
            background: #181818;
            img{
                display: inline-block;
                max-width: 100%;
                max-height: 100%;
                vertical-align: middle;
            }
            &:after{
                content: '';
                display: inline-block;
                height: 100%;
                vertical-align: middle;
            }
        }
    }
</style>