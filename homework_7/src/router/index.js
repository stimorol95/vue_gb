import Vue from 'vue'
import Router from 'vue-router'

import PersonalCosts from '@/views/PersonalCosts'
import Calculator from '@/views/Calc'
import About from '@/views/About'
// import NotFound from '@/views/NotFound'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/costs',
      name: 'costs',
      component: PersonalCosts,
      children: [
        {
          path: '/costs/:page',
          component: PersonalCosts
        },
        {
          path: '/costs/:action/:what/:category',
          name: 'addLink',
          component: PersonalCosts,
          props: true
        }
      ]
    },
    {
      path: '/calc',
      name: 'calc',
      component: Calculator
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
    // {
    //   path: '/*',
    //   name: '404',
    //   component: NotFound
    // }
  ]
})

// const titles = {
//   costs: 'Personal Costs',
//   calc: 'Calculator',
//   about: 'About'
// }
//
// router.afterEach((to) => {
//   document.title = titles[to.name]
// })

export default router
