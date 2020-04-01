<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>车辆列表</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="$router.push({ path: '/addcar' })"
          >新建车辆</el-button
        >
      </div>
      <el-table
        :data="carslist"
        stripe
        style="width: 100%"
        @cell-click="selectCar"
      >
        <el-table-column prop="createDate" label="创建日期" width="180">
          <template slot-scope="scope">
            {{ scope.row.createDate | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="carno" label="车牌号码" width="180">
        </el-table-column>
        <el-table-column prop="type" label="车辆类型">
          <template slot-scope="scope">
            {{ scope.row.type | cartype }}
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页控件 -->
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :page-count="4"
        :current-page="pageIndex"
        @current-change="pageChange"
        :hide-on-single-page="true"
      >
      </el-pagination>
    </el-card>

    <!-- 新建车辆信息对话框 -->
    <el-dialog ref="carForm" title="添加车辆" :visible.sync="formVisible">
      <el-form :model="form">
        <el-form-item label="车牌号码" :label-width="formLabelWidth">
          <el-input v-model="form.carno" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="车辆类型" :label-width="formLabelWidth">
          <el-select v-model="addtype" placeholder="请选择车辆类型">
            <el-option label="5人以下客车" value="1"></el-option>
            <el-option label="5人以上客车" value="2"></el-option>
            <el-option label="货车" value="3"></el-option>
            <el-option label="其他" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCar">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLabelWidth: '80',
      addtype: '1',
      form: {},
      formVisible: false,
      // 查询相关
      keyword: '',
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      carslist: []
    }
  },
  created() {
    this.getCarlist()
  },

  methods: {
    async addCar() {
      const userinfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
      var newCar = {
        carno: this.form.carno,
        managerId: userinfo.id,
        agentId: userinfo.agentId,
        type: this.addtype
      }

      const { data: res } = await this.$http.post('api/cars/addcar', newCar)
      console.log(res)
      if (res.result === 0) {
        console.log('success === ----')
        this.form.carno = ''
        this.addtype = 1
        this.formVisible = false
        this.$message.success('添加成功')
        this.pageIndex = 1
        this.getCarlist()
      } else {
        console.log('error === ----')
        this.form.carno = ''
        this.addtype = 1
        this.formVisible = false
        this.$message.error(res.data.message)
      }
    },
    searchCarslist() {
      this.pageIndex = 1
      this.getCarlist()
    },
    async getCarlist(query) {
      console.log('clip')
      const { data: res } = await this.$http.post('api/cars/list', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        keyword: this.keyword || ''
      })
      this.carslist = res.data.cars
      this.total = res.data.total
    },
    pageChange(pageIndex) {
      console.log(pageIndex)
      this.pageIndex = pageIndex
      this.getCarlist()
    },
    selectCar(row) {
      this.$router.push({ path: '/cardetail', query: { carId: row._id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-page-header {
  margin: 0px 0px 20px 0px;
}
.el-pagination {
  margin-top: 20px;
}
</style>
