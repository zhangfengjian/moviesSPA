<template>
    <div class="movie-manage">
        <div class="movie-manage-contain">
            <el-form ref="movieForm" :model="movieForm" class="movie-form" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="视频名称">
                            <el-input v-model="movieForm.movieName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="视频作者">
                            <el-input v-model="movieForm.movieAuth"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="平台认证">
                            <el-radio-group v-model="movieForm.authentication">
                                <el-radio :label="0">已认证</el-radio>
                                <el-radio :label="1">未认证</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="视频时长">
                            <el-input v-model="movieForm.videoTime"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="图片链接">
                    <el-input v-model="movieForm.pictureUrl"></el-input>
                </el-form-item>
                <el-form-item label="广告图片">
                    <el-input v-model="adsUrl1"></el-input>
                </el-form-item>
                <el-form-item label="广告图片">
                    <el-input v-model="adsUrl2"></el-input>
                </el-form-item>
                <el-form-item label="视频链接">
                    <el-input v-model="movieForm.videoUrl"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="视频分类">
                            <el-cascader
                                :options="options"
                                v-model="selectedOptions">
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="视频标签">
                            <el-select v-model="selectedTabOptions" placeholder="请选择">
                                <el-option
                                    v-for="item in tabOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="text-center">
                    <el-button @click.prevent="pushVideos()">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        layout: 'form',
        data(){
            return {
                adsUrl1:'',
                adsUrl2:'',
                movieForm: {
                    movieName: '',
                    movieAuth: '',
                    authentication: '',
                    videoTime: '',
                    pictureUrl: '',
                    videoUrl: '',
                    subId: '',
                    superId: '',
                    tabType: '',
                    adsUrl: []
                },
                selectedOptions: [],
                tabOptions: [
                    {value:1,label:'home'},
                    {value:2,label:'ssr'},
                    {value:3,label:'favor'}
                ],
                selectedTabOptions: ''
            }
        },
        computed: {
            options(){
                let data = this.$store.state.Category.category
                let resetData = []
                data.forEach((item) => {
                    let objItem = {
                        value: item.superId,
                        label: item.levelName
                    }
                    if(item.subCategory && item.subCategory.length>0){
                        let childData = []
                        item.subCategory.forEach((child)=>{
                            let childItem = {
                                value: child.subId,
                                label: child.levelName,
                            }
                            childData.push(childItem)
                        })
                        objItem.children = childData
                    }
                    
                    resetData.push(objItem)
                })
                return resetData
            }
        },
        methods: {
            pushVideos(){
                this.movieForm.superId = this.selectedOptions[0]
                this.movieForm.subId = this.selectedOptions[1]
                this.movieForm.tabType = this.selectedTabOptions
                this.movieForm.adsUrl=[this.adsUrl1,this.adsUrl2]
                this.$store.dispatch('MOVIEHOME',this.movieForm).then(data=>{
                    if(data.success){
                        this.$message({
                            type: 'success',
                            message: '视频上传完成'
                        })
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
.movie-manage{
    .text-center{
        text-align: center;
    }
    .movie-manage-contain{
        width: 960px;
        padding: 0 15px;
        margin: 60px auto;
        .movie-form{
            padding-right: 100px;
            .el-cascader{
                width: 100%;
            }
            .el-select{
                width: 100%;
            }
        }
    }
}
</style>