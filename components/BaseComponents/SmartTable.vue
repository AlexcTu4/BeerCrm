<template>
  <div :class="$style.smartTableCmp">
    <BaseTableHeader
      @add="onAdd"
      @search="onSearch"
      :idModal="idModal"
    />

    <div :class="$style.smartTable">
      <b-table
        outlined
        hover
        show-empty
        :class="$style.table"
        :items="data.data"
        :fields="columns"
      >
        <template #cell(phone)="data">
          <a :href="'tel:'+data.item.phone">{{data.item.phone}}</a>
        </template>
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
              @click="onEdit(data.item)"
              v-b-modal="idModal"
            />
            <fa
              v-if="btnDelete"
              icon="times"
              :class="[$style.icon, $style.delete]"
              @click="onDelete(data.item)"
            />
          </div>

        </template>
      </b-table>
    </div>


    <BaseTableFooter
      :data="data"
      @pagination="onPageInput"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, {mixins} from 'nuxt-class-component'
import BaseTableHeader from "~/components/BaseComponents/BaseTableHeader.vue";
import BaseTableFooter from "~/components/BaseComponents/BaseTableFooter.vue";
import TableMixin from "~/mixins/TableMixin";
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
    idModal:{
      type: String
    }

  }
})

@Component({
  components:{
    BaseTableFooter,
    BaseTableHeader,
  },


})
export default class SmartTable extends mixins(SmartTableProps, TableMixin){

  onSave(data: any): void{
    this.$emit('save', data)
  }




  mounted() : void {

  }
}
</script>
<style lang="scss" module>
.smartTableCmp{
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
