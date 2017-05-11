<template>
  <div class="m-status-bar">
    <ul class="signal">
      <li v-for="n in 5" :class="[ n > signal ? 'no-signal' : 'has-signal' ]"></li>
    </ul>
    <div class="operator">
      {{operator}}
    </div>
    <div class="lock">
      <i class="icon-lock"></i>
    </div>
    <div class="battery">
      <span class="power-text">
        {{(power * 100).toFixed(0)}}%
      </span>
      <i class="icon-battery">
        <i class="power" :style="{
          width: 1.6 * power + 'rem',
          backgroundColor: power > 0.2 ? null : '#c90101'
        }"></i>
      </i>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        operator: '中国移动',
        signal: 4,
        power: 0.7,
      }
    },
    props: ['time'],
    computed: {},
    mounted: function () {
      this.powerDown();
    },
    methods: {
      powerDown() {
        setTimeout(() => {
          if(this.power > 0.01) {
            this.power = (this.power - 0.01).toFixed(2);
          }
          this.powerDown();
        }, 3000);
      }
    },
    components: {}
  }
</script>

<!-- Styles -->

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
</style>
