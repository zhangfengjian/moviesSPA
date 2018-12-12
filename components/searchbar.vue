<template>
    <section class="search-bar" v-if="visible" @closeModel.parent="close()">
        <el-input v-model="keyword">
            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
        </el-input>
    </section>
</template>
<script>
    export default {
        data(){
            return {
                keyword: ''
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        methods: {
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
            close(){
                this.$emit('updata:visible',false)
            }
        }
    }
</script>
<style lang="scss">
.search-bar{
    padding: 15px;
    position: absolute;
    width: 100%;
    top: 40px;
    background: #eee;
}
</style>