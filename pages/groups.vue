<template>
  <div :class="$style.main">
    groups
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, {mixins} from 'nuxt-class-component'
import PageMixin from "~/mixins/PageMixin";

@Component({
  layout: 'main',
})

export default class Groups extends mixins(PageMixin){
  mounted():void{

  }
}

</script>
<style lang="scss" module>
.main{
  z-index: 1000;
}
</style>
