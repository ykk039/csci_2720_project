 

import Vue from 'vue'
import Router from 'vue-router'

import Favorite from '../components/Favorite'
import FileUpload from '../components/FileUpload'
import Info from '../components/Info'
import Home from '../components/Home'
import ProgramEdit from '../components/ProgramEdit'
import ProgramDetail from '../components/ProgramDetail'
import UserEdit from '../components/UserEdit'
import About from '../components/About'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [

    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/info',
      name: 'Info',
      component: Info,
    },
    {
      path: '/programEdit',
      name: 'ProgramEdit',
      component: ProgramEdit,
    },
    {
      path: '/userEdit',
      name: 'UserEdit',
      component: UserEdit,
    },
    {
      path: '/location/:pid',
      props: true,
      name: 'ProgramDetail',
      component: ProgramDetail,
    },
    {
      path: '/fileUpload',
      name: 'FileUpload',
      component: FileUpload,
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: Favorite,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },

  
  ],

})
