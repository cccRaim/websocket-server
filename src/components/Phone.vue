<template>
  <div class="m-phone">
    <StatusBar :time="time"></StatusBar>
    <div class="main">
      <LockTime :time="time" :date="date"></LockTime>
      <LockMessage></LockMessage>
      <LockBottom></LockBottom>
    </div>
  </div>
</template>

<script>
  import StatusBar from '@/components/StatusBar'
  import LockTime from '@/components/LockTime'
  import LockMessage from '@/components/LockMessage'
  import LockBottom from '@/components/LockBottom'
  export default {
    data () {
      return {
        time: '',
        date: '',
      }
    },
    mounted: function () {
      this.timing();
    },
    methods: {
      prefixInteger(num, n) {
        return (Array(n).join(0) + num).slice(-n);
      },
      timing() {
        const weekArr = ['日', '一', '二', '三', '四', '五', '六'];
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        minute = this.prefixInteger(minute, 2);
        let month = date.getMonth();
        let day = date.getDate();
        let weekday = date.getDay();
        this.date = `${month}月${day}日 星期${weekArr[weekday]}`;
        this.time = `${hour}:${minute}`;
        setTimeout(() => {
          this.timing()
        }, 1000)
      }
    },
    components: {
      StatusBar,
      LockTime,
      LockMessage,
      LockBottom,
    }
  }
</script>

<!-- Styles -->

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">

</style>
