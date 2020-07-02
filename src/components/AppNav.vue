<template>
   <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router >
      <el-menu-item>大学疾病直报系统后台</el-menu-item>
      <el-menu-item index="/home/dashboard">仪表盘</el-menu-item>
      <el-menu-item index="/home/management">部门管理</el-menu-item>
      <el-menu-item index="/home/analyse">数据统计</el-menu-item>
      <el-menu-item class="rightmost" @click="logout">退出登录</el-menu-item>
      <el-menu-item index="/home/user" class="rightmost">{{user.name}}</el-menu-item>


    </el-menu>
</div>
</template>

<script>
    export default {
      name:'AppNav',
      props:{
          user:Object,
          default:()=>{
              return {name:"未登录"}
          }
      },
      data() {
        return {
          activeIndex: 'dashboard',
        };
      },
      methods: {
        logout(){
            this.$ajax({
                url:'/logout',
                method:'post'
            }).then(()=>{
                this.$router.push('/login');
            })
        }
      }
    }
</script>

<style>
    .rightmost{
        float:right !important;
    }
</style>
