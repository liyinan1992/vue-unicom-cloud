<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="策略名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="资源池">
        <el-select v-model="form.dc" placeholder="选择资源池">
          <el-option label="西咸" value="西咸" />
          <el-option label="IT-O" value="it-o" />
          <el-option label="测试区" value="测试区" />
        </el-select>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select v-model="form.type" placeholder="选择设备类型">
          <el-option label="主机" value="server" />
          <el-option label="网络" value="net" />
          <el-option label="存储" value="net" />
        </el-select>
      </el-form-item>
      <el-form-item label="策略有效期">
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="IP范围">
        <el-col :span="11">
          <el-input v-model="form.ipFrom" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-input v-model="form.ipTo" />
        </el-col>
      </el-form-item>
      <el-form-item label="执行周期">
        <el-col :span="8">
          <el-input v-model="form.executeTime" />
        </el-col>
        <el-col :span="4" class="line">-</el-col>
        <el-col :span="12">
          <el-radio-group v-model="form.executeUnit">
            <el-radio :label="1">秒</el-radio>
            <el-radio :label="2">分</el-radio>
            <el-radio :label="3">小时</el-radio>
            <el-radio :label="4">天</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="启用">
        <el-switch v-model="form.enable" />
      </el-form-item>
      <el-form-item label="指令">
        <el-input v-model="form.order" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        dc: '',
        type: '',
        endTime: '',
        ipFrom: '',
        ipTo: '',
        executeTime: '',
        executeUnit: 1,
        enable: true,
        order: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('该功能暂不支持')
    },
    onCancel() {
      this.$message({
        message: '重置',
        type: 'warning'
      })
      this.form = {
        name: '',
        dc: '',
        type: '',
        endTime: '',
        ipFrom: '',
        ipTo: '',
        executeTime: '',
        executeUnit: 1,
        enable: true,
        order: ''
      }
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

