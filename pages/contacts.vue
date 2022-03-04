<template>
  <div
    :class="$style.main"
  >
<!--    <SmartTable-->
<!--      :columns="columnNames"-->
<!--      :data="contacts"-->
<!--    />-->
    <div
      :class="$style.tableWrap"
    >
      <SmartTable
        :columns="columns"
        :data="contacts.data"
        :btnDelete="true"
        :btnSave="true"
        :btnEdit="true"
        @save="saveContact"
        @delete="deleteContact"
      />
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import {getModule} from "vuex-module-decorators";
import contacts from "~/store/contacts";
import { mapState} from 'vuex';
import SmartTable from '~/components/BaseComponents/SmartTable.vue';
import {IContacts} from "~/types/ContactsDataTable";
import {IColumnTable} from "~/types/BaseTypes/ColumnTable";

@Component({
  layout: 'main',
  components:{
    SmartTable
  },
  computed: {
    ...mapState('contacts', [
      'contacts',
    ])
  }
})

export default class Contacts extends Vue{
  get columns(): any {
    let fields : IColumnTable[] = [];
    //@ts-ignore
    this.contacts.info?.forEach((item) =>{
      fields.push({...item, sortable: true});
    });
    fields.push({
      key: 'btn',
      label: 'Действия',
      sortable: false
    })
    return fields;
  }
  saveContact(data: any): void {
    console.log(data)
  }
  deleteContact(data: any): void {
    console.log(data)
  }
  async mounted(): Promise<any>{
    getModule(contacts, this.$store);
    await this.$store.dispatch('contacts/getContacts');
  }
}

</script>
<style lang="scss" module>
.main{
  width: 100%;
  .tableWrap{
    padding: 20px;
    background: #fff;
    margin-top: -60px;
    border-radius: 10px;
    .table{

    }
  }

}
</style>
