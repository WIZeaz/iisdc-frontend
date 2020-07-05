<template>
    <el-container>
        
        <el-main>
            <div id="myChart" class="chart" :style="{width: '100%', height: '500px'}"></div>
        </el-main>
    </el-container>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: 'xwPassengerFlow',
        data() {
            return {
                selected:[],
                records:[],
                documents:[],
                legend:[],
                xAxis: [], // x轴数据，可根据需求
            }
        },
        mounted() {
            this.initDate();
            this.loadLine(this.$root.$data.diseases,"diseaseName");
        },
        methods: {
            formatTime(date){
                let year=date.getYear();
                let month=date.getMonth();
                let day=date.getDay();
                return `${year}/${month}/${day}`;
            },
            initDate(){
                let date=new Date();
                this.xAxis=[];
                for (let i=7;i>=1;--i){
                    this.xAxis.push(new Date(date-i*24*60*60*1000).toLocaleDateString());
                }
            },
            zeros(n){
                let arr=[]
                for (let i=0;i<n;++i) arr.push(0);
                return arr;
            },
            getChartData(documents,legend,legendName){
                console.log(documents);
                let series=[]
                let legendDict={}
                let xDict={}
                let index=0;
                for (let key of legend){
                    legendDict[key]=index++;
                    series.push({
                        name:key,
                        type:'line',
                        stack:'总量',
                        data: this.zeros(this.xAxis.length)
                    })
                }
                console.log(series);
                console.log(legendDict);
                console.log(xDict);
                index=0;
                for (let key of this.xAxis){
                    xDict[key]=index++;
                }
                for (let document of documents){
                    console.log(document);
                    let id=legendDict[document[legendName]];
                    let dPos=xDict[new Date(document.modifyTime).toLocaleDateString()];
                    console.log(`id: ${id} dPos: ${dPos}`);
                    series[id].data[dPos]+=1;
                }
                console.log(series);
                return series
                
            },
            loadLine(legend,legendName){
                this.legend=this.$root.$data.diseases
                this.$ajax({
                    url:'/record',
                    method:'get',
                    params:{
                        days:'7'
                    }
                }).then(res=>{
                   if (res.data.success){
                       this.records=res.data.records;
                       console.log(this.records);
                   } 
                });
                this.$ajax({
                    url:'/document',
                    method:'get',
                    params:{
                        days:'7'
                    }
                }).then(res=>{
                   if (res.data.success){
                       this.documents=res.data.documents;
                       let series=this.getChartData(this.documents,legend,legendName);
                       let option = {
                           
                           title: {
                               text: '最近7天各类病人数量折线变化图'
                           },
                           tooltip: {
                               trigger: 'axis'
                           },
                           legend: {
                               data: this.$root.$data.diseases
                           },
                           grid: {
                               left: '3%',
                               right: '4%',
                               bottom: '3%',
                               containLabel: true
                           },
                           xAxis: {
                               type: 'category',
                               boundaryGap: false,
                               data: this.xAxis // x轴数据
                           },
                           yAxis: {
                               type: 'value'
                           },
                           series: series
                       }
                       this.myChartOne = echarts.init(document.getElementById('myChart'))
                       this.myChartOne.setOption(option)
                   }
                   
                });
                
            },
        },
        watch:{
            
        }
    }
</script>
