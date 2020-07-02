import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import axios from 'axios'
import utils from './utils/utils.js'

//设置axiosInstace实现访问后端
const axiosInstance = axios.create({
    baseURL:'http://localhost:8080',
    headers: {'Content-Type': 'application/json;charset=utf-8'},// 设置传输内容的类型和编码
    withCredentials: true,// 指定某个请求应该发送凭据。允许客户端携带跨域cookie，也需要此配置
});
//axios.defaults.baseURL='http://localhost:8080'
//axios.defaults.headers.post['Content-Type']='application/json'

//注册全局方法
Vue.prototype.utils=utils;
Vue.prototype.$ajax=axiosInstance
Vue.prototype.checkLogin=function (sCallback,fCallback){
    axiosInstance({
        url:'/validate',
        method:'post'
    }).then((res)=>{
        let data=res.data;
        if (data.success) sCallback&&sCallback(data.user);
        else fCallback&&fCallback(data);
    })
}

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App),
  el:'#app',
  data:{
      origins:[],
      diseases:[],
      departments:{}
  },
  mounted(){
      this.$ajax({
          url:'/origin',
          method:'get'
      }).then(res=>{
          this.origins=res.data;
          console.log(this.origins);
      });
      this.$ajax({
          url:'/disease',
          method:'get'
      }).then(res=>{
          this.diseases=res.data;
          console.log(this.diseases);
      })
      this.$ajax({
          url:'department',
          method:'get'
      }).then(res=>{
          console.log(res.data);
          if (res.data.success){
              let departments=res.data.departments;
              for (let i=0;i<departments.length;++i){
                  this.departments[departments[i].deptId]=departments[i];
              }
              console.log(this.departments);
          }
      })
      
  }
})
