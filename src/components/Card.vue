<template>
  <el-card shadow="hover" class="card">
    <p class="card-item"><span><span class="label">Стоимость:</span> {{money}}</span> <i @click="onHandleDelete(id)" class="el-icon-delete icon"></i></p>
    <p class="card-item"><span><span class="label">Описание:</span> {{desc ? desc : 'Нет описания'}}</span> <i @click="onHandleEdit(id)" class="el-icon-edit icon"></i></p>
  </el-card>
</template>

<script>
export default {
  name: 'Card',
  props: ['id', 'money', 'desc'],
  methods: {
    onHandleDelete (id) {
      this.$store.commit('currentUserState/deleteCard', {id})
    },
    onHandleEdit (id) {
      this.$router.push(`/edit/${id}`)
      // this.$store.commit('currentUserState/editCard', {id})
    }
  }
}
</script>

<style scoped>
  .card {
    margin: 4px;
  }
  .card-item {
    display: flex;
    justify-content: space-between;
  }
  .label {
    color: rgba(0,0,0,0.5)
  }
  .icon {
    color: rgba(0,0,0,0.2);
    transition: 0.3s;
    cursor: pointer;
  }
  .icon:hover {
    color: rgba(0,0,0,0.8);
  }
</style>
