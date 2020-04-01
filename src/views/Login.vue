<template>
  <div class="login-container">
    <div class="login-box">
      <el-form
        ref="formRef"
        :model="form"
        label-width="83px"
        class="login-form"
        label-position="left"
        :rules="formRules"
      >
        <el-form-item label="手机号码:" prop="tel">
          <el-input
            v-model="form.tel"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            v-model="form.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <el-row class="btns">
          <el-button class="btn" type="primary" @click="login" plain
            >登录</el-button
          >
          <el-button class="btn" type="primary" @click="register" plain
            >注册账号</el-button
          >
        </el-row>
        <!-- <el-form-item class="btns">
          <el-button class="btn" type="primary" @click="login"
            >立即创建</el-button
          >
          <el-button type="primary" class="btn">取消</el-button>
        </el-form-item> -->
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: { tel: "13831217198", password: "password" },
      formRules: {
        tel: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 20, message: "请输入8~20位密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.formRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "api/agents/login",
          this.form
        );
        const code = res.result;
        console.log(res);
        if (code === 0) {
          this.$message.success("登录成功!");
          window.sessionStorage.setItem("token", "Bearer " + res.data.token);
          this.$router.push("/home");
        } else {
          this.$message.error(res.message);
        }
      });
    },
    register() {
      this.$router.push("/register");
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  .login-box {
    width: 450px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid red;
    border-radius: 5px;
  }
}
.login-form {
  padding: 40px 20px;
  bottom: 20px;
  position: absolute;
  width: 410px;
}
.btns {
  display: flex;
  justify-content: space-between;

  .btn {
    width: 49%;
  }
}
</style>
