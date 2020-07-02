<template>
    <div id="login-form">
        <el-form>
            <el-form-item>
                <el-input v-model="userId" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login"> 登录 </el-button>
                <el-button>  注册 </el-button>
            </el-form-item>
        </el-form>
        <div id="hint">
            {{hint}}
        </div>
    </div>
</template>

<script>
    export default{
        name:'login',
        data(){
            return{
                userId:'',
                password:'',
                hint:''
            }
        },
        methods:{
            login(){
                this.$ajax({
                    url:"/login",
                    method:"post",
                    params:{
                        userId:this.userId,
                        password:this.password
                    }
                })
                .then(res=>{
                    console.log(res);
                    let data=res.data;
                    if (data.success){
                        this.$router.push('/home');
                    }
                    else this.hint='登录失败，请检测用户名和密码是否正确'
                })
            }
        }
    }
</script>

<style>
    #hint{
        font-size: 12px;
        color:#F56C6C;
    }
    #login-form{
        max-width: 30%;
        margin: 0 auto;
    }
</style>
