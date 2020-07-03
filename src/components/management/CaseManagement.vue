<template>
    <div>
        <el-button type="primary" size="mini" @click="openDocumentDialog"> 创建案例 </el-button>
        <el-table
          :data="documents"
          style="width: 100%" stripe>
          <el-table-column prop="documentId" label="档案编号" sortable> </el-table-column>
          <el-table-column prop="deptId" label="部门编号" sortable> </el-table-column>
          <el-table-column prop="userId" label="登记者" sortable></el-table-column>
          <el-table-column prop="patientId" label="患者" sortable></el-table-column>
          <el-table-column prop="diseaseName" label="流行病" sortable></el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
          <el-table-column prop="modifyTime" label="最后修改时间" sortable></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="success" size="mini" @click="getDocument(scope.$index)"> 查看 </el-button>
                <el-button type="danger" size="mini" @click="delDocument(scope.$index)"> 删除 </el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <el-dialog title="新建案例" :visible.sync="documentDialog">
          <el-form>
            <el-form-item label="患者" label-width="formLabelWidth">
              <el-input v-model="newDocument.patientId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="疾病" label-width="formLabelWidth">
              <el-select v-model="newDocument.diseaseName" placeholder="请选择疾病">
                <el-option :label="disease" :value="disease" :key="disease" v-for="disease in $root.$data.diseases"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="documentDialog = false">取 消</el-button>
              <el-button type="primary" @click="addDocument()">确 定</el-button>
            </div>
        </el-dialog>
        
        
    </div>
</template>

<script>
    /*
        "documentId": 3,
        "deptId": 1,
        "userId": "wizeaz",
        "patientId": "wizeaz",
        "diseaseName": "新冠肺炎",
        "createTime": 1587937183000,
        "modifyTime": 1587937183000
    */
export default{
    data(){
        return {
            documents:[],
            user:{},
            documentDialog:false,
            newDocument:{patientId:'',disease:'',deptId:'',userId:''}
        }
    },
    methods:{
      openDocumentDialog(){
          this.documentDialog=true;
          this.newDocument={patientId:'',disease:'',deptId:'',userId:''};
      },
      addDocument(){
          this.newDocument.deptId=this.user.deptId;
          this.newDocument.userId=this.user.userId;
          console.log(this.newDocument);
          this.$ajax({
              url:'/document',
              method:'post',
              params:this.newDocument
          }).then(res=>{
              console.log(res);
              if (res.data.success){
                  this.documentDialog=false;
                  this.$message({message:'添加成功',type:'success'});
                  location.reload();
              } else {
                  this.$message.error('添加失败，请检查输入信息');
              }
          })
      },
      getDocument(id){
          let docId=this.documents[id].documentId;
          console.log('/document/'+docId+'/record');
          this.$router.push({
            path:`/home/management/document/${docId}`
          });
          
      },
      delDocument(id){
          this.$confirm("您确定要删除该档案吗？")
          .then(()=>{
              this.$ajax({
                  url:'/document/'+this.documents[id].documentId,
                  method:'delete',
              }).then((res)=>{
                  if (res.data.success){
                      this.$message({message:"删除成功",type:"success"});
                      location.reload();
                  } else this.$message.error("删除失败");
                }
              )
          })
      }
    },
    mounted(){
        this.checkLogin((user)=>{
            this.user=user;
            console.log('/department/'+user.deptId+'/document');
            this.$ajax({
                url:'/department/'+user.deptId+'/document',
                method:'get'
            }).then((res)=>{
                this.documents=res.data.documents
                for (let i=0;i<this.documents.length;++i){
                    this.documents[i].createTime=new Date(this.documents[i].createTime).toLocaleDateString();
                    this.documents[i].modifyTime=new Date(this.documents[i].modifyTime).toLocaleDateString();
                }
            })
        })
    
    }
}
</script>

<style>
</style>
