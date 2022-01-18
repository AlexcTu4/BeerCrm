<template>
  <div :class="$style.main">
    Purchases
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

@Component({
  layout: 'main',
})

export default class Purchases extends Vue{
  mounted():void{
    console.log(this.$route)
  }
}

</script>
<style lang="scss" module>
.main{
  background: $main-additional-color;
}
</style>
