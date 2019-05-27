import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Main from './views/Main.vue'
import List from './views/List.vue'
import Content from './views/Content.vue'

Vue.use(Router)

export default new Router({
  mode:"history",//去除默认的哈希#
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children:[
        {
          path: '',
          component: Main
        },
        {
          path: '/list/:id',
          name: 'list',
          component: List
        },{
          path: '/content/:name',
          name: 'content',
          component: Content
        }
      ]
    }
  ]
})
// export default new Router({
//   mode: "history",//去除默认的哈希#
//   routes: [
//     {
//       path: '/',
//       name: 'index',
//       component: Index
//     },
//     {
//       path: 'main',
//       component: Main
//     },
//     {
//       path: '/list/:id',
//       name: 'list',
//       component: List
//     }, {
//       path: '/content',
//       name: 'content',
//       component: Content
//     }
//   ]
// })
