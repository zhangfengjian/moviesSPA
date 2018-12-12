<template>
    <div class="form-wrap">
        <div class="form-head">
            <div class="container">
                <a class="logo" href="/">
                    <img src="~/assets/img/logo.png" alt="">
                </a>
                <span class="line"></span>
                <span class="sufix">{{ currentRoute }}</span>
            </div>
        </div>
        <div class="form-cont">
            <div class="container">
                <nuxt/>
            </div>
        </div>
        <Footer/>
    </div>
</template>
<script>
    export default {
        computed:{
            currentRoute(){
                return this.$route.name.toUpperCase()
            }
        }
    }
</script>
<style lang="scss">
    .form-wrap{
        .form-head{
            background: #181818;
            .container{
                padding: 10px 15px;
            }
            .logo{
                height: 50px;
                vertical-align: middle;
                img{
                    max-height: 100%;
                }
            }
            .line{
                content: '';
                display: inline-block;
                width: 1px;
                height: 40px;
                background: #dedede;
                vertical-align: middle;
                margin: 0 20px;
            }
            .sufix{
                display: inline-block;
                font-size: 2rem;
                color: #dedede;
                line-height: 50px;
                vertical-align: middle;
            }
        }
        .form-cont{

        }
    }
</style>