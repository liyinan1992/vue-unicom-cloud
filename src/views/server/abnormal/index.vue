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
      <el-form-item label="时间">
        <el-date-picker
          v-model="form.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      element-loading-text="Loading"
      border
      fit
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ (currentPage-1)*pagesize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="IP" width="150">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="设备名称" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="巡检时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="异常描述" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="详情" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="showMsgDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      @current-change="current_change"
    />
    <el-dialog
      title="异常结果详情"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-row>
        <span>{{ msgTitle }}</span>
      </el-row>
      <el-row>
        <span>{{ msgDetail }}</span>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/server/history'

export default {
  data() {
    return {
      list: [],
      listLoading: false,
      total: 0,
      pagesize: 5,
      currentPage: 1,
      form: {
        dc: '西咸',
        ip: '',
        time: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
      },
      dialogVisible: false,
      msgDetail: null,
      msgTitle: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.form).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    current_change(currentPage) {
      this.currentPage = currentPage
    },
    doSearch() {
      console.log(this.form.time)
      this.fetchData()
    },
    showMsgDetail(msg) {
      this.dialogVisible = true
      this.msgDetail = msg.title
      this.msgTitle = msg.author
    }
  }
}
</script>
