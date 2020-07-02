<template>
    <div>
        CaseManagement
        <el-table
          :data="documents"
          style="width: 100%" stripe>
          <el-table-column prop="documentId" label="档案编号" sortable> </el-table-column>
          <el-table-column prop="deptId" label="部门编号" sortable></el-table-column>
          <el-table-column prop="userId" label="登记者" sortable></el-table-column>
          <el-table-column prop="patientId" label="患者" sortable></el-table-column>
          <el-table-column prop="diseaseName" label="流行病" sortable></el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
          <el-table-column prop="modifyTime" label="最后修改时间" sortable></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="getDocument(scope.$index)"> 查看 </el-button>
                <el-button type="danger" size="mini" @click="delDocument(scope.$index)"> 删除 </el-button>
            </template>
          </el-table-column>
        </el-table>
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
            user:{}
        }
    },
    methods:{
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
                      this.$router.refresh();
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
