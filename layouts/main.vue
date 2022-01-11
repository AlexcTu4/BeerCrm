<template>
  <div :class="$style.page">
    <sideMenu></sideMenu>
    <div :class="$style.content">
      <Header></Header>
      <nuxt></nuxt>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
})
</script>

<style lang="scss" module>
  .page{
    height: 100vh;
    width: 100%;
    display: flex;
  }
  .content{
    width: 100%;
  }
</style>
