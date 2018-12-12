<template>
  <div class="movies-home-page">
      <div class="container">
        <div class="nav-tab">
            <span v-for="(item,index) in getCategory" :key="item.value" @click="toSearchList(item.value)">
                <el-tag size="small" :type="['','success','info','warning','danger'][index%5]">
                    {{item.label}}
                </el-tag>
            </span>
        </div>
        <div class="main-tab">
            <el-tabs type="border-card" v-model="tabType" @tab-click="tabClick">
                <el-tab-pane label="用户">
                    <span slot="label"><i class="iconfont icon-shipinbofangyingpian2"></i></span>
                    <infinite @infiniteLoad="infiniteHandle" :isLoading="isLoading" :nomore="nomore">
                        <el-row :gutter="10">
                            <el-col :xs="24" :sm="12" :md="8" v-for="item in moviesDataUA" :key="item._id">
                                <video-card :data="item"></video-card>
                            </el-col>
                        </el-row>
                    </infinite>
                </el-tab-pane>
                <el-tab-pane label="配理">
                    <span slot="label"><i class="iconfont icon-rss"></i> </span>
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="12" :md="8" v-for="item in moviesDataUA" :key="item._id">
                            <video-card :data="item"></video-card>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="角色">
                    <span slot="label"><i class="iconfont icon-dianzan"></i> </span>
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="12" :md="8" v-for="item in moviesDataUA" :key="item._id">
                            <video-card :data="item"></video-card>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="pagination-wrap" v-if="totalCount>0 && userAgent">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="pageChange"
                :page-size="pageSize"
                :current-page="currentPage"
                :total="totalCount">
            </el-pagination>
        </div>
      </div>
  </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        layout: 'movieLayout',
        data(){
            return {
                pageSize: 12,
                currentPage: 1,
                tabType: '0',
                isLoading: false,
                nomore: false
            }
        },
        async asyncData({req, store, route, error }) {
            let paramData = {
                pageSize: 12,
                currentPage: 1,
                tabType: 1
            }
            const { data, total } = await store.dispatch('GETMOVIEHOME',paramData)
            return {
                moviesData: data || {},
                totalCount: total,
                infiniteData: data || []
            }
        },
        computed: {
            ...mapState({
                userAgent: state => state.UA.UA,
                userInfo: state => state.User.userInfo,
                category: state => state.Category.category,
                token: state => state.Token.token
            }),
            moviesDataUA(){
                if(this.userAgent){
                    return this.moviesData
                }
                return this.infiniteData
            },
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
            async getContData(){
                let { data, total } = await this.$store.dispatch('GETMOVIEHOME',{
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                    tabType: (Number(this.tabType) + 1)
                })
                this.moviesData = data
                this.totalCount = total
            },
            async infiniteHandle(){
                if(this.userAgent) return
                if(!this.isLoading){
                    if(this.infiniteData.length < this.totalCount){
                        this.isLoading = true
                        this.currentPage++
                        await this.getContData()
                        this.$nextTick(()=>{
                            this.infiniteData = this.infiniteData.concat(this.moviesData)
                            this.isLoading = false
                        })
                        
                    }else{
                        this.nomore = true
                        return false
                    }
                }else{
                    return false
                }
            },
            pageChange(val){
                this.currentPage = val
                this.getContData()
            },
            toSearchList(val){
                window.location.href = `/search/${val}`
            },
            async tabClick(){
                this.currentPage = 1
                await this.getContData()
                if(!this.userAgent) {
                    this.infiniteData = this.moviesData
                }
            }
        },
        mounted(){
            console.dir(this.userInfo)
        }
    }
</script>
<style lang="scss">
  .movies-home-page {
      margin-top: 60px;
      background: #fff;
  }
  .main-tab {
      width: 100%;
      padding: 8px;
      .el-tabs--border-card {
          border: 0px;
      }
      .el-tabs--border-card {
          box-shadow: 0px;
      }
      .el-tabs__nav {
          background-color: #000;
      }
      .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
          color: #fff;
      }
      .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
          color: #000;
          &:hover{
              color: #000;
          }
      }
      
  }
  .nav-tab{
      display: none;
      .el-tag{
          cursor: pointer;
      }
  }
  .pagination-wrap{
      padding: 30px;
      text-align: center;
      .el-pager li,
      .el-pagination button{
          height: 40px;
          line-height: 40px;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active{
          background-color: #181818;
      }
      .el-pagination.is-background .el-pager li:not(.disabled):hover{
          color: #de2600;
      }
      .el-pagination.is-background .el-pager li{
          min-width: 40px;
      }
  }
  @media screen and (min-width: 768px){
      .nav-tab{
        display: block;
        padding: 8px;
        .el-tag{
        margin: 2px;
        }
      } 
  }

</style>
