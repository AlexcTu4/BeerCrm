<template>
  <div :class="$style.header">
    header
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

@Component
export default class Header extends Vue{

}
</script>
<style lang="scss" module>
@import "assests/style/global";

  .header{
    background: $main-color;
    width: 100%;
  }
</style>
