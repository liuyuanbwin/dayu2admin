<template>
  <el-card class="schedule-container">
    <!-- <el-card class="search-card">
      <el-input
        placeholder="万能查询 输入\车牌号\电话号码\联系人姓名"
        v-model="keyword"
        clearable
      >
      </el-input> 
    </el-card> -->

    <el-card class="box-card">
      <el-calendar>
        <template slot="dateCell" slot-scope="{ date, data }">
          <div class="date-container">
            {{
              data.day
                .split('-')
                .slice(1)
                .join('-')
            }}
          </div>
          <div v-for="item in todolist" :key="item.id">
            <div v-if="item.day === data.day">
              <el-badge
                :value="item.count"
                v-if="item.count"
                class="item"
                @click.native="handleClickCalendar(data)"
              >
                <el-button type="info" icon="el-icon-message" round>
                </el-button>
              </el-badge>
            </div>
          </div>
        </template>
      </el-calendar>
    </el-card>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      todolist: []

      //  @clear="getCarlist"
      //       @input="getCarlist"
    }
  },
  created() {
    this.getTodos()
  },
  methods: {
    handleClickCalendar(date) {
      this.$router.push({ path: '/billlist', query: { expireDate: date.day } })
    },
    async getTodos() {
      const { data: res } = await this.$http.post('api/bills/todo')
      this.todolist = res.data.days
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule-container {
  width: 100%;
  height: 99%;
}
.calendar-day {
  text-align: center;
  color: #202535;
  line-height: 30px;
  font-size: 12px;
}
.is-selected {
  color: #f8a535;
  font-size: 10px;
  margin-top: 5px;
}
#calendar
  .el-button-group
  > .el-button:not(:first-child):not(:last-child):after {
  content: '当月';
}
.box-card {
  width: 100%;
  height: 50%;
  position: relative;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
}
.date-container {
  margin-right: 10px;
}
.is-circle {
  margin-left: 20px;
}
.item {
  margin-left: 40px;
}
</style>
