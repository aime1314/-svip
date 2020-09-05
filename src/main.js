// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import vuex from 'vuex'
import fastclick from 'fastclick'

import VueCookies from 'vue-cookies'

Vue.use(VueAxios,axios,vuex,VueCookies)

import './common/css/reset.css'
import './common/js/rem.js'
import{getChannge} from './common/js/common.js'

Vue.config.productionTip = false

Vue.prototype.$qs = qs
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['X-REQUESTED-SO-TOKEN'] = $cookies.get(localStorage.getItem('CHANNEL') + '_loginToken')
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.API_ROOT

import Toast from '@/base/toast/index.js'
Vue.use(Toast)

router.beforeEach((to, from, next) => {//每个路由执行守卫
  if(getChannge('channel')){
    localStorage.setItem('CHANNEL',getChannge('channel').toUpperCase())
  }
  window.scrollTo(0,0)
  document.title = to.meta.title
  if (to.meta.requireAuth) {
    var token =  $cookies.get(localStorage.getItem('CHANNEL') + '_loginToken')
    if (token) {  // store.getters.token 通过vuex state获取当前的token是否存在  localStorage.getItem(localStorage.getItem('channel') +'_loginToken')
      next();
    }else{
      window.location.href = process.env.PASSPORT_ROOT+"/login?channel="+ localStorage.getItem('CHANNEL') + "&backurl="+ location.host + to.fullPath
    }
  }else{
    next();
  }
})

// http request 拦截器  统一处理axios请求和响应
axios.interceptors.request.use(
  config => {
      // 对响应数据做点什么
      return config;
  },
  err => {
      return Promise.reject(err);
  });

// http response inteceptor，当后端接口让用户重新登录
axios.interceptors.response.use(
    response => {
      if(response.data.msg=='请重新登录!'){
        if(!getChannge('channel')){
          window.location.href = process.env.PASSPORT_ROOT+"/login?channel="+ localStorage.getItem('CHANNEL') + "&backurl=" + location.href
        }
      }else{
        return response;
      }
      return response;
    },
    error => {
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });

/* eslint-disable no-new */
fastclick.attach(document.body)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
