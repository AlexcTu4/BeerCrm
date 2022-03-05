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
    position: relative;
    .title{
      font-size: 22px;
      font-weight: bold;
    }
    &:after{
      content: '';
      background: $second-color;
      height: 130px;
      width: 100%;
      position: absolute;
      left: 0;
      transform: translateY(10px) skewY(-4deg);
      transform-origin: right;
      z-index: 900;
    }
  }

</style>
