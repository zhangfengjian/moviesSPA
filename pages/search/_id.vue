<template>
    <div class="search-result-page">
        <div class="container">
            <div class="search-crumb">
                <span>seek out</span>
                <span class="markRed">"{{ totalCount }}"</span>
                <span>results</span>
            </div>
            <div class="search-result">
                <infinite @infiniteLoad="infiniteHandle" :isLoading="isLoading" :nomore="nomore">
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="12" :md="8" v-for="item in searchResultUA" :key="item._id">
                            <video-card :data="item"></video-card>
                        </el-col>
                    </el-row>
                </infinite>
            </div>
            <div class="pagination-wrap" v-show="totalCount>0  && userAgent">
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
            isLoading: false,
            nomore: false
        }
    },
    async asyncData({params,store}){
        let paramData = {
            pageSize: 12,
            currentPage: 1,
            keywords: params.id
        }
        let { data, total } = await store.dispatch('GETSEARCH', paramData)
         return {
             searchResult: data,
             totalCount: total,
             infiniteResult: data
         }
    },
    computed:{
        ...mapState({
            userAgent: state => state.UA
        }),
        searchResultUA(){
            if(this.userAgent){
                return this.searchResult
            }
            return this.infiniteResult
        }
    },
    methods:{
        async getSearchResult(){
            let { data, total } = await this.$store.dispatch('GETSEARCH', {
                pageSize: this.pageSize,
                currentPage: this.currentPage,
                keywords: this.$route.params.id
            })
            this.searchResult = data
            this.totalCount = total
        },
        async infiniteHandle(){
            if(this.userAgent) return
            if(!this.isLoading){
                if(this.infiniteResult.length < this.totalCount){
                    this.isLoading = true
                    this.currentPage++
                    await this.getSearchResult()
                    this.$nextTick(()=>{
                        this.infiniteResult = this.infiniteResult.concat(this.searchResult)
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
            this.getSearchResult()
        }
    }
}
</script>

<style lang="scss">
    .search-result-page{
        margin-top: 60px;
        .container{
            padding: 8px;
        }
        .search-crumb{
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 20px;
            .markRed{
                color: #de2600;
            }
        }
        .search-result{
            padding: 15px;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
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
    }
</style>
