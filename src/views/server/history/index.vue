<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" :model="form" label-width="80px">
      <el-form-item>
        <el-radio-group v-model="form.dc">
          <el-radio-button label="西咸" />
          <el-radio-button label="CT-O" />
          <el-radio-button label="测试区" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="IP">
        <el-input v-model="form.ip" placeholder="为空时默认全部" />
      </el-form-item>
      <el-form-item label="巡检状态">
        <el-select v-model="form.status" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item style="margin:0 20px">
        <el-radio-group v-model="form.cycle">
          <el-radio :label="1">当前周期</el-radio>
          <el-radio :label="2">选择时间</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.cycle===2" label="时间范围">
        <el-date-picker
          v-model="form.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
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
      :page-size="pagesize"
      @current-change="current_change"
    />
    <el-dialog
      title="执行结果详情"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <pre><span>{{ msgDetail }}</span></pre>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/server/history'
import { dateFormat } from '@/common/dateFormat'
import { arrayEqual } from '@/common/arrayEqual'

var curDate = new Date()

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
        status: ['失败'],
        cycle: 1,
        time: [new Date(curDate.getTime() - 10 * 60 * 1000), curDate]
      },
      options: [{
        value: '成功',
        label: '成功'
      }, {
        value: '失败',
        label: '失败'
      }],
      dialogVisible: false,
      msgDetail: null
    }
  },
  created() {
    this.doSearch()
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
      if (this.form.cycle === 1) {
        param.startTime = ''
        param.endTime = ''
      } else {
        param.startTime = dateFormat('YYYY-mm-dd HH:MM:SS', this.form.time[0])
        param.endTime = dateFormat('YYYY-mm-dd HH:MM:SS', this.form.time[1])
      }
      if (arrayEqual(this.form.status, ['成功'])) { param.status = 1 } else if (arrayEqual(this.form.status, ['失败'])) { param.status = 2 } else { param.status = 0 }
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
