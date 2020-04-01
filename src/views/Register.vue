<template>
  <div class="register-container">
    <h1>注册</h1>
    <div class="login-box">
      <el-form
        ref="formRef"
        :model="form"
        label-width="83px"
        class="login-form"
        label-position="left"
        :rules="formRules"
      >
        <el-form-item label="用户名:" prop="name">
          <el-input
            v-model="form.name"
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
        <el-form-item label="重复密码:" prop="repeatpwd">
          <el-input
            v-model="form.repeatpwd"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="showAgent" label="所属部门:" prop="agentId">
          <el-select v-model="form.agentId" placeholder="请选择">
            <el-option
              v-for="item in agents"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册类型:" prop="type">
          <el-radio-group v-model="form.type" size="medium">
            <el-radio-button :label="1">代理</el-radio-button>
            <el-radio-button :label="2">业务员</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码:" prop="tel">
          <el-input
            v-model="form.tel"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <el-row class="btns">
          <el-button class="btn" type="primary" plain @click="getAgentlist"
            >登录</el-button
          >
          <el-button class="btn" type="primary" plain @click="register"
            >注册账号</el-button
          >
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      agents: [],
      form: {
        tel: "13831217198",
        password: "password",
        repeatpwd: "password",
        name: "代理",
        type: 1
      },
      formRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 20, message: "请输入8~20位密码", trigger: "blur" }
        ],
        repeatpwd: [
          { required: true, message: "请重复输入密码", trigger: "blur" },
          {
            min: 8,
            max: 20,
            message: "请输入8~20位密码",
            trigger: ["blur", "change"]
          }
        ],
        agentId: [
          {
            required: true,
            message: "请选择所属部门",
            trigger: ["blur", "change"]
          }
        ],
        type: [{ required: true, message: "请选择注册类型", trigger: "blur" }],
        tel: [{ required: true, message: "请输入电话号码", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getAgentlist();
  },
  computed: {
    showAgent: function() {
      if (this.form.type !== 2) delete this.form.agentId;
      return this.form.type === 2;
    }
  },
  methods: {
    register() {
      this.$refs.formRef.validate(async valid => {
        if (!valid) return;
        if (this.form.password !== this.form.repeatpwd) {
          console.log("重复密码不对");
          this.$message.error("两次密码输入不一致");
          return;
        }
        const { data: res } = await this.$http.post(
          "api/agents/register",
          this.form
        );
        const code = res.result;
        if (code === 0) {
          this.$message.success("注册成功!");
          this.$router.push("/login");
        } else {
          this.$message.error(res.message);
        }
      });
    },
    async getAgentlist() {
      const { data: res } = await this.$http.get("api/agents/agentlist");
      this.agents = res.data.agentlist;
    }
  }
};
</script>

<style lang="scss" scoped>
.register-container {
  .login-box {
    width: 450px;
    height: 500px;
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
  bottom: 0px;
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
