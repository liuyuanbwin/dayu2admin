<template>
  <el-card :body-style="{ padding: '0px' }">
    <div slot="header">
      <span> 新建回访<!-- card title --></span>
    </div>
    <!-- card body -->
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
          <el-button type="primary" @click="isnewcar = true"
            >新建车辆</el-button
          >
        </el-form-item>

        <el-form-item label="回访内容" prop="content">
          <el-col :span="19">
            <el-input type="textarea" v-model="form.content"></el-input>
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
        <el-form-item label="回访时间">
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
        <el-form-item>
          <el-button type="primary" @click="createReview">立即创建</el-button>
        </el-form-item>
      </el-form>

      <!-- 创建新车辆表单 -->
      <el-dialog title="新建车辆" :visible.sync="isnewcar" :center="true">
        <el-form
          :model="creatcarform"
          :rules="creatcarrules"
          ref="createCarForm"
        >
          <el-form-item
            label="车牌号码"
            :label-width="formLabelWidth"
            prop="carno"
          >
            <el-input
              v-model="creatcarform.carno"
              autocomplete="off"
            ></el-input>
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
          <el-form-item
            label="联系电话"
            :label-width="formLabelWidth"
            prop="tel"
          >
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
  </el-card>
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
        // type: '1',
        // expireDate: Date.now(),
        createDate: Date.now(),
        carkeyword: '',
        // companykeyword: '',
        // companyId: '',
        linkmankeyword: '',
        linkmanId: ''
      },
      rules: {
        carkeyword: [
          { required: true, message: '请选择或新建车辆', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入回访内容', trigger: 'blur' }
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
  mounted() {
    console.log(`getCarsList 4 ${this.$route.query.carno}`)
    this.getCarsList(this.$route.query.carno || '', () => {})
    this.getLinkmanList('', () => {})
  },

  computed: {
    billdetail: function() {
      return {
        carId: this.car._id || '',
        type: this.form.type || '',
        companyId: this.form.companyId || '',
        price: this.form.price || '',
        // linkmanId: this.linkman._id || '',
        remark: this.form.remark || ''
      }
    }
  },
  methods: {
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
          this.form.carkeyword = this.$route.query.carno

          console.log(`carkeyword ===  ${this.$route.query.carno}`)
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

            console.log(this.billdetail)
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
    createReview() {
      this.$refs.form.validate(async valid => {
        console.log(this.form)
        if (valid) {
          const { data: res } = await this.$http.post(
            'api/reviews/add',
            this.form
          )
          if (res.result === 0) {
            this.$message.success('添加回访成功')
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
