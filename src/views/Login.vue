<template>
    <div id="login-form">
        <el-row type="flex" justify="center">
            <!-- justify 对齐方式 -->
            <el-col :span="24">
                <div class="grid-content"></div>
            </el-col>
        </el-row>

        <el-row type="flex" justify="center">
            <!-- justify 对齐方式 -->
            <el-col :span="24">
                <el-card shadow="always" >
                    <h1 style="text-align: center;">欢迎登陆</h1>
                    <el-divider></el-divider>
        <el-form v-if="!isReg" >
            <el-form-item label="用户名"
                          prop="userId">
                <el-input v-model="userId" placeholder="请输入用户名" type="text"></el-input>
            </el-form-item>
            <el-form-item label="密码"
                          prop="password">
                <el-input v-model="password" placeholder="请输入密码" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login"> 登录 </el-button>
                <el-button type="button" @click="reg()">  注册 </el-button>
            </el-form-item>
        </el-form>
        <el-form v-else>
            <el-form-item label="用户名"
                          prop="userId">
                <el-input v-model="userId" placeholder="请输入用户名" type="text"></el-input>
            </el-form-item>
            <el-form-item label="密码"
                          prop="password">
                <el-input v-model="password" placeholder="请输入密码" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="密码"
                          prop="password">
                <el-input v-model="repeat" placeholder="请再次输入密码" type="repeat" show-password></el-input>
            </el-form-item>
            <el-form-item label="部门" label-width="formLabelWidth">
                <el-select v-model="deptId" placeholder="请选择部门">
                    <el-option :label="item.deptId" :value="item.deptId" :key="item.deptId" v-for="item in $root.$data.departments"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="姓名"
                          prop="name">
                <el-input v-model="name" placeholder="请输入姓名" type="name" ></el-input>
            </el-form-item>
            <el-form-item label="性别"
                          prop="gender">
                <el-input v-model="gender" placeholder="m(male) or f(female)" type="gender" ></el-input>
            </el-form-item>
            <el-form-item label="地区" label-width="formLabelWidth"
                          prop="originName">
                <el-select  v-model="originName" placeholder="请选择地区" >
                    <el-option :label="origin" :value="origin" :key="origin" v-for="origin in $root.$data.origins"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addUser()"> 确定 </el-button>
                <el-button type="button" @click="cancel()">  取消 </el-button>
            </el-form-item>
        </el-form>

                </el-card>
            </el-col>
        </el-row>
        <div id="hint">
            {{hint}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                isReg: false,
                userId: '',
                password: '',
                repeat: '',
                deptId:'',
                name:"",
                gender:"",
                originName:"",
                group:"user",
                hint: ''
            }
        },
        methods: {
            login() {
                this.$ajax({
                    url: "/login",
                    method: "post",
                    params: {
                        userId: this.userId,
                        password: this.password
                    }
                })
                    .then(res => {
                        console.log(res);
                        let data = res.data;
                        if (data.success) {
                            this.$router.push('/home');
                        } else this.hint = '登录失败，请检测用户名和密码是否正确'
                    })
            },
            reg() {
                this.isReg = true
            },
            cancel() {
                this.isReg = false
            },
            addUser() {
                if (this.password === this.repeat) {
                    this.$ajax({
                        url: "/user",
                        method: "post",
                        params: {
                            userId: this.userId,
                            password: this.password,
                            deptId: this.deptId,
                            name: this.name,
                            gender: this.gender,
                            originName: this.originName,
                            group: this.group
                        }
                    }).then(res=>{
                        if (res.data.success){
                            this.$message({message:'注册成功',type:'success'});
                        } else this.$message.error('注册失败，请检查用户名是否被占用');
                    })
                    this.name = ''
                    this.password = ''
                    this.repeat = ''
                    this.deptId = ''
                    this.name =''
                    this.gender =''
                    this.originName =''
                    this.isReg = false
                    this.$router.push('/login');
                } else this.$message.warning("两次密码输入不一致");

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
    .grid-content {
        border-radius: 4px;
        min-height: 80px;
    }
</style>
