<template>
  <div class="bg-color">
    <div class="login-container">
      <h2>阳光小区物业系统</h2>
      <el-form :model="loginModel" ref="loginForm" :rules="rules" label-width="80px" label-position="left" :inline="false"
        size="small">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginModel.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginModel.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input v-model="loginModel.captchaCode" style="width:50%;float:left"></el-input>
          <img :src="imgSrc" @click="loadCaptcha" title="看不清请刷新" style="height: 30px;margin-left: 10px;float: left;" />
          <!-- <img src="@/assets/imgs/captcha.png" style="height: 30px;margin-left: 10px;float: left;" /> -->
        </el-form-item>
        <el-form-item label="账号类型" prop="userType">
          <el-radio-group v-model="loginModel.userType">
            <el-radio :label="0">业主</el-radio>
            <el-radio :label="1">物主</el-radio>
          </el-radio-group>

        </el-form-item>

        <el-button type="primary"
          style="width:100%;background-color: #CBBDDD;color: #000;border: none;border-radius: 20px;"
          @click="login">登录</el-button>

      </el-form>

    </div>
  </div>
</template>

<script>
// 导入登录请求
import { captchaApi, loginApi } from '@/api/login';
export default {
  name: 'Login',

  data() {
    return {
      loginModel: {
        username: '',
        password: '',
        cpatchaCode: '',
        capthcaId: '',
        userType: null
      },
      imgSrc: '',
      rules: {
        user: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        captchaCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        userType: [
          { required: true, message: '账户类型不能为空', trigger: 'blur' }
        ],
      }
    }
  },

  mounted() {
    // 验证码处理如下
    this.loadCaptcha();
  },

  methods: {
    async loadCaptcha() {
      let res = await captchaApi();
      this.imgSrc = 'data:image/png;base64,' + res.data.imageBase64;
      this.loginModel.captchaId = res.data.captchaId;
    },
    // 编写登录方法
    login() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const res = await loginApi(this.loginModel);
          if (res.code == 200) {
            this.$message(res.msg)
            window.sessionStorage.setItem("authorization", res.data.token);
            this.$router.push("/home");
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.bg-color {
  width: 100%;
  height: 100%;
  // background-color: #000000;
  background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);
  overflow: hidden;

  .login-container {
    width: 450px;
    height: 330x;
    background-color: #FFFFFF;
    margin: 100px auto;
    border-radius: 5px;
    padding: 30px;
    // border-top-left-radius: 15px;
    //左上角具有了px的弧度。
    //上下左右四个角的弧度值都是15px；
    border-radius: 20px;

    h2 {
      text-align: center;
      font-size: 21px;
      font-family: '微软雅黑';
      height: 70px;
      line-height: 70px;
      color: #000000;

    }
  }
}
</style>
