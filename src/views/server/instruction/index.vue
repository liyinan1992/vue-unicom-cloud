<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="指令名称">
        <el-input v-model="form.name" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="指令内容">
        <el-input
          v-model="form.content"
          type="textarea"
          placeholder="请输入内容"
          rows="6"
        />
      </el-form-item>
      <el-form-item label="执行IP">
        <el-input v-model="form.ip" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">执行</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
      <el-form-item label="执行结果">
        <el-input
          v-model="form.result"
          type="textarea"
          rows="10"
          readonly
        />
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
        content: '',
        ip: '',
        result: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('功能尚未开启，请知悉')
    },
    onCancel() {
      this.$message({
        message: '重置!',
        type: 'warning'
      })
      this.form = {
        name: '',
        content: '',
        ip: '',
        result: ''
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

