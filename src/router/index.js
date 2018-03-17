import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Suggestion from '@/components/Suggestion'
import LiftLogger from '@/components/LiftLogger'
import ViewLiftLog from '@/components/ViewLiftLog'
import ResetLogs from '@/components/ResetLogs'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/suggestion',
      name: 'Suggestion',
      component: Suggestion
    },
    {
      path: '/liftlogger',
      name: 'LiftLogger',
      component: LiftLogger
    },
    {
      path: '/liftlog',
      name: 'ViewLiftLog',
      component: ViewLiftLog
    },
    {
      path: '/reset',
      name: 'ResetLogs',
      component: ResetLogs
    }    
  ]
})
