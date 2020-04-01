<template>
  <el-container class="home-container">
    <el-header
      >Header
      <el-row>
        <el-autocomplete
          class="inline-input"
          v-model="keyword"
          :fetch-suggestions="getSerachList"
          placeholder="万能查询 输入\车牌号\电话号码\联系人姓名"
          :trigger-on-focus="false"
          @select="handleSearchSelect"
          prefix-icon="el-icon-search"
          @focus="focusSearch"
        >
        </el-autocomplete>
        <el-button icon="el-icon-search" circle></el-button>
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="success" icon="el-icon-check" circle></el-button>
        <el-button
          type="info"
          icon="el-icon-message"
          circle
          @click="getInfo"
        ></el-button>
        <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="logout"
          >退出</el-button
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="activeSideIndex"
          class="el-menu-vertical-demo"
          router
        >
          <div class="side-header"></div>

          <el-menu-item
            v-for="submenu in menus"
            :index="submenu.url"
            :key="submenu.id"
            router
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ submenu.title }}</span>
            </template>
          </el-menu-item>
          <!-- <el-submenu
            v-for="item in menus"
            :key="item.id"
            :index="item.url"
            router
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.title }}</span>
            </template>

            <el-menu-item
              v-for="submenu in item.children"
              :index="submenu.url"
              :key="submenu.id"
              router
              >{{ submenu.title }}</el-menu-item
            >
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      menus: [],
      activeSideIndex: '/workbench',
      keyword: ''
    }
  },
  created() {
    this.getInfo()
    this.getMenus()
  },
  methods: {
    async getInfo() {
      try {
        const { data: res } = await this.$http.post('api/agents/info')
        window.sessionStorage.setItem('userInfo', JSON.stringify(res.data))
        if (res.data.type === 1) {
          this.$router.push('/workbench')
        } else {
          this.$router.push('/carlist')
        }
      } catch (error) {
        console.log(' -- 401')
      }
    },
    logout() {
      console.log('logout')
      window.sessionStorage.removeItem('token')
    },
    async getMenus() {
      try {
        const { data: res } = await this.$http.get('/api/menus/list')
        this.menus = res.data.menus
      } catch (error) {
        console.log(' -- 401')
      }
    },
    async getSerachList(key, cb) {
      const { data: res } = await this.$http.post('api/tools/chaos', {
        keyword: this.keyword
      })
      var suggest = []
      res.data.cars.forEach(item => {
        item.value = `车辆 ${item.carno}`
        item.type = 'car'
        suggest.push(item)
      })
      res.data.linkmans.forEach(item => {
        item.value = `联系人 ${item.name} ${item.tel}`
        item.type = 'linkman'
        suggest.push(item)
      })

      cb(suggest)
    },
    handleSearchSelect(item) {
      if (item.type === 'car') {
        this.$router.push({ path: '/cardetail', query: { carId: item._id } })
      } else {
      }
    },
    focusSearch() {
      this.keyword = ''
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
  max-height: 100%;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.side-header {
  height: 20px;
  width: 100%;
  background-color: red;
}
.el-autocomplete {
  width: 350px;
  margin: auto 20px;
  position: relative;
  left: 0%;
  // transform: translateX(-50%);
}
</style>
