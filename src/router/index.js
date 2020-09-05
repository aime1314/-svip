import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)



export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // linkActiveClass:'',
  // linkExactActiveClass:'',
  // scrollBehavior (to, from, savedPosition) {
  //   if(savedPosition){
  //     return savedPosition
  //   }else{
  //     return {x:0,y:0}
  //   }
  // },
  // parseQuery(query){

  // },
  // stringifyQuery(obj){

  // },
  fallback:true,
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      meta:{
        title: '超级会员',
        // requireAuth: true, 
      },
      component: () => import('@/views/Home/home'),
    },
    {
      path: '/about',
      name: 'about',
      meta:{
        title: '会员介绍',
        // requireAuth: true, 
      },
      component: () => import('@/views/Aboutmember/aboutmember'),
    },
    {
      path: '/shopping/:type',
      name: 'shopping',
      meta:{
        title: '支付',
        requireAuth: true, 
      },
      component: () => import('@/views/Buy/memberbuy'),
    },
    {
      path: '/obtain/:projectId/:packageId',
      name: 'obtain',
      meta:{
        title: '会员权益',
        requireAuth: true, 
      },
      component: () => import('@/views/Myobtain/myobtain'),
    },
    {
      path: '/product/:id',
      name: 'product',
      meta:{
        title: '使用权益',
        requireAuth: true, 
      },
      component: () => import('@/views/Product/product'),
    },
    // {
    //   path: '/coupon',
    //   name: 'coupon',
    //   meta:{
    //     title: '优惠券',
    //     requireAuth: true, 
    //   },
    //   component: () => import('@/views/Coupon/coupon'),
    // },
    {
      path: '/myorder',
      name: 'myorder',
      meta:{
        title: '我的订单',
        requireAuth: true, 
      },
      component: () => import('@/views/Myorder/myorder'),
    },
    {
      path: '/myordershow',
      name: 'myordershow',
      meta:{
        title: '订单详情',
        requireAuth: true, 
      },
      component: () => import('@/views/Myordershow/myordershow'),
    },
    {
      path: '/mycoupon',
      name: 'mycoupon',
      meta:{
        title: '已领优惠券',
        requireAuth: true, 
      },
      component: () => import('@/views/Mycoupon/mycoupon'),
    },
    {
      path: '/myinterests',
      name: 'myinterests',
      meta:{
        title: '我的权益',
        requireAuth: true, 
      },
      component: () => import('@/views/Myinterests/myinterests'),
    },
  ]
})


