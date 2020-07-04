<template>
    <div>
        <el-table
                :data="users"
                style="width: 100%" stripe>
            <el-table-column prop="userId" label="用户编号" sortable></el-table-column>
            <el-table-column prop="deptId" label="部门" sortable></el-table-column>
            <el-table-column prop="name" label="姓名" sortable></el-table-column>
            <el-table-column prop="gender" label="性别" sortable></el-table-column>
            <el-table-column prop="originName" label="地区名" sortable></el-table-column>
            <el-table-column prop="group" label="权限" sortable></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="openGroupDialog(scope.$index)">权限管理</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <el-dialog title="修改用户资料" :visible.sync="groupDialog">
          <el-form>
            <el-form-item label="权限等级" label-width="formLabelWidth">
              <el-select v-model="newGroup">
                <el-option :label="item" :value="item" :key="item" v-for="item in $root.$data.groups"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="groupDialog = false">取 消</el-button>
              <el-button type="primary" @click="changeGroup()">确 定</el-button>
            </div>
        </el-dialog>
        
        
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
                user:{},
                users:[],
                newGroup:'user',
                groupDialog:false,
                groupDialogUser:{}
            }
        },
        methods:{
            openGroupDialog(id){
                this.groupDialog=true;
                this.groupDialogUser=this.users[id];
            },
            changeGroup(){
                console.log(this.groupDialogUser);
                this.$ajax({
                    url:`/user/${this.groupDialogUser.userId}`,
                    method:'put',
                    params:{
                        group:this.newGroup
                    }
                }).then(res=>{
                    if (res.data.success){
                        this.groupDialog=false;
                        this.newGroup='user';
                        location.reload();
                    } else {
                        this.$message.error("修改权限失败，请检查您的权限等级是否足够");
                    }
                })
            }
        },
        created() {
            this.checkLogin(user=>{
                this.user=user;
                console.log(this.user);
                this.$ajax({
                    url:'/user',
                    method:'get',
                    params:{
                        deptId:this.user.deptId
                    }
                }).then(res=>{
                    console.log(res);
                    if (res.data.success){
                        this.users=res.data.users
                    }
                })
            })
        }
    }
</script>

<style>
</style>

