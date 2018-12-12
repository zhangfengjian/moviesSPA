<template>
  <div class="login">
    <h3 class="tit">Welcome to Login</h3>
    <el-form :model="user" :rule="rules" ref="userform">
      <el-form-item label="User Name" prop="username">
        <el-input v-model="user.username" placeholder="username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="user.password" placeholder="password" autocomplete="off" @keyup.enter="login"></el-input>
      </el-form-item>
      <el-form-item class="text-center">
        <el-button @click="login('userform')">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  layout: 'form',
  data() {
    return {
      user:{
        username: '',
        password: ''
      },
      rules: {
        username:{ required: true, whitespace: true, message: 'name is required', trigger: 'login'},
        password:{ required: true, whitespace: true, message: 'password is required', trigger: 'login'}
      }
    }
  },
  head() {
    return {
      // title: '登录 - ' + this.$store.state.user.nickname
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) =>{
        if(valid){
          this.$store.dispatch('LOGIN', this.user).then(data => {
            if(data.success) {
              this.$router.push('/')
            } else {
              this.$message({
                message: 'User or password incorrect',
                type: 'error'
              })
            }
          })
        }else{
          this.$message({
            message: 'User or password incorrect',
            type: 'error'
          })
        }
      })
      
    }
  }
}
</script>
<style lang="scss">
.login{
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

