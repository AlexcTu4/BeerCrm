<template>
  <div :class="$style.header">
    header
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

})
</script>
<style lang="scss" module>
@import "assests/style/global";

  .header{
    background: $main-color;
    width: 100%;
  }
</style>
