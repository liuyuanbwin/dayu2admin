<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>回访列表</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="$router.push({ path: '/carlist' })"
          >添加回访</el-button
        >
      </div>
      <el-table
        :data="reviewlist"
        stripe
        style="width: 100%"
        @cell-click="clickReview"
      >
        <el-table-column prop="carId" label="车辆" width="180">
          <template slot-scope="scope">
            {{ scope.row.carId.carno }}
          </template>
        </el-table-column>
        <el-table-column prop="linkmanId" label="联系人" width="180">
          <template slot-scope="scope">
            {{ scope.row.linkmanId.name }}
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建日期">
          <template slot-scope="scope">
            {{ scope.row.createDate | dateFormat }}
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
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLabelWidth: '80',
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      reviewlist: []
    }
  },
  created() {
    this.getReviewList()
  },
  methods: {
    async getReviewList(keyword) {
      const { data: res } = await this.$http.post('api/reviews/list', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        keyword: this.keyword || ''
      })
      this.reviewlist = res.data.reviews
      this.total = res.data.total
    },
    pageChange(pageIndex) {
      console.log(pageIndex)
      this.pageIndex = pageIndex
      this.getReviewList()
    },
    clickReview(row) {
      this.$router.push({ path: '/cardetail', query: { carId: row.carId._id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-page-header {
  margin: 24px 0;
}
// .el-page-header {
//   margin: 0px 0px 20px 0px;
// }
</style>
