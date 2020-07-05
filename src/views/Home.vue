<template>
    <div class="#home">
        <el-container>
            <el-header class="no-padding">
                <app-nav :user="user"></app-nav>
            </el-header>
            <router-view></router-view>
        </el-container>
    </div>
</template>

<script>
// @ is an alias to /src
    import AppNav from '@/components/AppNav.vue';
    export default {
      data(){
          return{
            user:{},
          }
      },
      name: 'Home',
      components: {
          AppNav
      },
      mounted() {
          this.checkLogin((user)=>{
              this.user=user
          })
      }
    }
</script>

<style>
#home{
    height: 100%;
}
.no-padding{
    padding-left: 0 !important;
}
</style>
