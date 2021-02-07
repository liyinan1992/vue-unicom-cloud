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
          {{ scope.row.ip }}
        </template>
      </el-table-column>
      <el-table-column label="设备名称" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="巡检时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行命令" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行结果" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="showMsgDetail(scope.row.result)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      @current-change="current_change"
    />
    <el-dialog
      title="执行结果详情"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <span>{{ msgDetail }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/server/history'

var curDate = new Date()

function dateFormat(fmt, date) {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}

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
        time: [new Date(curDate.getTime() - 24 * 60 * 60 * 1000), curDate]
      },
      dialogVisible: false,
      msgDetail: null
    }
  },
  methods: {
    fetchData(form) {
      this.listLoading = true
      getList(form).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    current_change(currentPage) {
      this.currentPage = currentPage
    },
    doSearch() {
      var param = {}
      param.dc = this.form.dc
      param.ip = this.form.ip
      param.startTime = dateFormat('YYYY-mm-dd HH:MM:SS', this.form.time[0])
      param.endTime = dateFormat('YYYY-mm-dd HH:MM:SS', this.form.time[1])
      this.fetchData(param)
    },
    showMsgDetail(msg) {
      this.dialogVisible = true
      this.msgDetail = msg
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>
