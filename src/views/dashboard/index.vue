<template>

  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <div style="margin-bottom:10px">{{ avbType }}利用率趋势(%)</div>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="card-wrapper">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>巡检概况</span>
            </div>
            <div class="text item">
              总巡检：{{ totalNum }}台
            </div>
            <div class="text item">
              巡检成功：{{ successNum }}台
            </div>
            <div class="text item">
              指标异常：{{ abnormalNum }}台
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="card-wrapper">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>高负荷服务器（台）</span>
            </div>
            <div class="big-number" style="color:#CD5C5C">{{ highLoadNum }}</div>
          </el-card>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="card-wrapper">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>低负荷服务器（台）</span>
            </div>
            <div class="big-number" style="color:#48D1CC">{{ lowLoadNum }}</div>
          </el-card>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { getResult } from '@/api/dashboard'
import { getChart } from '@/api/dashboard'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'

const lineChartData = {
  cpuavb: {
    timeData: [1, 2, 3, 4, 5, 6, 7],
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  memeryAvb: {
    timeData: [1, 2, 3, 4, 5, 6, 7],
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  storageAvb: {
    timeData: [1, 2, 3, 4, 5, 6, 7],
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  }
}

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: lineChartData.cpuavb,
      totalNum: 10,
      successNum: 10,
      abnormalNum: 0,
      highLoadNum: 0,
      lowLoadNum: 10,
      avbType: 'CPU'
    }
  },
  created() {
    this.fetchData()
    this.fetchChartData('cpuavb')
  },
  methods: {
    fetchData() {
      getResult().then(response => {
        this.totalNum = response.data.items.totalNum
        this.successNum = response.data.items.successNum
        this.abnormalNum = response.data.items.abnormalNum
        this.highLoadNum = response.data.items.highLoadNum
        this.lowLoadNum = response.data.items.lowLoadNum
      })
    },
    fetchChartData(param) {
      getChart().then(response => {
        this.lineChartData = response.data.items[param]
      })
    },
    handleSetLineChartData(type) {
      this.fetchChartData(type)
      if (type === 'memeryAvb') {
        this.avbType = '内存'
      } else if (type === 'storageAvb') {
        this.avbType = '存储'
      } else {
        this.avbType = 'CPU'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .card-wrapper {
    background: #fff;
    padding: 16px;
    margin-bottom: 32px;
    height: 100%;

    .text {
      font-size: 16px;
    }

    .item {
      margin-bottom: 18px;
    }

    .big-number {
      float: left;
      padding: 30px;
      margin-bottom: 20px;
      font-size: 40px;
    }

    .clearfix {
      font-weight: bold;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }

  }
}

@media (max-width:1024px) {
  .card-wrapper {
    padding: 8px;
  }
}
</style>
