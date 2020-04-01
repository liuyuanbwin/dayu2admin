<template>
  <el-card :body-style="{ padding: '0px' }">
    <div slot="header">
      <span> 新建车辆<!-- card title --></span>
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
        <el-form-item
          label="车牌号码"
          :label-width="formLabelWidth"
          prop="carno"
        >
          <el-input v-model="form.carno" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="车辆类型"
          :label-width="formLabelWidth"
          prop="addtype"
        >
          <el-select v-model="form.addtype" placeholder="请选择车辆类型">
            <el-option label="5人以下客车" value="1"></el-option>
            <el-option label="5人以上客车" value="2"></el-option>
            <el-option label="货车" value="3"></el-option>
            <el-option label="其他" value="4"></el-option>
          </el-select>
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

        <el-form-item
          prop="checkDate"
          label="验车时间"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            type="datetime"
            placeholder="验车时间"
            v-model="form.checkDate"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="createNewCar">立即创建</el-button>
        </el-form-item>
      </el-form>

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
        carno: '',
        createDate: Date.now(),
        addtype: '1',
        linkmankeyword: '',
        linkmanId: '',
        checkDate: Date.now()
      },
      rules: {
        carno: [{ required: true, message: '请输入车牌号码', trigger: 'blur' }],
        addtype: [{ required: true, message: '请选择车辆类型' }],
        createDate: [
          { required: true, message: '请输入开单号码', trigger: 'blur' }
        ],
        linkmankeyword: [
          { required: true, message: '请选择联系人', trigger: 'blur change' }
        ],
        checkDate: [
          { required: true, message: '请选择验车日期', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getLinkmanList('', () => {})
  },
  methods: {
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
    createNewCar() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          var s = {
            carno: this.form.carno,
            type: this.form.addtype,
            checkDate: this.form.checkDate,
            linkmans: [{ linkmanId: this.form.linkmanId }]
          }

          const { data: res } = await this.$http.post('api/cars/add', s)
          if (res.result === 0) {
            this.isnewcar = false
            this.$message.success('添加车辆成功')
            this.creatcarform = {
              type: '1'
            }
            this.car = res.data
            this.form.carId = this.car._id
            this.form.carkeyword = this.car.carno
            this.$router.push({
              path: '/cardetail',
              query: { carId: this.car._id }
            })

            console.log(this.billdetail)
          } else {
            this.$message.error(res.message)
          }
        } else {
          return false
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
    .el-autocomplete,
    .el-date-picker {
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
