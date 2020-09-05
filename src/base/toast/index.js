import Vue from 'vue'
import ToastComponent from './toast.vue'

var Toast = {};
var timer = null
// 注册Toast
Toast.install = function (Vue) {
    // 生成一个Vue的子类
    // 同时这个子类也就是组件
    const ToastConstructor = Vue.extend(ToastComponent)
    // 生成一个该子类的实例
    const instance = new ToastConstructor();

    // 将这个实例挂载在我创建的div上
    // 并将此div加入全局挂载点内部
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)
    // 通过Vue的原型注册一个方法
    // 让所有实例共享这个方法 
    Vue.prototype.$toast = (msg, duration = 3000) => {
        instance.toast_text = msg;
        instance.toast_show = true;
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            instance.toast_show = false;
        }, duration);
    }
}

export default Toast