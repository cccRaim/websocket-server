<template>
  <div class="m-lock-bottom">
    <div class="tip">
      {{message}}
    </div>
    <ul class="indicators">
      <li></li>
      <li class="current"></li>
      <li>
        <i class="icon-camera"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        message: '按下主屏幕按钮以解锁'
      }
    },
    mounted: function () {
    },
    methods: {},
    components: {}
  }
</script>

<!-- Styles -->

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">

</style>
