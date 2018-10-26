<template>
  <el-row>
    <el-col :span="6" class="budget">
      <div class="label">
        Ваш бюджет:
      </div>
      <div class="summ">
        {{getBudget}}
      </div>
    </el-col>
    <el-col :span="12">
      <cards-list/>
    </el-col>
    <el-col :span="6">
      <div @click="$router.push('/add')" class="add-btn">
        <i class="el-icon-circle-plus-outline"></i>
      </div>
    </el-col>
    <chat></chat>
  </el-row>
</template>

<script>
import CardsList from './CardsList'
import Chat from './Chat'

export default {
  name: 'ManagePage',
  components: {
    CardsList,
    Chat
  },
  computed: {
    getBudget: function () {
      let budget = 0
      this.$store.getters['currentUserState/getCurrentUserCards'].map(item => {
        if (item.type === 'costs') {
          budget = budget - item.money
        } else {
          budget = budget + item.money
        }
      })
      return budget
    }
  }
}
</script>

<style scoped>
  .budget {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 38px;
  }
  .add-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 38px;
    height: 220px;
    width: calc(100% - 60px);
    margin-left: 30px;
    border-radius: 20px;
    font-size: 80px;
    color: #c0c4cc;
    transition: 0.5s;
  }
  .add-btn:hover {
    transition: 0.5s;
    color: #949494;
    background-color: #f7f7f7b3;
    cursor: pointer;
  }
  .label {
    color: rgba(77, 77, 77, 0.6);
  }
  .summ {
    line-height: 60px;
    font-size: 40px;
  }
</style>
