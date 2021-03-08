<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" :model="form" label-width="120px">
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
      <el-form-item>
        <el-button type="primary" @click="doSearch">查询</el-button>
        <el-button @click="showDialogForm">新增资源</el-button>
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
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ (currentPage-1)*pagesize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="主机IP" width="200">
        <template slot-scope="scope">
          {{ scope.row.ip }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属资源池" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.dc }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="巡检用户" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.user }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="信息修改时间" width="300">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      @current-change="current_change"
    />
    <el-dialog title="新增主机" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" label-width="120px">
        <el-form-item label="IP">
          <el-input v-model="dialogForm.ip" />
        </el-form-item>
        <el-form-item label="所属资源池">
          <el-select v-model="dialogForm.dc" placeholder="请选择所属资源池">
            <el-option label="西咸" value="西咸" />
          </el-select>
        </el-form-item>
        <el-form-item label="巡检用户">
          <el-input v-model="dialogForm.user" />
        </el-form-item>
        <el-form-item v-if="passwordVisible" label="用户密码">
          <el-input v-model="dialogForm.password" placeholder="请输入密码" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getServerList } from '@/api/strategy/server'
import { setServer } from '@/api/strategy/server'

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      pagesize: 5,
      currentPage: 1,
      dialogFormVisible: false,
      passwordVisible: true,
      form: {
        dc: '西咸',
        ip: ''
      },
      dialogForm: {
        ip: '',
        dc: '西咸',
        user: '',
        password: ''
      }
    }
  },
  created() {
    this.fetchData(this.form)
  },
  methods: {
    fetchData(param) {
      this.listLoading = true
      getServerList(param).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    current_change(currentPage) {
      this.currentPage = currentPage
    },
    doSearch() {
      this.fetchData(this.form)
    },
    showDialogForm() {
      this.dialogFormVisible = true
    },
    handleSubmit() {
      setServer(this.dialogForm).then(response => {
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '新增资源成功',
          type: 'success'
        })
      })
    }
  }
}
</script>
