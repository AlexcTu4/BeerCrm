<template>
  <div :class="$style.footer">
    <div
      :class="$style.title"
    >
      Подвал
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
export default class Footer extends Vue{

}
</script>
<style lang="scss" module>

.footer{
  background: $second-color;
  width: 100%;
  .title{
    font-size: 22px;
    font-weight: bold;
  }
}

</style>
