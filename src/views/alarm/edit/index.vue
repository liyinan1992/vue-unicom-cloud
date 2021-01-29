<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="规则名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select v-model="form.type" placeholder="选择设备类型">
          <el-option label="主机" value="server" />
          <el-option label="网络" value="net" />
          <el-option label="存储" value="net" />
        </el-select>
      </el-form-item>
      <el-form-item label="巡检指标">
        <el-input v-model="form.target" />
      </el-form-item>
      <el-form-item label="阈值">
        <el-input v-model="form.threshold" />
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
        type: '',
        target: '',
        threshold: 0
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
        type: '',
        target: '',
        threshold: 0
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

