<template>
  <div
    :class="$style.main"
  >
<!--    <SmartTable-->
<!--      :columns="columnNames"-->
<!--      :data="contacts"-->
<!--    />-->
    <b-table
      striped
      hover
      :class="$style.table"
      :items="contacts.data"
      :fields="columns"
    >
    </b-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import {getModule} from "vuex-module-decorators";
import contacts from "~/store/contacts";
import { mapState} from 'vuex';
// import SmartTable from '~/components/BaseComponents/SmartTable'
import {IContacts} from "~/types/ContactsDataTable";
import {IColumnTable} from "~/types/BaseTypes/ColumnTable";

@Component({
  layout: 'main',
  components:{
    // SmartTable
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
    })
    return fields;
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
  .table{
    background: #fff;
    margin-top: -60px;
  }
}
</style>
