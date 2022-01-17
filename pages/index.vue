<template>
  <div :class="$style.main">
    aaaaaaaaa
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

@Component({
  layout: 'main'
})

export default class Index extends Vue{

}

</script>
<style module>
  .main{
    background: #3E13AF;
  }
</style>
