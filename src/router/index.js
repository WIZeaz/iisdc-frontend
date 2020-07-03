import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../components/dashboard/Dashboard.vue'
import Analyse from '../components/analyse/Analyse.vue'
import Management from '../components/management/Management.vue'
import CaseManagement from '../components/management/CaseManagement.vue'
import UserManagement from '../components/management/UserManagement.vue'
import Login from '../views/Login.vue'
import Document from '../components/management/Document.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/home',
    name:'home',
    component: Home,
    children:[
        {
          path: 'dashboard',
          name:'dashboard',
          component: Dashboard
        },
        {
          path:'management',
          name:'management',
          component:Management,
          children:[
              {
                  path:'case',
                  component:CaseManagement
              },
              {
                  path:'user',
                  component:UserManagement
              },
              {
                  path:'document/:id',
                  component:Document
              }
          ]
        },  
        {
          path:'analyse',
          name:'analyse',
          component:Analyse
        },
        {
          path:'user',
          name:'user',
          component:()=>import('../views/User.vue')
        },
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  mode:"history"
})

export default router
