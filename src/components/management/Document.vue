<template>
    <div>
        <div>
            <div>
            <el-button type="text" @click="openDocumentDialog" class="text-left" > 修改档案信息 </el-button>
            </div>
            <el-row :gutter="20"  class="text-left">
                <el-col :span="3" class="color-info">档案编号</el-col>
                <el-col :span="3"> {{document.documentId}}</el-col>
                <el-col :span="3" class="color-info">记录者</el-col>
                <el-col :span="3"> {{document.userId}}</el-col>
                <el-col :span="3" class="color-info">患者</el-col>
                <el-col :span="3">  {{document.patientId}}</el-col>
                <el-col :span="3" class="color-info">疾病</el-col>
                <el-col :span="3">  {{document.diseaseName}}</el-col>
                
                <el-col :span="3" class="color-info">创建时间</el-col>
                <el-col :span="3">  {{this.utils.formatTimestamp(document.createTime)}}</el-col>
                <el-col :span="3" class="color-info">最后修改</el-col>
                <el-col :span="3">  {{this.utils.formatTimestamp(document.modifyTime)}}</el-col>      
                <el-col :span="9"></el-col>
                <el-col :span="3"></el-col>
            </el-row>
        </div>
        <el-button type="primary" size="mini"> 新增记录 </el-button>
        <el-table
          :data="records"
          style="width: 100%" stripe>
          <el-table-column prop="recordId" label="记录编号" > </el-table-column>
          <el-table-column prop="createTime" label="时间" ></el-table-column>
          <el-table-column prop="status" label="状态" ></el-table-column>
          <el-table-column prop="desc" label="描述" ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="getDocument(scope.$index)"> 修改 </el-button>
                <el-button type="danger" size="mini" @click="delRecord(scope.$index)"> 删除 </el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <el-dialog title="修改档案信息" :visible.sync="documentDialog">
          <el-form>
            <el-form-item label="患者" label-width="formLabelWidth">
              <el-input v-model="tempDocument.patientId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="疾病" label-width="formLabelWidth">
              <el-select v-model="tempDocument.diseaseName" placeholder="请选择疾病">
                <el-option :label="disease" :value="disease" :key="disease" v-for="disease in $root.$data.diseases"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门" label-width="formLabelWidth">
              <el-select v-model="tempDocument.deptId" placeholder="请选择部门">
                <el-option :label="item.name" :value="item.deptId" :key="item.deptId" v-for="item in $root.$data.departments"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="documentDialog = false">取 消</el-button>
              <el-button type="primary" @click="documentDialog = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    /*
        "recordId": 1,
        "documentId": 2,
        "status": "健康",
        "desc": "111",
        "createTime": 1593735124000
    */
    export default{
        data(){
            return {
                document:{},
                tempDocument:{},
                documentId:'',
                records:'',
                documentDialog:false
            }
        },
        mounted() {
            this.documentId=this.$route.params.id;
            this.$ajax({
                url:`/document/${this.documentId}`,
                method:'get'
            }).then(res=>{
                console.log(res.data);
                if (res.data.success) this.document=res.data.document;
                console.log(this.document);
            })
            this.$ajax({
                url:'/document/'+this.documentId+'/record',
                method:'get'
            }).then((res)=>{
                this.records=res.data.records;
                for (let i=0;i<this.records.length;++i){
                    this.records[i].createTime=new Date(this.records[i].createTime).toLocaleDateString()
                }
            })
        },
        methods:{
            delRecord(id){
                this.$confirm("您确定要删除该记录吗？")
                .then(()=>{
                    this.$ajax({
                        url:'/record/'+this.records[id].recordId,
                        method:'delete',
                    }).then((res)=>{
                        if (res.data.success){
                            this.$message({message:"删除成功",type:"success"});
                            this.$router.refresh();
                        } else this.$message.error("删除失败");
                      }
                    )
                })
            },
            openDocumentDialog(){
                this.tempDocument=this.document;
                this.documentDialog=true;
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
