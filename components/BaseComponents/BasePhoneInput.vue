<template>
  <div :class="$style.BasePhoneInput">
    <VuePhoneNumberInput
      v-model="phone"
      @update="update"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { Action } from "vuex-class";
import { getModule } from "vuex-module-decorators";
import contacts from "@/store/contacts";
//@ts-ignore
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import {IBasePhoneInput} from "~/types/BaseTypes/BasePhoneInput";


const BasePhoneInputProps = Vue.extend({
  props: {
    value: {
      type: String
    }
  }
})
@Component({
  components:{
    VuePhoneNumberInput
  }
})
export default class BasePhoneInput extends BasePhoneInputProps{
  private phone = this.value;
  update(value: IBasePhoneInput): void{
    console.log(value)
    if(value.isValid){
      this.$emit('update', value);
    }

  }
}
</script>
<style lang="scss" module>

.BasePhoneInput{
  display: flex;
}

</style>
