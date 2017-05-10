<template>
  <div class="m-lock-time">
    <div class="time">
      {{time}}
    </div>
    <div class="date">
      {{date}}
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    props: [ 'time', 'date' ],
    mounted: function () {
    },
    methods: {},
    components: {}
  }
</script>

<!-- Styles -->

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">

</style>
