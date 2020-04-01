<template>
  <div class="billdetail">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="订单类型">
        <el-col :span="6"
          ><el-select
            v-model="form.type"
            placeholder="请选择车辆类型"
            :disabled="false"
          >
            <el-option label="交强险" value="1"></el-option>
            <el-option label="商业险" value="2"></el-option>
            <el-option label="验车" value="3"></el-option> </el-select
        ></el-col>
        <el-col :span="1" class="sec-title">保险公司 </el-col>
        <el-col :span="6"
          ><el-select
            v-model="form.companyId"
            placeholder="请选择保险公司"
            :disabled="false"
          >
            <el-option
              v-for="item in companies"
              :label="item.name"
              :value="item._id"
              :key="item._id"
            ></el-option> </el-select
        ></el-col>
      </el-form-item>
      <el-form-item label="保费金额" prop="price">
        <el-col :span="19">
          <el-input v-model="form.price"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="备注">
        <el-col :span="19">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="到期时间">
        <el-col :span="6">
          <el-date-picker
            type="datetime"
            v-model="form.expireDate"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-col>
        <el-col class="sec-title" :span="1" style="margin-left:100px;"
          >出单时间</el-col
        >
        <el-col :span="6">
          <el-date-picker
            type="datetime"
            v-model="form.createDate"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        type: '1', // 保单类型
        companyId: '', // 保险公司
        price: '', // 订单金额
        remark: '', // 备注
        expireDate: Date.now(), // 到期时间
        createDate: Date.now() // 出单时间
      },
      companies: [],
      rules: {
        type: [{ required: true, message: '请选择订单类型', trigger: 'blur' }],
        companyId: [
          { required: true, message: '请选择保险公司', trigger: 'blue' }
        ],
        price: [
          {
            required: true,
            message: '请输入订单金额',
            trigger: 'blur'
          }
        ],
        expireDate: [
          {
            type: 'date',
            required: true,
            message: '请选择订单到期时间',
            trigger: 'blur'
          }
        ],
        createDate: [
          {
            type: 'date',
            required: true,
            message: '请选择订单创建时间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    bill: function() {
      return {
        type: this.form.type,
        companyId: this.form.companyId,
        price: this.form.price,
        remark: this.form.remark,
        expireDate: this.form.expireDate,
        createDate: this.form.createDate
      }
    }
  },
  created() {
    console.log('detail created')
    this.getCompanys()
  },
  methods: {
    async getCompanys() {
      const { data: res } = await this.$http.post('api/company/list')
      console.log(res)
      this.companies = res.data
      this.form.companyId = res.data[0]._id
    },
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.billdetail {
  // padding-left: 80px;
  // padding-top: 20px;
  width: 800px;
  height: 400px;
  margin: 0 auto;
}
.sec-title {
  width: 70px;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  margin-left: 140px;
}
</style>
