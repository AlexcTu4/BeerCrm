<template>
  <div :class="$style.side">
    side
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

@Component
export default class SideMenu extends Vue{

}
</script>
<style module>
  .side{
    height: 100%;
    width: 100px;
    background: #6F47D7;
    border-radius: 0 10px 10px 0;
    box-shadow: 1px 0 5px #505050;
    margin-right: 20px;
  }
</style>
