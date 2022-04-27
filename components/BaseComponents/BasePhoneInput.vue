<template>
  <div :class="$style.BasePhoneInput">
    <VuePhoneNumberInput
      v-model="phone"
      @update="update"
      ref="phone"
      v-validation="{type: 'phone', required: true}"
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
<style lang="scss">
@import "assets/style/media";
@include xs {
  .select-country-container{
    flex: 0 0 85px!important;
    min-width: 30px!important;
    width: 30px!important;
  }
  .country-selector__toggle{
    right: 0!important;
    top: 8px!important;
  }
  .country-selector__country-flag{
    top: 13px!important;
    left: 5px!important;
  }
  .iti-flag{

  }
  .country-selector__label{
    display: none;
  }
  .country-selector__input{
    padding: 0 20px 0 30px !important;
    text-align: center;
  }
  .input-tel__label{
    display: none;
  }
  .input-tel__input{
    padding-top: 0!important;
  }
}

</style>
