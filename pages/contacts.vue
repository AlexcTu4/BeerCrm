<template>
  <div :class="$style.main">
<!--    <SmartTable-->
<!--      :columns="columnNames"-->
<!--      :data="contacts"-->
<!--    />-->
    <b-table striped hover :items="contacts" ></b-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import {getModule} from "vuex-module-decorators";
import contacts from "~/store/contacts";
import { mapState} from 'vuex';
// import SmartTable from '~/components/BaseComponents/SmartTable'
import {ContactsColumnNamesTable} from "~/types/ContactsDataTable";

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
  private columnNames : ContactsColumnNamesTable[] = [
    {
      entity: 'first_name',
      name: "Имя"
    },
    {
      entity: 'last_name',
      name: "Фамилия"
    },
    {
      entity: 'patronymic',
      name: "Отчество"
    },
    {
      entity: 'phone',
      name: "Телефон"
    },
    {
      entity: 'post',
      name: "Должность"
    },
    {
      entity: 'description',
      name: "Описание"
    }
  ]
  mounted():void{
    getModule(contacts, this.$store);
    this.$store.dispatch('contacts/getContacts')
  }
}

</script>
<style lang="scss" module>
.main{
  background: $main-additional-color;
}
</style>
