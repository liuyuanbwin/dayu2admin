<template>
  <div>
    <h1>权限 管理</h1>
    <el-table :data="agents" style="width: 100%">
      <el-table-column label="注册日期" width="240">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.create_date | dateFormat
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="180">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-tag
            size="medium"
            :type="scope.row.status == 1 ? 'success' : 'danger'"
            >{{ scope.row.status == 1 ? '激活' : '冻结' }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :type="scope.row.status !== 1 ? 'success' : 'danger'"
            @click="handleEdit(scope.$index, scope.row)"
            >{{ scope.row.status !== 1 ? '激活' : '冻结' }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      agents: []
    }
  },
  created() {
    this.getAllAgents()
  },
  methods: {
    async getAllAgents() {
      const { data: res } = await this.$http.post('api/agents/manager', {
        operate: 'find',
        type: 2
      })
      this.agents = res.data
    }
  }
}
</script>

<style lang="scss" scoped></style>
