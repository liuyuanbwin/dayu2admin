<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>新建订单</span>
    </div>
    <div class="step-container">
      <billform :readycarno="this.$route.query.carno"></billform>
    </div>
  </el-card>
</template>

<script>
import billform from '../../../components/bills/addbillform.vue'
export default {
  data() {
    return {
      car: {}
    }
  },
  created() {
    console.log(`传入的值是  ${JSON.stringify(this.$route.query.carno)}`)
  },
  components: {
    billform
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.step-container {
  height: 500px;
}
.step-main {
  // margin-left: 50px;
  padding-top: 40px;
  text-align: center;
}
</style>
