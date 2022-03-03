<template>
  <div :class="$style.header">
    <div
    :class="$style.title"
    >
      {{ title }}
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { Action } from "vuex-class";
import { getModule } from "vuex-module-decorators";
import contacts from "@/store/contacts";


@Component
export default class Header extends Vue{
  get title(): string {
    return this.$store.state.main.links.find((item: ILink) => item.name === this.$route.name)?.title
  }
  mounted(): void {

  }
}
</script>
<style lang="scss" module>

  .header{
    background: $second-color;
    width: 100%;
    .title{
      font-size: 22px;
      font-weight: bold;
    }
  }

</style>
