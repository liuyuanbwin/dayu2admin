<template>
  <div class="list-container">
    <el-card :body-style="{ padding: '20px' }">
      <div slot="header" class="clearfix">
        <span>订单列表</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="createBill"
          >新建订单</el-button
        >
      </div>
      <!-- 顶部分页 -->
      <el-tabs
        v-model="billtype"
        @tab-click="handleClickType"
        type="border-card"
      >
        <el-tab-pane
          v-for="item in billtypes"
          :label="item.title"
          :name="item.type"
          :key="item.title"
        >
          <template id="billtable">
            <div>
              <el-table
                :data="billlist"
                style="width: 100%"
                :row-class-name="tableRowClassName"
                @cell-click="selectBill"
              >
                <el-table-column prop="carId.carno" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="companyId.name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="linkmanId.name" label="地址">
                </el-table-column>
                <el-table-column prop="expireDate" label="到期时间">
                  <template slot-scope="scope">
                    <div>
                      {{ scope.row.expireDate | dateFormat }}
                    </div>
                  </template>
                </el-table-column>
              </el-table>

              <el-pagination
                @current-change="currentChange"
                :current-page="pageIndex"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                background
              >
              </el-pagination>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      billtype: '4', // 1 交强 2 商业 3 验车 4 全部
      billtypes: [
        { type: '4', title: '全部' },
        { type: '1', title: '交强' },
        { type: '2', title: '商业' },
        { type: '3', title: '验车' }
      ],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      billlist: []
    }
  },
  // components: {
  //   btable: {
  //     template: '#billtable'
  //   }
  // },
  created() {
    this.getBillList()
  },
  methods: {
    handleClickType(tab, event) {
      console.log(this.billtype)
      this.getBillList()
    },
    async getBillList() {
      const { data: res } = await this.$http.post('api/bills/list', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        type: parseInt(this.billtype),
        expireDate: this.$route.query.expireDate || ''
      })
      this.billlist = res.data.bills
      this.total = res.data.total
    },
    tableRowClassName({ row, rowIndex }) {
      console.log(row.type)
      if (row.type === 1) {
        console.log('warning-row')
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    selectBill(row) {
      this.$router.push({ path: '/billdetail', query: { billId: row._id } })
    },
    currentChange(pageIndex) {
      this.pageIndex = pageIndex
      this.getBillList()
    },
    createBill() {
      this.$router.push('/addbill')
    }
  }
}
</script>

<style lang="scss">
.list-container {
}
.el-table {
  margin-bottom: 10px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-page-header {
  margin: 24px 0;
}
</style>
