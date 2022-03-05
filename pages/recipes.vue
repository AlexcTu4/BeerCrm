<template>
  <div :class="$style.main">
    recipes
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

@Component({
  layout: 'main',
})

export default class Recipes extends Vue{
  mounted():void{
    console.log(this.$route)
  }
}

</script>
<style lang="scss" module>
.main{
  z-index: 1000;
}
</style>
