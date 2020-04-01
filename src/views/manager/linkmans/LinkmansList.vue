<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>联系人列表</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="formVisible = true"
          >添加联系人</el-button
        >
      </div>
      <el-table :data="linkmanlist" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column prop="tel" label="电话号码" width="180">
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

    <!-- 新建车辆信息对话框 -->
    <el-dialog ref="carForm" title="添加联系人" :visible.sync="formVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLinkman">确 定</el-button>
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
      linkmanlist: []
    }
  },
  created() {
    this.getLinkmanList()
  },
  methods: {
    async addLinkman() {
      const userinfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
      var newLinkman = {
        name: this.form.name,
        managerId: userinfo.id,
        agentId: userinfo.agentId,
        tel: this.form.tel
      }

      const { data: res } = await this.$http.post(
        'api/linkmans/addlinkman',
        newLinkman
      )

      if (res.result === 0) {
        console.log('success === ----')
        this.form = {}
        this.formVisible = false
        this.$message.success('添加成功')
        this.pageIndex = 1
        this.getLinkmanList()
      } else {
        console.log('error === ----')
        this.form = {}
        this.formVisible = false
        this.$message.error(res.data.message)
      }
    },
    searchCarslist() {
      this.pageIndex = 1
      this.getLinkmanList()
    },
    async getLinkmanList(keyword) {
      const { data: res } = await this.$http.post('api/linkmans/list', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        keyword: this.keyword || ''
      })
      this.linkmanlist = res.data.linkmans
      this.total = res.data.total
    },
    pageChange(pageIndex) {
      console.log(pageIndex)
      this.pageIndex = pageIndex
      this.getLinkmanList()
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
