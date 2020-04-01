<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单详情</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="checkCar"
          >查看车辆</el-button
        >
      </div>
      <table>
        <tr>
          <th>
            车牌号码
          </th>

          <td>{{ bill.carId.carno }}</td>
          <th>
            车辆类型
          </th>

          <td>{{ bill.carId.type | cartype }}</td>
        </tr>
        <tr>
          <th>
            订单类型
          </th>
          <td>{{ bill.type | billtype }}</td>
          <th>
            服务公司
          </th>
          <td>{{ bill.companyId.name }}</td>
        </tr>

        <tr>
          <th>
            订单金额
          </th>
          <td colspan="3">{{ bill.price }}</td>
        </tr>
        <tr>
          <th>
            备注
          </th>
          <td colspan="3">{{ bill.remark }}</td>
        </tr>
        <tr>
          <th>
            联系人
          </th>
          <td>{{ bill.linkmanId.name }}</td>
          <th>
            联系电话
          </th>
          <td>{{ bill.linkmanId.tel }}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bill: {}
    }
  },
  created() {
    this.getBilDetail()
  },
  methods: {
    async getBilDetail() {
      const { data: res } = await this.$http.post('api/bills/detail', {
        billId: this.$route.query.billId
      })
      this.bill = res.data
      console.log(`res ==> ${JSON.stringify(res.data)}`)
    },
    checkCar() {
      this.$router.push({
        path: '/cardetail',
        query: { carId: this.bill.carId._id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item-title {
  font-size: 15px;
  color: slategrey;
}
.box-card {
  margin: 5px 0;
}

table {
  border-collapse: collapse;
  width: 96%;

  margin: 20px auto;
  text-align: center;
}
table td,
table th {
  border: 1px solid #cad9ea;
  color: #666;
  height: 40px;
  width: 25%;
}
table thead th {
  background-color: #cce8eb;
  // width: 100px;
}
table tr:nth-child(odd) {
  background: #fff;
}
table tr:nth-child(even) {
  background: #f5fafa;
}
</style>
