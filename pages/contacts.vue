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
      <BaseSpinner
        :active="load"
      />
      <div
        v-if="mediaQuery === 'lg'"
      >
        <SmartTable
          :columns="columns"
          :data="contacts"
          :btnDelete="true"
          :btnSave="true"
          :btnEdit="true"
          @delete="deleteContact"
          @editRow="editRow"
          @add="addContact"
          @search="onSearchContact"
          @pagination="onPagination"
          :idModal="idModal"
        />
      </div>
      <div
        v-else
      >
        <BaseCards
          @add="addContact"
          @delete="deleteContact"
          @editRow="editRow"
          @search="onSearchContact"
          @pagination="onPagination"
          :data="contacts"
          :idModal="idModal"
        />
      </div>
      <BaseEditModal
        :id="idModal"
        @save="saveContact"
        @updatePhone="updatePhone"
      />

    </div>


  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, {mixins} from 'nuxt-class-component'
import {getModule} from "vuex-module-decorators";
import contacts from "~/store/contacts";
import { mapState, mapGetters} from 'vuex';
import SmartTable from '~/components/BaseComponents/SmartTable.vue';
import BaseEditModal from '~/components/BaseComponents/BaseEditModal.vue';
import {IContacts} from "~/types/IEntity/ContactsDataTable";
import {IColumnTable} from "~/types/BaseTypes/ColumnTable";
import {IBaseModalData} from "~/types/BaseTypes/BaseModalData";
import {BaseErrors} from "~/types/BaseTypes/mainErrors";
import BaseCards from "~/components/BaseComponents/BaseCards.vue";
import PageMixin from "~/mixins/PageMixin";

@Component({
  layout: 'main',
  components:{
    BaseCards,
    SmartTable,
    BaseEditModal
  },
  computed: {
    ...mapState('contacts', [
      'contacts',
    ]),
    ...mapState('main', [
      'errors',
      'mediaQuery'
    ]),
    ...mapGetters('main', [
      'modalErrorText'
    ])
  }
})

export default class Contacts extends mixins(PageMixin){
  private contacts!: IContacts;
  private errors!: BaseErrors;
  private mediaQuery!: string;
  private modalErrorText!: string;
  private load : boolean = true;
  private searchStringLenght = 3;
  private idModal: string = 'contacts'
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

  get addFields(): any {
    return [
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
  async mounted(): Promise<any>{
    getModule(contacts, this.$store);
    this.load = true;
    try{
      await this.$store.dispatch('contacts/GET_CONTACTS', {page : this.contacts.current_page});
    }
    catch (error: any) {
      this.$bvToast.toast(error.message, {
        title: 'Ошибка!',
        autoHideDelay: 3000,
        variant: 'danger'
      })
    }
    this.load = false;
  }
  async saveContact(data: any): Promise<any> {

    if(this.modalErrorText){
      this.$bvToast.toast(this.modalErrorText, {
        title: 'Введите корректные данные',
        autoHideDelay: 3000,
        variant: 'danger'
      })
    }
    else{
      try {
        let response = [];
        if(data.id){
          response = await this.$store.dispatch('contacts/UPDATE_CONTACT', data);
        }else{
          response = await this.$store.dispatch('contacts/ADD_CONTACT', data);
        }
        await this.$store.dispatch('contacts/GET_CONTACTS', {page : this.contacts.current_page});
        // this.$store.commit('main/TOGGLE_EDIT_MODAL');
        if(response.data.id){
          this.$bvModal.hide(this.idModal);
          this.$bvToast.toast(['Контакт', data.last_name, data.first_name, data.patronymic, 'сохранен'].join(' '), {
            title: 'Контакт сохранен',
            autoHideDelay: 3000,
            variant: 'success'
          })
        }
      }
      catch (error: any){
        this.$bvToast.toast(error.message, {
          title: 'Ошибка!',
          autoHideDelay: 3000,
          variant: 'danger'
        })
      }
    }


  }
  async deleteContact(data: any): Promise<any> {
    this.load = true;

    try{
      const response = await this.$store.dispatch('contacts/DELETE_CONTACT', data.id);
      if(response.data.result){
        await this.$store.dispatch('contacts/GET_CONTACTS', {page : this.contacts.current_page});
        this.$bvToast.toast(['Контакт', data.last_name, data.first_name, data.patronymic, 'удален'].join(' '), {
          title: 'Контакт удален',
          autoHideDelay: 3000,
          variant: 'success'
        })
      }

    }
    catch (error: any){
      this.$bvToast.toast(error.message, {
        title: 'Ошибка!',
        autoHideDelay: 3000,
        variant: 'danger'
      })
    }
    this.load = false;
  }
  addContact(): void {
    try{
      this.modalData.show = true;
      this.modalData = {...this.modalData,data: {
          company: "",
          description: "",
          email: "",
          first_name: "",
          last_name: "",
          patronymic: "",
          phone: "",
          post: ""},
        fields: this.addFields};
      this.$store.commit('main/SET_EDIT_MODAL', {...this.modalData})
    }
    catch (error: any){
      this.$bvToast.toast(error.message, {
        title: 'Ошибка!',
        autoHideDelay: 3000,
        variant: 'danger'
      })
    }

  }

  editRow(data: any): void {
    this.modalData.show = true;
    this.modalData = {...this.modalData, data: {...data}, fields: this.editFields};
    this.$store.commit('main/SET_EDIT_MODAL', {...this.modalData})
  }
  updatePhone(phone: string): void {
    this.$store.commit('main/SET_MODAL_PHONE', phone);
  }
  async onSearchContact(value: string | boolean) : Promise<any> {
    this.load = true;
    try {
      if(value){
        await this.$store.dispatch('contacts/SEARCH_CONTACTS', value);
      }
      else{
        await this.$store.dispatch('contacts/GET_CONTACTS', {page : value});
      }
    }
    catch (error: any){
      this.$bvToast.toast(error.message, {
        title: 'Ошибка!',
        autoHideDelay: 3000,
        variant: 'danger'
      })
    }
    this.load = false;
  }
  async onPagination(value: string) : Promise<any> {
    this.load = true;
    try {
      await this.$store.dispatch('contacts/GET_CONTACTS', {page : value});
    }
    catch (error : any){

    }
    this.load = false;

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
    margin-top: -7vw;
    border-radius: 10px;
    position: relative;
    .table{

    }
  }

  .cardsWrap{
    background: #fff;
    margin-top: -7vw;
    border-radius: 10px;
  }

}
</style>
