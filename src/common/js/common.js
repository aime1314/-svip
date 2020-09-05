import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '@/router'
import {store} from '@/store/store'


Vue.use(Vuex,VueCookies)
Vue.prototype.$ajax = axios

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;


function getChannge(name){
    return decodeURIComponent(
        (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

function personMsg(url){
    Vue.axios({
        method: 'post',
        url: '/yangjian/mem/heartBeat',
        // headers: { 'X-REQUESTED-SO-TOKEN': $cookies.get(localStorage.getItem('CHANNEL') + '_loginToken')}
      })
        .then(res => {
            if(res.data.code == "100"){
                if(res.data.result.svipStatus == '1'){//已是会员
                    localStorage.setItem("usermsg",res.data.result.acid + ' ' + res.data.result.svipLevel + ' ' + res.data.result.svipStatus + ' ' + res.data.result.svipExpirationDate + ' ' + res.data.result.mobile + ' ' + res.data.result.svipCard + ' ' + res.data.result.mbName)
                    if(!localStorage.getItem('usermsg')){
                        window.reload()
                    }else{
                        if(url){
                            window.location.href = url
                       }
                    }
                   
                   
                   
                }
            }  
        })
        .catch(error => {
          console.log(error)
        })
}

function headershowWx(){
    let ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        // 微信内
        return true
    }else{
        // 2.2微信外
        document.getElementById('app').style.paddingTop='.88rem'
        return false
    }
}   
export { //输出
    getChannge,
    personMsg,
    headershowWx
}      