<template>
    <div>
        <div>

            <el-row class="text-left" style="margin-top: 1rem; margin-bottom: 1rem;">
                <el-col :span="2" class="color-info">档案编号</el-col>
                <el-col :span="4"> {{document.documentId}}</el-col>
                <el-col :span="2" class="color-info">记录者</el-col>
                <el-col :span="4"> {{document.userId}}</el-col>
                <el-col :span="2" class="color-info">患者</el-col>
                <el-col :span="4">  {{document.patientId}}</el-col>
                <el-col :span="2" class="color-info">疾病</el-col>
                <el-col :span="4">  {{document.diseaseName}}</el-col>
            </el-row>
            <el-row class="text-left" style="margin-top: 1rem; margin-bottom: 1rem;">
                <el-col :span="2" class="color-info">部门</el-col>
                <el-col :span="4"> {{this.$root.$data.departments[document.deptId].showName}}</el-col>
                <el-col :span="2" class="color-info">创建时间</el-col>
                <el-col :span="4">  {{this.utils.formatTimestamp(document.createTime)}}</el-col>
                <el-col :span="2" class="color-info">最后修改</el-col>
                <el-col :span="4">  {{this.utils.formatTimestamp(document.modifyTime)}}</el-col>      
                <el-col :span="3"><el-button type="text" @click="openDocumentDialog" class="text-left" style="padding:0;"> 修改档案信息 </el-button></el-col>
            </el-row>
        </div>
        <el-button type="primary" size="mini" style="float:right; margin-right:2rem;" @click="openRecordDialog"> 新增记录 </el-button>
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
            <el-form-item label="部门" label-width="formLabelWidth" >
              <el-cascader placeholder="输入搜索内容"
                  :options="this.$root.$data.departmentOptions"
                  :props="{ checkStrictly: true }"
                  v-model="tempDocument.deptId"
                  clearable filterable></el-cascader>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="documentDialog = false">取 消</el-button>
              <el-button type="primary" @click="changeDocument()">确 定</el-button>
            </div>
        </el-dialog>
        
        <el-dialog title="新增记录" :visible.sync="recordDialog">
          <el-form>
            <el-form-item label="状态" label-width="formLabelWidth">
                <el-select v-model="newRecord.status" placeholder="请选择">
                    <el-option
                      v-for="item in this.$root.$data.status"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
            </el-form-item>
            <el-form-item label="详细描述" label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="newRecord.desc">
                </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="recordDialog = false">取 消</el-button>
              <el-button type="primary" @click="addRecord()">确 定</el-button>
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
                records:[],
                documentDialog:false,
                recordDialog:false,
                newRecord:{status:'',desc:''}
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
                console.log(this.records);
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
                            location.reload();
                        } else this.$message.error("删除失败");
                      }
                    )
                })
            },
            addRecord(){
                this.recordDialog=false;
                this.$ajax({
                    url:'/record',
                    method:'post',
                    params:{
                        status:this.newRecord.status,
                        desc:this.newRecord.desc,
                        documentId:this.documentId
                    }
                }).then(res=>{
                    if (res.data.success){
                        this.$message({
                            message:"创建记录成功",
                            type:"success"
                        });
                        location.reload();
                    }else this.$message.error("创建记录失败");
                })
            },
            openDocumentDialog(){
                this.tempDocument = JSON.parse(JSON.stringify(this.document));
                this.documentDialog=true;
            },
            openRecordDialog(){
                this.recordDialog=true;
                this.newRecord={status:'',desc:''};
            },
            changeDocument(){
                this.documentDialog = false;
                if (this.tempDocument.deptId instanceof Array){
                    this.tempDocument.deptId=this.tempDocument.deptId[this.tempDocument.deptId.length-1];
                }
                //update
                this.document=JSON.parse(JSON.stringify(this.tempDocument));

                console.log(this.tempDocument);
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
    .margin-10{
        margin-top:20rem;
    }
</style>
