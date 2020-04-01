<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix"></div>
      <el-tag
        v-for="tag in linkmans"
        :key="tag._id"
        @close="handleCloseTag(tag)"
        closable
        >{{ tag.name }}</el-tag
      >
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputDisable: true,
      linkman: {},
      keyword: '',
      form: {},
      linkmans: []
    }
  },
  created() {},
  methods: {
    async getLinkmans(keyword, cb) {
      const { data: res } = await this.$http.post('api/linkmans/list', {
        query: { keyword }
      })
      res.data.linkmanlist.forEach(item => {
        item.value = item.name
      })
      cb(res.data.linkmanlist)
    },
    handleSelect(item) {
      const index = this.linkmans.findIndex(linkman => {
        return linkman._id === item._id
      })
      console.log(`index ===>>> ${index}`)
      if (index > -1) {
        this.$message.error('联系人已选定')
      } else {
        this.linkmans.push(item)
      }
    },
    focusSearch() {
      this.linkman = {}
      this.inputDisable = true
    },
    createLinkman() {
      this.linman = {}
      this.inputDisable = false
    },
    handleCloseTag(tag) {
      console.log(tag)
      const index = this.linkmans.findIndex(linkman => {
        return linkman.name === tag
      })
      this.linkmans.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 40px;
}
</style>
