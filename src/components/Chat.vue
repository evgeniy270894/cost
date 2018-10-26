<template>
  <div ref="chat" class="chat-container chat-container__hidden">
    <div class="chat-title" @click="toggleChat">Чат</div>
    <div class="msg-box" ref="msgBox">
      <div v-for="(msg, index) in messages" :key="index" class='msg' :class='{right: isCurrentUser(msg.user), left: !isCurrentUser(msg.user)}'>
        <span>{{ msg.user }}: </span>{{ msg.message }}
      </div>
    </div>
    <div v-if="$store.getters['currentUserState/isAdmin']" @keyup.enter="sendMessage">
      <el-input
        class="chat-input"
        placeholder="Введите сообщение..."
        v-model="input"
        ref="chatInput"
      />
    </div>
    <div v-else class="only-admin-text">
      Сообщения могут отправлять только админы!
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'Chat',
  data () {
    return {
      input: '',
      messages: [],
      socket: io('localhost:9003')
    }
  },
  methods: {
    isCurrentUser (user) {
      return user === this.$store.getters['currentUserState/getUsername']
    },
    scrollToBottom () {
      this.$refs.msgBox.scrollTop = this.$refs.msgBox.scrollHeight
      // this.$refs.msgBox.scrollTop += 10
      console.log('scrollTop', this.$refs.msgBox.scrollTop + 320)
      console.log('scrollHeight', this.$refs.msgBox.scrollHeight)
    },
    sendMessage () {
      this.socket.emit('SEND_MESSAGE', {
        user: this.$store.getters['currentUserState/getUsername'],
        message: this.input
      })
      this.input = ''
    },
    showChat () {
      this.$refs.chat.classList.remove('chat-container__hidden')
    },
    hideChat () {
      this.$refs.chat.classList.add('chat-container__hidden')
    },
    toggleChat () {
      this.$refs.chat.classList.toggle('chat-container__hidden')
    }
  },
  mounted () {
    this.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data]
      this.scrollToBottom()
      this.showChat()
    })
  }
}
</script>

<style scoped>
.only-admin-text {
  height: 40px;
  font-size: 14px;
  display: flex;
  color: #ff100c;
  justify-content: center;
  align-items: center;
  border-top: 1px solid;
}

.chat-container {
  position: fixed;
  bottom: 6px;
  right: 40px;
  background-color: #ffffff;
  width: 320px;
  height: 400px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  transition: 0.5s;
  transform: translateY(0);
  overflow: hidden;
}

.chat-container__hidden {
  transform: translateY(364px);
  box-shadow: 0 2px 52px 0 rgba(0,0,0,.1);
}

.chat-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  cursor: pointer;
}

.msg-box {
  height: 320px;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
  margin-right: -16px;
}

.msg {
  box-shadow: rgba(0, 0, 0, 0.36) 0px 0px 5px -1px;
  position: relative;
  padding: 5px 13px;
  list-style: none;
  float: left;
  clear: both;
  margin: 10px 0;
  max-width: 92%;
  word-wrap: break-word;
  min-width: 80px;
}

.msg.left{
  float: left;
  clear: both;
  box-shadow: rgba(0, 0, 0, 0.36) 0px 1px 16px -6px;
  border-radius: 4px 18px 18px 18px;
}

.msg.right{
  float: right;
  clear: both;
  background-color: #FF5E3A;
  color: #ffffff;
  box-shadow: #FF5E3A 0px 1px 16px -6px;
  border-radius: 18px 4px 18px 18px;
}
</style>
