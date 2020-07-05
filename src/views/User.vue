<template>
    <div>
        <div style="max-width: 1200px; margin: 0 auto;">
            <el-row class="text-left" style="margin-top: 1rem; margin-bottom: 1rem;">
                <el-col :span="2" class="color-info">用户ID</el-col>
                <el-col :span="4"> {{user.userId}}</el-col>
            </el-row>
            <el-row class="text-left" style="margin-top: 1rem; margin-bottom: 1rem;">
                <el-col :span="2" class="color-info">姓名</el-col>
                <el-col :span="4"> {{user.name}}</el-col>
            </el-row>
            <el-row class="text-left" style="margin-top: 1rem; margin-bottom: 1rem;">
                <el-col :span="2" class="color-info">性别</el-col>
                <el-col :span="4"> {{user.gender}}</el-col>
            </el-row>
            <el-row class="text-left" style="margin-top: 1rem; margin-bottom: 1rem;">
                <el-col :span="2" class="color-info">地区</el-col>
                <el-col :span="4">  {{user.originName}}</el-col>
             </el-row>
            <el-row class="text-left" style="margin-top: 1rem; margin-bottom: 1rem;">
                <el-col :span="2" class="color-info">部门</el-col>
                <el-col :span="4">  {{this.$root.$data.departments[user.deptId].showName}} </el-col>
            </el-row>
            <el-row class="text-left" style="margin-top: 1rem; margin-bottom: 1rem;">
                <el-col :span="2" class="color-info">权限</el-col>
                <el-col :span="4"> {{user.group}} </el-col>            
            </el-row>
            
        </div>


        
    </div>
</template>

<script>
    /*
    "userId": testx,
        "password": 123,
        "deptId": "2",
        "name": "测试账号",
        "gender": "m",
        "originName": 广东,
        "group":user
    */
    export default{
        data(){
            return {
                user:{},
            }
        },
        mounted() {
            this.checkLogin(user=>{
                this.user=user;
            })
        },
        methods:{
            openUserDialog(){
                this.tempUser=this.user;
                this.userDialog=true;
            }
        }
    }

</script>

<style>
    .text-left{
        text-align: left;
    }
    .color-info{
        color:#909399
    }
</style>
