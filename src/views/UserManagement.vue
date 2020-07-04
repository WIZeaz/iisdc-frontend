<template>
    <div>
        <el-table
                :data="user"
                style="width: 100%" stripe>
            <el-table-column prop="userId" label="用户编号" sortable></el-table-column>
            <el-table-column prop="password" label="部门密码" sortable></el-table-column>
            <el-table-column prop="deptId" label="密码" sortable></el-table-column>
            <el-table-column prop="name" label="姓名" sortable></el-table-column>
            <el-table-column prop="gender" label="性别" sortable></el-table-column>
            <el-table-column prop="originName" label="地区名" sortable></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="getUser(scope.$index)">查看或修改</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    /*
        "userId": testx,
        "password": 123,
        "deptId": "2",
        "name": "测试账号",
        "gender": "m",
        "originName": 广东
    */
    export default{
        data(){
            return {
                user:[]
            }
        },
        methods:{
            getUser(id){
                let userId =this.user[id].userId;
                console.log('/user/'+userId);
                this.$ajax({
                    url:`http:wizeaz.top:8080/user/${this.userId}`,
                    method: "get",
                    params: {
                        userId: this.userId
                    }
                }).then(function(response){
                    this.user=response
                })
                this.$router.push({
                    path:`/user/${userId}`
                });

            }
        },
        created() {
            this.getUser();
        }
    }
</script>

<style>
</style>

