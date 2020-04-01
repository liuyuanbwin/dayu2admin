<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="6" align="center">
        <el-autocomplete
          class="inline-input"
          v-model="keyword"
          :fetch-suggestions="getCarsList"
          placeholder="搜索现有车辆"
          @select="handleSelect"
          @focus="focusSearch"
          prefix-icon="el-icon-search"
        >
        </el-autocomplete>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="createCar">添加车辆</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="2">车牌号:</el-col>
      <el-col :span="4">
        <el-input
          v-model="car.carno"
          placeholder="请输入内容"
          :disabled="inputDisable"
        ></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="2">车辆类型:</el-col>
      <el-col :span="4">
        <el-select
          v-model="car.type"
          placeholder="请选择车辆类型"
          :disabled="inputDisable"
        >
          <el-option label="5人以下客车" value="1"></el-option>
          <el-option label="5人以上客车" value="2"></el-option>
          <el-option label="货车" value="3"></el-option>
          <el-option label="其他" value="4"></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import addbillform from '../../components/bills/AddBillForm.vue'
export default {
  props: [],
  data() {
    return {
      inputDisable: true,
      keyword: '',
      car: { type: '1' }
    }
  },
  computed: {
    isCreateCar: function() {
      return !this.inputDisable
    }
  },
  watch: {
    car: function(newVal, oldVal) {
      this.car.type = newVal.type + ''
      this.handleSelect(this.car)
    }
  },
  methods: {
    getCarsList(keyword, cb) {
      this.$emit('searchCarlist', keyword, cb)
    },
    handleSelect(item) {
      this.$emit('handleSelected', item)
      this.car = item
    },
    createCar() {
      this.car = { type: '1' }
      this.inputDisable = false
    },
    focusSearch() {
      this.car = { type: '1' }
      this.keyword = ''
      this.inputDisable = true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 40px;
}
</style>
