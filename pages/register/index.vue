<template>
    <div class="register">
        <h3 class="tit">Welcome to register</h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="User Name" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item class="text-center">
                <el-button @click="submitForm('ruleForm')">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    layout: 'form',
    data() {
    return {
        ruleForm: {
            username: '',
            email: '',
            password: ''
        },
        rules: {
            username: [
                { required: true, message: 'name is required', trigger: 'submitForm' }
            ],
            email: [
                { type: 'email', required: true, message: 'email is required', trigger: 'submitForm' }
            ],
            password: [
                { required: true, message: 'password is required', trigger: 'submitForm' }
            ]
        }
    };
    },
    methods: {
        ...mapActions({
            register: 'REGISTER',
            login: 'LOGIN'
        }),
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                console.log(valid)
                if (valid) {
                    this.register(this.ruleForm).then((data)=>{
                        if(data.success){
                            return data
                        }else{
                            this.$message({
                                message: data.data.desc,
                                type: 'error'
                            })
                        }
                    },(err)=>{
                        alert(err)
                    }).then(()=>{
                        this.login(this.ruleForm).then(data=>{
                            this.$router.push('/')
                        })
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="scss">
    .register{
        width: 300px;
        margin: 0 auto;
        .tit{
            font-size: 24px;
            font-style: italic;
            color: #3e3e3e;
            text-align: center;
            padding: 30px 0;
        }
    }
</style>