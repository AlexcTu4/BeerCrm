<template>
  <div :class="$style.smartTableCmp">
    <div :class="$style.headerTable"
    >
      <div
        :class="$style.searchInputWrap"
      >
        <b-form-input
          :class="$style.searchInput"
          v-model="searchString"
          placeholder="Поиск..."
          @input="onSearchInput"
        />
        <div
          :class="$style.iconWrap"
        >
          <fa
            :class="$style.icon"
            icon="search"
            @click="onSearch"
          />
        </div>

      </div>
      <div
        :class="$style.btnTable"
      >
        <b-button
          variant="success"
          size="sm"
          @click="onAdd"
        >
          <fa
            icon="plus"
          />
        </b-button>
      </div>
    </div>

    <div :class="$style.smartTable">
      <b-table
        outlined
        hover
        show-empty
        :class="$style.table"
        :items="data.data"
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

    <div :class="$style.footerTable"
    >
      <b-pagination
        align="center"
        :value="data.current_page"
        :total-rows="data.total"
        :per-page="data.per_page"
        @input="onPageInput"
      ></b-pagination>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, {mixins} from 'nuxt-class-component'
import {IBaseModalData} from "~/types/BaseTypes/BaseModalData";
import {IContacts, IContactsDataTable} from "~/types/IEntity/ContactsDataTable"
import BasePhoneInput from "~/components/BaseComponents/BasePhoneInput.vue"
const SmartTableProps = Vue.extend({
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Object,
      required: true
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
  private searchString : string = '';
  onSave(data: any): void{
    this.$emit('save', data)
  }
  onEdit(data: any): void {
    this.$emit('editRow', data);
  }
  onDelete(data: any): void {
    this.$emit('delete', data)
  }
  onAdd(): void {
    this.$emit('add')
  }
  onSearchInput( value : string) : void {
    if (!value) {
      this.$emit('search', false);
    }
  }
  onSearch() : void {
      this.$emit('search', this.searchString);
  }

  onPageInput(value: string) : void {
    this.$emit('pagination', value);
  }

  mounted() : void {

  }
}
</script>
<style lang="scss" module>
.smartTableCmp{
  .headerTable{
    display: flex;
    justify-content: space-between;
    .searchInputWrap{
      position: relative;
      max-width: 300px;
      margin-bottom: 20px;
      .searchInput{

      }
      .iconWrap{
        margin: auto;
        position: absolute;
        height: 50%;
        top: 0;  bottom: 0; right: 10px;
        cursor: pointer;
      }

    }
    .btnTable{

    }
  }


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
}

//.modalText{
//  width: 110px;
//  justify-content: center;
//}
//.phoneInput{
//  width: calc(100% - 109px);
//}
</style>
<style>
/*  .modal-600px{*/
/*    max-width: 600px;*/
/*  }*/
/*  .country-selector input{*/
/*    border-top-left-radius: 0!important;*/
/*    border-bottom-left-radius: 0!important;*/
/*}*/
</style>
