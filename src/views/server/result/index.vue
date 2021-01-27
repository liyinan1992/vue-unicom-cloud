<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" :model="form" label-width="120px">
      <el-radio-group v-model="form.dc">
        <el-radio-button label="西咸" />
        <el-radio-button label="CT-O" />
        <el-radio-button label="测试区" />
      </el-radio-group>
      <el-form-item label="IP">
        <el-input v-model="form.ip" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSearch">查询</el-button>
        <el-button @click="doCancel">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95" fixed>
        <template slot-scope="scope">
          {{ (currentPage-1)*pagesize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="IP" width="150" fixed>
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="设备名称" width="150" align="center" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="设备状态"
        width="110"
        align="center"
        fixed
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="巡检时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="CPU利用率" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内存利用率" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="存储利用率" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务情况" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="showMsgDetail(scope.row.title)">{{ scope.row.author }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="网络连接状态" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="showMsgDetail(scope.row.title)">{{ scope.row.author }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="丢包状况" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="showMsgDetail(scope.row.title)">{{ scope.row.author }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="利用率趋势" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="showAvbDetail(scope.row.title)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      @current-change="current_change"
    />
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>{{ msgDetail }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="利用率趋势"
      :visible.sync="chartVisible"
      fullscreen="true"
      :before-close="handleChartClose"
    >
      <el-row>
        <h3>CPU利用率趋势（%）</h3>
      </el-row>
      <el-row>
        <line-chart :chart-data="lineChartData.cpuAvb" />
      </el-row>
      <el-row>
        <h3>内存利用率趋势（%）</h3>
      </el-row>
      <el-row>
        <line-chart :chart-data="lineChartData.memeryAvb" />
      </el-row>
      <el-row>
        <h3>内存利用率趋势（%）</h3>
      </el-row>
      <el-row>
        <line-chart :chart-data="lineChartData.memeryAvb" />
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="chartVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import LineChart from './components/LineChart'

const lineChartData = {
  cpuAvb: {
    timeData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    expectedData: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90],
    actualData: [90, 92, 91, 54, 62, 40, 45, 98, 90, 92, 91, 54, 62, 40, 45, 98, 90, 92, 91, 54, 62, 40, 45, 98]
  },
  memeryAvb: {
    timeData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    expectedData: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90],
    actualData: [90, 92, 91, 54, 62, 40, 45, 98, 90, 92, 91, 54, 62, 40, 45, 98, 90, 92, 91, 54, 62, 40, 45, 98]
  },
  storageAvb: {
    timeData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    expectedData: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90],
    actualData: [90, 92, 91, 54, 62, 40, 45, 98, 90, 92, 91, 54, 62, 40, 45, 98, 90, 92, 91, 54, 62, 40, 45, 98]
  }
}

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        正常: 'success',
        异常: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    LineChart
  },
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      pagesize: 5,
      currentPage: 1,
      form: {
        dc: '西咸',
        ip: '',
        status: []
      },
      options: [{
        value: '正常',
        label: '正常'
      }, {
        value: '异常',
        label: '异常'
      }],
      dialogVisible: false,
      chartVisible: false,
      msgDetail: null,
      chartDetail: null,
      lineChartData: lineChartData
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    current_change(currentPage) {
      this.currentPage = currentPage
    },
    doSearch() {
      console.log('查询')
    },
    doCancel() {
      console.log('重置')
    },
    showMsgDetail(msg) {
      this.dialogVisible = true
      this.msgDetail = msg
    },
    showAvbDetail(msg) {
      this.chartVisible = true
      this.chartDetail = msg
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleChartClose() {
      this.chartVisible = false
    }
  }
}
</script>
