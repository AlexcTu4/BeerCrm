<template>
  <div :class="$style.main">
    recipes
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, {mixins} from 'nuxt-class-component'
import PageMixin from "~/mixins/PageMixin";

@Component({
  layout: 'main',
})

export default class Recipes extends mixins(PageMixin){
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
