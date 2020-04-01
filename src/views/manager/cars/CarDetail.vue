<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row>
          <el-col :span="12">
            <h1>{{ car.carno }}</h1>
            <h3>{{ car.type | cartype }}</h3>
            <h3>{{ car.checkDate | dateFormat }}</h3>
          </el-col>
          <el-col :span="12">
            <div class="head-top-right">
              <el-button
                style="float: right; padding: 3px 0;margin-left:60px;"
                type="text"
                size="large"
                @click="addform"
                >新建订单</el-button
              >
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                size="large"
                @click="addReview"
                >新建回访</el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="block" v-if="car.events">
        <el-timeline>
          <el-timeline-item
            v-for="event in car.events"
            :key="event._id"
            type="'info'"
            :size="'large'"
          >
            <el-card
              @click.native="toBillDetail(event)"
              v-if="event.etype === 'review'"
              shadow="never"
            >
              <i class="el-icon-phone-outline"></i>
              <h3>回访时间: {{ event.createDate | dateFormat }}</h3>
              <p>
                <span> 联系人: {{ event.linkmanId.name }} </span>
              </p>
            </el-card>
            <el-card
              @click.native="toBillDetail(bill)"
              v-if="event.etype === 'bill'"
            >
              <!-- <h1>{{ event.remind }}</h1> -->
              <h1 v-if="event.remind">
                <el-tag :type="tagtype[event.remind]">
                  {{ taginfo[event.remind] }}
                </el-tag>
              </h1>

              <i :class="[lineIcon(event.type)]"></i>
              <h2>{{ event.type | billtype }}</h2>
              <h3>到期时间: {{ event.expireDate | dateFormat }}</h3>
              <p>
                <span> 联系人: {{ event.linkmanId.name }} </span>
              </p>
              <h4>保险公司: {{ event.companyId.name }}</h4>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formVisible: false,
      formLabelWidth: '80',
      taginfo: {
        tip: '30天内到期',
        warning: '7天内到期',
        expired: '已超期'
      },
      tagtype: {
        tip: 'info',
        warning: 'warning',
        expired: 'danger'
      },
      car: {},
      form: {},
      rules: {
        carkeyword: [
          { required: true, message: '请选择或新建车辆', trigger: 'blur' }
        ],
        type: [{ required: true, trigger: 'blur' }],
        companykeyword: [
          { required: true, message: '请选择保险公司', trigger: 'blur change' }
        ],
        price: [{ required: true, message: '请输入保单金额', trigger: 'blur' }],
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
  created() {
    this.getCarDetail()
  },
  methods: {
    async getCarDetail() {
      const { data: res } = await this.$http.post('api/cars/detail', {
        carId: this.$route.query.carId
      })
      console.log(res)
      this.car = res.data
    },

    lineContent(type) {
      const contents = ['-', '交强险', '商业险', '验车']
      return '办理' + contents[type]
    },
    lineIcon(type) {
      const icons = [
        '-',
        'el-icon-medal',
        'el-icon-bank-card',
        'el-icon-camera-solid'
      ]
      return icons[type]
    },
    lineColor(type) {
      const colors = ['-', '#ff0000', '#00ff00', '#0000ff']
      return colors[type]
    },
    toBillDetail(bill) {
      console.log(bill)
      this.$router.push({ path: '/billdetail', query: { billId: bill._id } })
    },
    addform() {
      console.log(`传出的值是 ${this.car.carno}`)
      this.$router.push({ path: '/addbill', query: { carno: this.car.carno } })
    },
    addReview() {
      this.$router.push({
        path: '/addreview',
        query: { carno: this.car.carno }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-page-header {
  margin: 24px 0;
}
.head-top-right {
  border: 1px solid green;
  height: 50%;
  position: absolute;
  bottom: 0px;
  right: 0px;
  vertical-align: bottom;
}
.el-row {
  .el-col {
    h1 {
      background-color: blue;
      width: fit-content;
      color: white;
      padding: 0 10px;
      font-size: 40px;
      margin: 20px 0px 0px 40px;
      border-radius: 10px;
    }
    h3 {
      margin: 20px 0px 0px 45px;
    }
    height: 120px;
  }
}
</style>
