<template>
  <div class="billform-container">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="bill-form"
    >
      <el-form-item label="车辆" prop="carkeyword">
        <el-col :span="20">
          <el-form-item label="">
            <el-autocomplete
              class="inline-input"
              v-model="form.carkeyword"
              :fetch-suggestions="getCarsList"
              placeholder="搜索现有车辆"
              @select="handleCarSelect"
              prefix-icon="el-icon-search"
              @focus="focusCarSearch"
            >
            </el-autocomplete>
          </el-form-item>
        </el-col>
        <el-button type="primary" @click="isnewcar = true">新建车辆</el-button>
      </el-form-item>

      <el-form-item label="订单类型" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择订单类型"
          :disabled="false"
        >
          <el-option label="交强险" value="1"></el-option>
          <el-option label="商业险" value="2"></el-option>
          <el-option label="验车" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="保险公司" prop="companykeyword">
        <el-autocomplete
          class="inline-input"
          v-model="form.companykeyword"
          :fetch-suggestions="getCompanys"
          placeholder="搜索保险公司"
          @select="handleCompanySelect"
          prefix-icon="el-icon-search"
        >
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="订单金额" prop="price">
        <el-input
          placeholder="请输入订单金额"
          v-model.number="form.price"
          type="number"
          @focus="form.price = ''"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-col :span="19">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="到期时间">
        <el-col :span="9">
          <el-form-item prop="expireDate">
            <el-date-picker
              type="datetime"
              placeholder="到期时间"
              v-model="form.expireDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="5">出单时间</el-col>
        <el-col :span="9">
          <el-form-item prop="createDate">
            <el-date-picker
              type="datetime"
              placeholder="出单时间"
              v-model="form.createDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="联系人" prop="linkmankeyword">
        <el-col :span="20">
          <el-autocomplete
            class="inline-input"
            v-model="form.linkmankeyword"
            :fetch-suggestions="getLinkmanList"
            placeholder="搜索现有联系人"
            @select="handleLinkmanSelect"
            prefix-icon="el-icon-search"
            @focus="focusLinkmanSearch"
          >
          </el-autocomplete>
        </el-col>
        <el-button type="primary" @click="isnewlinkman = true"
          >新建联系人</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createBill"
          >立即创建</el-button
        > </el-form-item
      >q
    </el-form>

    <!-- 创建新车辆表单 -->
    <el-dialog title="新建车辆" :visible.sync="isnewcar" :center="true">
      <el-form :model="creatcarform" :rules="creatcarrules" ref="createCarForm">
        <el-form-item
          label="车牌号码"
          :label-width="formLabelWidth"
          prop="carno"
        >
          <el-input v-model="creatcarform.carno" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="车辆类型"
          :label-width="formLabelWidth"
          prop="type"
        >
          <el-select v-model="creatcarform.type" placeholder="请选择车辆类型">
            <el-option label="5人以下客车" value="1"></el-option>
            <el-option label="5人以上客车" value="2"></el-option>
            <el-option label="货车" value="3"></el-option>
            <el-option label="其他" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isnewcar = false">取 消</el-button>
        <el-button type="primary" @click="createNewCar">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新建联系人 -->
    <el-dialog title="新建联系人" :visible.sync="isnewlinkman" :center="true">
      <el-form
        :model="createlinkmanform"
        :rules="createlinkmanrules"
        ref="createLinkmanForm"
      >
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input
            v-model="createlinkmanform.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="tel">
          <el-input
            v-model="createlinkmanform.tel"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isnewlinkman = false">取 消</el-button>
        <el-button type="primary" @click="createNewLinkman">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLabelWidth: '100px',
      presetCar: true,
      presetCompany: true,
      presetLinkman: true,
      isnewcar: false,

      creatcarform: {
        type: '1'
      },
      creatcarrules: {
        carno: [{ required: true, message: '请输入车牌号码', trigger: 'blur' }],
        type: [{ required: true, message: '请选择车辆类型' }]
      },

      isnewlinkman: false,
      createlinkmanform: {},
      createlinkmanrules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
      },

      form: {
        carkeyword: '',
        type: '1',
        companykeyword: '',
        companyId: '',
        price: 0,
        expireDate: Date.now(),
        createDate: Date.now(),
        linkmankeyword: '',
        linkmanId: ''
      },

      rules: {
        carkeyword: [
          { required: true, message: '请选择或新建车辆', trigger: 'blur' }
        ],
        type: [{ required: true, trigger: 'blur' }],
        companykeyword: [
          { required: true, message: '请选择保险公司', trigger: 'blur change' }
        ],
        price: [
          {
            required: true,
            message: '请输入订单金额',
            trigger: 'blur'
          },
          {
            type: 'number',
            min: 0,
            message: '订单金额需大于0',
            trigger: 'blur'
          }
        ],
        expireDate: [
          { required: true, message: '请输入到期时间', trigger: 'blur' }
        ],
        createDate: [
          { required: true, message: '请输入开单号码', trigger: 'blur' }
        ],
        linkmankeyword: [
          { required: true, message: '请选择联系人', trigger: 'blur change' }
        ]
      }
    }
  },
  props: ['readycarno'],
  mounted() {
    console.log(`getCarsList 4`)
    this.getCarsList(this.readycarno || '', () => {})
    this.getCompanys('', () => {})
    this.getLinkmanList('', () => {})
  },
  methods: {
    validatePrice(rule, value, callback) {
      console.log('调动了验证')
      if (!value) {
        callback(new Error('必须输入金额'))
      }
      value = Number(value)
      if (typeof value === 'number' && !isNaN(value)) {
        callback()
      } else {
        callback(new Error('金额必须为数字'))
      }
    },
    async getCarsList(keyword, cb) {
      console.log(`getCarsList 1`)
      const { data: res } = await this.$http.post('api/cars/list', {
        keyword
      })
      res.data.cars.forEach(item => {
        item.value = item.carno
      })
      if (this.presetCar) {
        this.presetCar = false
        this.form.carId = res.data.cars[0]._id
        this.form.carkeyword = res.data.cars[0].carno
        if (this.readycarno) {
          this.form.carkeyword = this.readycarno

          console.log(`carkeyword ===  ${this.form.carkeyword}`)
          console.log(`getCarsList 2`)
          // await this.getCarsList(this.form.carkeyword, () => {})
        }
        console.log(`getCarsList 3`)
        console.log()
      }
      cb(res.data.cars)
    },
    handleCarSelect(item) {
      this.form.carId = item._id
      this.form.carkeyword = item.carno
    },
    focusCarSearch() {
      this.form.carkeyword = ''
      this.form.carId = ''
    },
    async getCompanys(keyword, cb) {
      const { data: res } = await this.$http.post('api/company/list', {
        keyword
      })
      res.data.companies.forEach(item => {
        item.value = item.name
      })
      if (this.presetCompany) {
        this.presetCompany = false
        this.form.companyId = res.data.companies[0]._id
        this.form.companykeyword = res.data.companies[0].name
      }
      cb(res.data.companies)
    },
    handleCompanySelect(item) {
      this.form.companyId = item._id
      this.form.companykeyword = item.name
    },
    focusCompanySearch(item) {
      this.form.companykeyword = ''
      this.form.companyId = ''
    },

    async getLinkmanList(keyword, cb) {
      const { data: res } = await this.$http.post('api/linkmans/list', {
        keyword
      })
      res.data.linkmans.forEach(item => {
        item.value = item.name
      })
      if (this.presetLinkman) {
        this.presetLinkman = false
        this.form.linkmanId = res.data.linkmans[0]._id
        this.form.linkmankeyword = res.data.linkmans[0].name
      }
      cb(res.data.linkmans)
    },
    handleLinkmanSelect(item) {
      this.form.linkmanId = item._id
      this.form.linkmankeyword = item.name
    },
    focusLinkmanSearch(item) {
      this.form.linkmankeyword = ''
      this.form.linkmanId = ''
    },
    createCar() {
      this.isnewcar = true
      this.creatcarform = { type: '1' }
    },
    createNewCar() {
      this.$refs.createCarForm.validate(async valid => {
        if (valid) {
          alert('validate ok')
          const { data: res } = await this.$http.post('api/cars/add', {
            carno: this.creatcarform.carno,
            type: this.creatcarform.type
          })
          if (res.result === 0) {
            this.isnewcar = false
            this.$message.success('添加车辆成功')
            this.creatcarform = {
              type: '1'
            }
            this.car = res.data
            this.form.carId = this.car._id
            this.form.carkeyword = this.car.carno
          } else {
            this.$message.error(res.message)
          }
        } else {
          return false
        }
      })
    },
    createNewLinkman() {
      this.$refs.createLinkmanForm.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post(
            'api/linkmans/add',
            this.createlinkmanform
          )
          if (res.result === 0) {
            this.isnewlinkman = false
            this.$message.success('添加联系人成功')
            this.createlinkmanform = {}
            console.log(res)
            this.form.linkmanId = res.data._id
            this.form.linkmankeyword = res.data.name
          } else {
            this.$message.error(res.message)
          }
        } else {
          return false
        }
      })
    },
    createBill() {
      console.log(this.form)
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post(
            'api/bills/add',
            this.form
          )
          if (res.result === 0) {
            this.$message.success('添加订--单成功')
            this.$router.push({
              path: '/cardetail',
              query: { carId: this.form.carId }
            })
          } else {
            this.$message.error(res.message)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.billform-container {
  .bill-form {
    margin-top: 40px;
    margin-left: 40px;
    .el-textarea,
    .el-input,
    .el-select,
    .el-autocomplete {
      width: 700px;
    }
    .line {
      width: 85px;
      text-align: center;
    }
  }
  .el-dialog {
    width: 100px;
    .el-select {
      width: 441px;
    }
    .el-input {
      width: 90%;
    }
  }
}
</style>
