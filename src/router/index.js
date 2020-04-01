import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import AccessManager from '../views/manager/AccessManager.vue'
import MsgManager from '../views/manager/message/MsgManage.vue'
import AddCar from '../views/manager/cars/AddCar.vue'
import Carlist from '../views/manager/cars/Carlist.vue'
import CarDetail from '../views/manager/cars/CarDetail.vue'
import LinkmanList from '../views/manager/linkmans/LinkmansList.vue'
import AddBill from '../views/manager/bills/AddBill.vue'
import Billlist from '../views/manager/bills/BillList.vue'
import BillDetail from '../views/manager/bills/BillDetail.vue'
import Workbench from '../views/manager/tools/Workbench.vue'
import AddReview from '../views/manager/reviews/AddReview.vue'
import ReviewList from '../views/manager/reviews/ReviewList.vue'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  {
    path: '/home',
    name: 'Home',
    redirect: '/workbench',
    component: Home,
    children: [
      {
        path: '/accessmanage',
        component: AccessManager
      },
      {
        path: '/msgmanage',
        component: MsgManager
      },
      {
        path: '/addcar',
        component: AddCar
      },
      {
        path: '/carlist',
        component: Carlist
      },
      {
        path: '/cardetail',
        component: CarDetail
      },
      {
        path: '/linkmanslist',
        component: LinkmanList
      },
      {
        path: '/addbill',
        component: AddBill
      },
      {
        path: '/billlist',
        component: Billlist
      },
      {
        path: '/billdetail',
        component: BillDetail
      },
      {
        path: '/workbench',
        component: Workbench
      },
      {
        path: '/addreview',
        component: AddReview
      },
      {
        path: '/reviewlist',
        component: ReviewList
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
