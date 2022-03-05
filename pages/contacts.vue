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
      <BaseEditModal/>
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
import BaseEditModal from '~/components/BaseComponents/BaseEditModal.vue';
import {IContacts} from "~/types/IEntity/ContactsDataTable";
import {IColumnTable} from "~/types/BaseTypes/ColumnTable";
import {IContactsColumnNamesTable} from "~/types/IEntity/ContactsDataTable";

@Component({
  layout: 'main',
  components:{
    SmartTable,
    BaseEditModal
  },
  computed: {
    ...mapState('contacts', [
      'contacts',
    ])
  }
})

export default class Contacts extends Vue{
  private contacts!: IContacts;
  get columns(): any {
    let fields : IColumnTable[] = [];
    this.contacts.info?.forEach((item : IColumnTable) =>{
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
    await this.$store.dispatch('contacts/GET_CONTACTS');
  }
}

</script>
<style lang="scss" module>
.main{
  width: 100%;
  z-index: 1000;
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
