<template>
  <div class="m-form">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="应用" prop="appName">
        <el-select v-model="form.appName" placeholder="请选择应用">
          <el-option label="微信" value="wechat"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息内容" prop="message">
        <el-input v-model="form.message"></el-input>
      </el-form-item>
      <el-form-item label="是否显示提示">
        <el-switch on-text="" off-text="" v-model="form.tip"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即发送</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import config from '@/../config'
  export default {
    data () {
      return {
        form: {
          appName: 'wechat',
          message: '',
          tip: true,
        },
        rules: {
          appName: [
            { required: true, message: '请输入选择应用', trigger: 'change' },
          ],
          message: [
            { required: true, message: '请输入消息内容', trigger: 'blur' }
          ]
        }
      }
    },
    mounted: function () {
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(`http://localhost:${config.broker.port}/push`, {
              data: {
                appName: this.form.appName,
                content: this.form.message,
                tip: this.form.tip ? '按下以显示更多' : '',
              },
              event: 'app-message',
            }).then(response => {
              this.$message(response.body);
            }, response => {
              this.$message('发生了一点错误');
            });
          } else {
            return false;
          }
        });
      }
    },
    components: {}
  }
</script>

<!-- Styles -->

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  .m-form {
    margin: 8px;
  }
  .line {
    text-align: center;
  }
</style>
