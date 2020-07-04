<template>
    <div>
        <div>
            <div>
            <el-button type="text" @click="openUserDialog" class="text-left" > 修改用户信息 </el-button>
            </div>
            <el-row :gutter="20"  class="text-left">
                <el-col :span="3" class="color-info">用户编号</el-col>
                <el-col :span="3"> {{user.userId}}</el-col>
                <el-col :span="3" class="color-info">地区</el-col>
                <el-col :span="3">  {{user.originName}}</el-col>
                <el-col :span="3" class="color-info">部门编号</el-col>
                <el-col :span="3">  {{user.deptId}}</el-col>
                <el-col :span="3" class="color-info">权限</el-col>
                <el-col :span="3">  {{user.group}}</el-col>
                <el-col :span="3" class="color-info">姓名</el-col>
                <el-col :span="3">  {{user.name}}</el-col>
                <el-col :span="3" class="color-info">性别</el-col>
                <el-col :span="3">  {{user.gender}}</el-col>
                <el-col :span="9"></el-col>
                <el-col :span="3"></el-col>
            </el-row>
        </div>
        <el-dialog title="修改用户信息" :visible.sync="userDialog">
            <el-form>
                <el-form-item label="用户编号" label-width="formLabelWidth">
                    <el-input v-model="user.userId" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item label="地区" label-width="formLabelWidth">
                    <el-select v-model="user.origin" placeholder="请选择地区">
                        <el-option :label="origin" :value="origin" :key="origin" v-for="origin in $root.$data.origins"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门" label-width="formLabelWidth">
                    <el-select v-model="tempUser.deptId" placeholder="请选择部门编号">
                        <el-option :label="item.deptId" :value="item.deptId" :key="item.deptId" v-for="item in $root.$data.departments"></el-option>
                    </el-select>
                </el-form-item >
                <el-form-item v-if="user.group==='user'" label="权限" label-width="formLabelWidth">
                    <el-select v-model="text" placeholder="请选择用户类型">
                        <el-option :label="item" :value="item" :key="item" v-for="item in Group1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-else-if="user.group==='manageuser'" label="权限" label-width="formLabelWidth">
                    <el-select v-model="text" placeholder="请选择用户类型">
                        <el-option :label="item" :value="item" :key="item" v-for="item in Group2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-else label="权限" label-width="formLabelWidth">
                    <el-select v-model="text" placeholder="请选择用户类型">
                        <el-option :label="item" :value="item" :key="item" v-for="item in Group1"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="userDialog = false">取 消</el-button>
                <el-button type="primary" @click="userDialog = false">确 定</el-button>
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
        "originName": 广东,
        "group":user
    */
    export default{
        data(){
            return {
                user:{},
                tempUser:{},
                Group1:Array('user'),
                Group2:Array('superuser','manageuser'),
                Group3:Array('superuser','manageuser','user'),
                records:'',
                userDialog:false
            }
        },
        mounted() {
            this.userId=this.$route.params.id;
            this.$ajax({
                url:`/user/${this.userId}`,
                method:'get'
            }).then(res=>{
                console.log(res.data);
                if (res.data.success) this.user=res.data.user;
                console.log(this.user);
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
