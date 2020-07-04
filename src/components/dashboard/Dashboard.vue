<template>
    <div style="margin-top: 60px">
        <schart :canvasId="canvasId"
                :type="type"
                :width="width"
                :height="height"
                :data="data"
                :options="options">
        </schart>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    export default {
        name: "Analyse",
        data() {
            return {
                canvasId: 'myChart',
                type: 'pie',
                width: 600,
                height: 500,
                data: [
                    {name: '新冠', value: 1234},
                    {name: '肺结核', value: 2345},
                    {name: '非典', value: 2456},
                    {name: '鼠疫', value: 333},
                    ],
                options: {
                    title: '病人数量占比仪表盘',
                    bgColor: '#829dca',
                    titleColor: '#ffffff',
                    legendColor: '#ffffff'
                    }
                }
            },
        components:{
                Schart
            }
    };
</script>

<style>
</style>
