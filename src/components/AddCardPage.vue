<template>
  <el-row type="flex" justify="center">
    <el-col :span="12" style="margin-top: 20px">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="Сумма" prop="summ">
          <el-input-number v-model="form.summ" controls-position="right" :min="0" :max="100000000000"></el-input-number>
        </el-form-item>
        <el-form-item label="Описание" prop="desc">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 20}"
            placeholder="Введите описание"
            v-model="form.desc"/>
        </el-form-item>
        <el-form-item label="Тип" prop="type">
          <el-select v-model="form.type">
            <el-option label="Расходы" value="costs"></el-option>
            <el-option label="Зачисления" value="admissions"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="onHandleSubmit('form')">Добавить</el-button>
          <el-button @click="$router.go(-1)">Отмена</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import vue from '../main'

export default {
  name: 'AddCardPage',
  data () {
    return {
      form: {
        summ: 0,
        desc: '',
        type: 'costs'
      },
      rules: {
        summ: [
          { required: true, message: 'Пожалуйста, введите сумму!', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onHandleSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit('currentUserState/addCard', {
            id: vue.$HotUtils.getRandomId(),
            money: this.form.summ,
            desc: this.form.desc,
            type: this.form.type
          })
          this.$router.push('/home')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.btns {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  margin-left: -80px;
}
</style>
