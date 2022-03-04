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
          <fa
            v-if="btnSave"
            icon="check"
            :class="[$style.icon, $style.save]"
            @click="onSave(data)"
          />
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
    <b-modal
      v-model="modalData.show"
      :title="modalData.title"
      size="600px"
      centered
    >
      <b-container
        :class="$style.modal"
        fluid>
        <b-input-group
          class="mb-3"
        >
          <template
            #prepend>
            <b-input-group-text
              :class="$style.modalText"
            >
              <div>ФИО</div>
            </b-input-group-text>
          </template>
          <b-form-input
            v-model="modalData.last_name"
            placeholder="Фамилия"
            :state="!!modalData.last_name"
          />
          <b-form-input
            v-model="modalData.first_name"
            placeholder="Имя"

          />
          <b-form-input
            v-model="modalData.patronymic"
            placeholder="Отчество"
            :state="true"
          />
        </b-input-group>
        <b-input-group
          class="mb-3"
        >
          <template #prepend>
            <b-input-group-text
              :class="$style.modalText"
            >
              Компания
            </b-input-group-text>
          </template>
          <b-form-input
            v-model="modalData.company"
            placeholder="Компания"
            :state="!!modalData.company"
          />
        </b-input-group>
        <b-input-group
          class="mb-3"
        >
          <template #prepend>
            <b-input-group-text
              :class="$style.modalText"
            >
              Должность
            </b-input-group-text>
          </template>
          <b-form-input
            v-model="modalData.post"
            placeholder="Должность"
            :state="!!modalData.post"
          />
        </b-input-group>
        <b-input-group
          class="mb-3"
        >
          <template #prepend>
            <b-input-group-text
              :class="$style.modalText"
            >
              Телефон
            </b-input-group-text>
          </template>
          <BasePhoneInput
            :class="$style.phoneInput"
            :value="modalData.phone"
            @update="updatePhone"
          />
        </b-input-group>
        <b-input-group
          class="mb-3"
        >
          <template #prepend>
            <b-input-group-text
              :class="$style.modalText"
            >
              Комментарий
            </b-input-group-text>
          </template>
          <b-form-textarea
            v-model="modalData.description"
            placeholder="Введите описание контакта..."
            size="sm"
            rows="1"
            max-rows="3"
          />
        </b-input-group>
      </b-container>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="success"
            size="sm"
            class="float-right"
            @click="saveContact"
          >
            Сохранить
          </b-button>
          <b-button
            variant="secondary"
            size="sm"
            class="float-right mr-3"
            @click="modalData.show = false"
          >
            Закрыть
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, {mixins} from 'nuxt-class-component'
import {IBaseModalData} from "~/types/BaseTypes/BaseModalData";
import {IContactsDataTable} from "~/types/ContactsDataTable"
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

//@ts-ignore
@Component({
  components:{
    BasePhoneInput
  },
  validations: {
    modalData:{
      first_name: {
        required,
        minLength: minLength(4)
      },
      last_name: {
        required,
      },
      post: {
        required,
      },
      company: {
        required,
      },
      phone: {
        required,
      },
    }
  }

})
export default class SmartTable extends mixins(SmartTableProps, validationMixin){
  private modalData: IBaseModalData & IContactsDataTable = {
    title: 'Редактирование контакта',
    show: false,
    id: 0,
    first_name: '',
    last_name: '',
    patronymic: '',
    post: '',
    description: '',
    phone: '',
    company: ''
  };
  onSave(data: any): void{
    this.$emit('save', data)
  }
  onEdit(data: any): void {
    console.log(data);
    this.modalData.show = true;
    this.modalData = {...this.modalData,...data.item};
    console.log(this.modalData)
  }
  onDelete(data: any): void {
    this.$emit('delete', data)
  }
  updatePhone(phone: any){
    this.modalData.phone = phone.formattedNumber
    console.log(this.modalData)
  }
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
