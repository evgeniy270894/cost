<template>
  <div class="header">
    <span @click="goLogin" class="go-login-btn">Контроль расходов</span>
    <div class="profile">
      <div class="username" v-if="$store.getters['currentUserState/isExists']">{{$store.getters['currentUserState/getUsername']}}</div>
      <div class="role" v-if="$store.getters['currentUserState/isExists']">{{$store.getters['currentUserState/getRole']}}</div>
    </div>
  </div>
</template>
z
<script>
export default {
  name: 'Header',
  methods: {
    goLogin: function () {
      this.$router.push('/')
      this.$store.dispatch('currentUserState/logout')
    }
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    color: rgba(0,0,0,0.6);
    height: 60px;
    width: 100%;
    box-shadow: 0 2px 8px #f0f1f2;
    margin-bottom: 40px;
  }

  .go-login-btn {
    cursor: pointer;
  }

  .profile {
    position: absolute;
    right: 40px;
    font-size: 18px;
    cursor: pointer;
  }

  .role {
    font-size: 14px;
    color: rgba(0,0,0,0.4);
  }
</style>
