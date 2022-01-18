<template>
  <div :class="$style.header">
    {{ title }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import Auth from '@/store/main'
import { getModule } from 'vuex-module-decorators';

@Component
export default class Header extends Vue{
  get title(): string {
    return this.$store.state.main.links.find((item: ILink) => item.name === this.$route.name)?.title
  }
  mounted(): void {
    
    // const auth = getModule(Auth, this.$store);
    // const test = this.$store.dispatch('main/getCrms');
    const response = this.$axios.$get('/api/crms');
    response.then((resp) => {
      console.log(resp)
    })
    console.log( response);
  }
}
</script>
<style lang="scss" module>

  .header{
    background: $second-color;
    width: 100%;
  }
</style>
