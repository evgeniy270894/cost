<template>
  <el-row class="main-container" type="flex" justify="center">
    <el-col :span="8">
      <el-card class="box-card">
        <div slot="header" class="card-header">
          <span class="title">Войдите в свой аккаунт</span>
        </div>
        <el-form id="form" :model="form" ref="form" :rules="rules">
          <el-form-item label="Логин" prop="login">
            <el-input v-model="form.login" placeholder="Введите ваш логин"></el-input>
          </el-form-item>
          <el-row type="flex" justify="center" class="btns">
            <el-button type="primary" @click.prevent="onHandleSubmit('form')">Войти</el-button>
            <el-button @click.prevent="onClear">Очистить</el-button>
          </el-row>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      form: {
        login: ''
      },
      rules: {
        login: [
          {required: true, message: 'Пожалуйста, введите ваш логин!', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    onHandleSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('currentUserState/login', {login: this.form.login})
            .then(() => this.$router.push('/home'))
            .then(() => {
              this.$store.dispatch('currentUserState/getCards', {login: this.$store.getters['currentUserState/getLogin']})
                .catch(() => this.$message.error('Не удалось загрузить данные!'))
            })
            .catch(() => this.$message.error('Данного пользователя не существует!'))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onClear: function () {
      this.form.login = ''
    }
  },
  mounted () {
    document.getElementById('form').addEventListener('submit', (e) => {
      e.preventDefault()
      this.onHandleSubmit('form')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-header {
    font-size: 20px;
    text-align: center;
  }

  .main-container {
    margin-top: 80px;
  }

  .btns {
    margin-top: 30px;
  }
</style>
