<template>
   <el-container style="min-height: 100%;">
      <sidebar></sidebar>
      <el-main>
          <router-view></router-view>
      </el-main>
  </el-container>
</template>

<script>
    import Sidebar from '@/components/management/Sidebar.vue';
    export default{
        components:{
            Sidebar
        }
    }
</script>

<style>
</style>
