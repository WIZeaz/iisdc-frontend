<template>
    <el-aside width="200px" style="min-height: 100%;">
        <el-menu router
              default-active="2"
              class="el-menu-vertical-demo"
              style="min-height: 100%; overflow: visible;"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="/home/management/case">
                <i class="el-icon-menu"></i>
                <span slot="title">案例管理</span>
              </el-menu-item>
              <el-menu-item index="/home/management/user">
                <i class="el-icon-menu"></i>
                <span slot="title">人员管理</span>
              </el-menu-item>
              
        </el-menu>
    </el-aside>
</template>

<script>
</script>

<style>
</style>
