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
        @delete="deleteContact"
        @editRow="editRow"
      />
      <BaseEditModal
        @save="saveContact"
        @update-phone="updatePhone"
      />
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import {getModule} from "vuex-module-decorators";
import contacts from "~/store/contacts";
import { mapState, mapGetters} from 'vuex';
import SmartTable from '~/components/BaseComponents/SmartTable.vue';
import BaseEditModal from '~/components/BaseComponents/BaseEditModal.vue';
import {IContacts} from "~/types/IEntity/ContactsDataTable";
import {IColumnTable} from "~/types/BaseTypes/ColumnTable";
import {IContactsColumnNamesTable} from "~/types/IEntity/ContactsDataTable";
import {IErrorResponse} from "~/types/BaseTypes/ErrorResponse";
import {IBaseModalData} from "~/types/BaseTypes/BaseModalData";
import {BaseErrors} from "~/types/BaseTypes/mainErrors";

@Component({
  layout: 'main',
  components:{
    SmartTable,
    BaseEditModal
  },
  computed: {
    ...mapState('contacts', [
      'contacts',
    ]),
    ...mapState('main', [
      'errors',
    ]),
    ...mapGetters('main', [
      'modalErrorText'
    ])
  }
})

export default class Contacts extends Vue{
  private contacts!: IContacts;
  private errors!: BaseErrors;

  private modalData: IBaseModalData = {
    title: 'Редактирование контакта',
    show: false,
    data: null,
    fields: null
  };
  get columns(): IColumnTable[] {
    return [
      {
        'key': 'id',
        'label': 'ID',
        'editable': false,
        'required': true,
        'sortable': true,
      },
      {
        'key': 'first_name',
        'label': 'Имя',
        'editable': true,
        'required': true,
        'sortable': true,
      },
      {
        'key': 'last_name',
        'label': 'Фамилия',
        'editable': true,
        'required': true,
        'sortable': true,
      },
      {
        'key': 'patronymic',
        'label': 'Отчество',
        'editable': true,
        'required': false,
        'sortable': true,
      },
      {
        'key': 'email',
        'label': 'Email',
        'editable': true,
        'required': true,
        'sortable': true,
      },
      {
        'key': 'phone',
        'label': 'Телефон',
        'editable': true,
        'required': true,
        'sortable': true,
      },
      {
        'key': 'company',
        'label': 'Компания',
        'editable': true,
        'required': true,
        'sortable': true,
      },
      {
        'key': 'post',
        'label': 'Должность',
        'editable': true,
        'required': true,
        'sortable': true,
      },
      {
        'key': 'description',
        'label': 'Описание',
        'editable': true,
        'required': false,
      },
      {
        'key': 'btn',
        'label': 'Действия',
        'sortable': false,
        'required': false,
      }
    ];
  }
  get editFields(): any {
    return [
      {
        'key': 'id',
        'label': 'ID',
        'editable': false,
        'required': true,
        'sortable': true,
      },
      {
        'key': 'first_name',
        'label': 'Имя',
        'editable': true,
        'required': true,
        'sortable': true,
      },
      {
        'key': 'last_name',
        'label': 'Фамилия',
        'editable': true,
        'required': true,
        'sortable': true,
      },
      {
        'key': 'patronymic',
        'label': 'Отчество',
        'editable': true,
        'required': false,
        'sortable': true,
      },
      {
        'key': 'email',
        'label': 'Email',
        'editable': true,
        'required': true,
        'sortable': true,
      },
      {
        'key': 'phone',
        'label': 'Телефон',
        'editable': true,
        'required': true,
        'sortable': true,
        'type': 'phone'
      },
      {
        'key': 'company',
        'label': 'Компания',
        'editable': true,
        'required': true,
        'sortable': true,
      },
      {
        'key': 'post',
        'label': 'Должность',
        'editable': true,
        'required': true,
        'sortable': true,
      },
      {
        'key': 'description',
        'label': 'Описание',
        'editable': true,
        'required': false,
        'type': 'textArea'
      },
    ];

  }

   checkError() : string {
    let errorText = 'Введите корректно следующие поля формы: ';
    let arrayErrorsText = [];
    console.log(this.errors.modal);
    for(let error in this.errors.modal){
      if(this.errors.modal[error].error){
        arrayErrorsText.push(this.errors.modal[error].text)
      }
    }
    return  arrayErrorsText.length !== 0? errorText + arrayErrorsText.join(', ') : '';
  }
  async saveContact(data: any): Promise<any> {
    const errorText = this.checkError();

    console.log(errorText)

    if(errorText){
      // @ts-ignore
      this.$bvToast.toast(errorText, {
        title: 'Введите корректные данные',
        autoHideDelay: 3000,
        variant: 'danger'
      })
    }
    else{
      try {
        const response = await this.$store.dispatch('contacts/UPDATE_CONTACT', data);
        await this.$store.dispatch('contacts/GET_CONTACTS');
        this.$store.commit('main/TOGGLE_EDIT_MODAL');
        console.log(response);
      }
      catch (error: any){
        console.log(error.response.data.errors);
        // @ts-ignore
        this.$bvToast.toast(error.message, {
          title: 'Ошибка!',
          autoHideDelay: 3000,
          variant: 'danger'
        })
      }
    }


  }
  deleteContact(data: any): void {
    console.log(data)
  }
  updatePhone(phone: string): void {
    this.$store.commit('main/SET_MODAL_PHONE', phone);
  }
  editRow(data: any): void {
    console.log(data);
    this.modalData.show = true;
    this.modalData = {...this.modalData, data: {...data.item}, fields: this.editFields};
    this.$store.commit('main/SET_EDIT_MODAL', {...this.modalData})
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
