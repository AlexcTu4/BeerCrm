<template>
  <div :class="$style.main">
    aaaaaaaaa
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, {mixins} from 'nuxt-class-component'
import PageMixin from "~/mixins/PageMixin";

@Component({
  layout: 'main',
})

export default class Index extends mixins(PageMixin){

}

</script>
<style lang="scss" module>
@import "assets/style/global";
  .main{
    z-index: 1000;
  }
</style>
