<template>
  <div class="m-lock-message">
    <transition name="slide-fade">
      <ul class="message-list" v-if="newMessage && newCome" >
        <li class="message">
          <div class="head">
            <div class="icon"><img :src="newMessage.icon"/></div>
            <div class="app-name">{{newMessage.appName}}</div>
            <div class="timeDescribe">{{newMessage.timeDescribe}}</div>
          </div>
          <div class="content">
            <div class="body">{{newMessage.content}}</div>
            <div class="tip">{{newMessage.tip}}</div>
          </div>
        </li>
      </ul>
    </transition>
    <ul class="message-list">
      <template v-for="(message, index) in messages">
        <li class="message">
          <div class="head">
            <div class="icon"><img :src="message.icon"/></div>
            <div class="app-name">{{message.appName}}</div>
            <div class="timeDescribe">{{message.timeDescribe}}</div>
          </div>
          <div class="content">
            <div class="body">{{message.content}}</div>
            <div class="tip">{{message.tip}}</div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
  const io = require('socket.io-client');
  const config = require('@/../config');
  export default {
    data () {
      return {
        newCome: false,
        newMessage: null,
        messages: [
          {
            icon: require('@/assets/img/wechat.png'),
            appName: '微信',
            timeDescribe: '10分钟前',
            content: '你收到了一条消息',
            tip: '按下以显示更多'
          },
        ]
      }
    },
    mounted: function () {
      this.startListenMessage();
    },
    methods: {
      startListenMessage() {
        const socket = io(`ws://server.com:${config.ws.port}`, {
          "transports": ['websocket', 'polling']
        });
        console.log('开始获取推送');
        socket.on('app-message', (data) => {
          console.log(data);
          this.pushNewMessage(this.handleMessage(JSON.parse(data.data)))
        });
      },
      handleMessage(message) {
        let template = {
          icon: require('@/assets/img/wechat.png'),
          appName: '微信',
          timeDescribe: '10分钟前',
          content: '你收到了一条消息',
          tip: '按下以显示更多'
        };
        return Object.assign(template, message);

      },
      pushNewMessage(message) {
        this.newCome = false;
        this.newMessage && this.messages.unshift(this.newMessage);
        this.newMessage = message;
        setTimeout(() => {
          this.newCome = true;
        }, 10);
      }
    },
    components: {}
  }
</script>

<!-- Styles -->

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-active {
    opacity: 0;
  }
</style>
