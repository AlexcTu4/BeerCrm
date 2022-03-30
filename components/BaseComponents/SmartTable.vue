<template>
  <div :class="$style.smartTable">
    <b-table
      outlined
      hover
      :class="$style.table"
      :items="data"
      :fields="columns"
    >
      <template #cell(btn)="data">
        <div
          :class="$style.btnWrapper"
        >
<!--          <fa-->
<!--            v-if="btnSave"-->
<!--            icon="check"-->
<!--            :class="[$style.icon, $style.save]"-->
<!--            @click="onSave(data)"-->
<!--          />-->
          <fa
            v-if="btnEdit"
            icon="pen"
            :class="[$style.icon, $style.edit]"
            @click="onEdit(data)"
          />
          <fa
            v-if="btnDelete"
            icon="times"
            :class="[$style.icon, $style.delete]"
            @click="onDelete(data)"
          />
        </div>

      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, {mixins} from 'nuxt-class-component'
import {IBaseModalData} from "~/types/BaseTypes/BaseModalData";
import {IContactsDataTable} from "~/types/IEntity/ContactsDataTable"
import BasePhoneInput from "~/components/BaseComponents/BasePhoneInput.vue"
const SmartTableProps = Vue.extend({
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: false
    },
    btnDelete: {
      type: Boolean
    },
    btnEdit: {
      type: Boolean
    },
    btnSave: {
      type: Boolean
    },
  }
})
import { required, minLength, between } from 'vuelidate/lib/validators'
//@ts-ignore
import { validationMixin } from 'vuelidate'
import {IColumnTable} from "~/types/BaseTypes/ColumnTable";

//@ts-ignore
@Component({
  components:{
    BasePhoneInput
  },


})
export default class SmartTable extends mixins(SmartTableProps, validationMixin){
  private columns!: IColumnTable;

  onSave(data: any): void{
    this.$emit('save', data)
  }
  onEdit(data: any): void {
    this.$emit('editRow', data);
  }
  onDelete(data: any): void {
    this.$emit('delete', data)
  }
  // updatePhone(phone: any){
  //   this.modalData.data.phone = phone.formattedNumber
  //   console.log(this.modalData)
  // }
  saveContact(): void {
    this.$v.$touch();
    console.log(this.$v)
  }
  get validations(): any {
    return {
      modalData:{
        first_name: {
          required,
        },
      }

    }
  }
  mounted() : void {
    //@ts-ignore
    console.log(this.$v);
  }
}
</script>
<style lang="scss" module>
.smartTable{
  .btnWrapper{
    display: flex;
    height: 100%;
    justify-content: space-around;
    .icon{
      cursor: pointer;
      &.save{
        color: #86ce00;
      }
      &.edit{
        color: #5581E0;
      }
      &.delete{
        color: #ef3737;
      }
    }
  }

}
.modalText{
  width: 110px;
  justify-content: center;
}
.phoneInput{
  width: calc(100% - 109px);
}
</style>
<style>
  .modal-600px{
    max-width: 600px;
  }
  .country-selector input{
    border-top-left-radius: 0!important;
    border-bottom-left-radius: 0!important;
}
</style>
