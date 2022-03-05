<template>
  <div :class="$style.BaseEditModal">
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
          v-for="field in modalData.fields"
          :key="field.key"
          class="mb-3"
        >

          <template
            #prepend>
            <b-input-group-text
              :class="$style.modalText"
            >
              <div>{{ field.label }}</div>
            </b-input-group-text>
          </template>

          <BasePhoneInput
            v-if="field.key === 'phone'"
            :class="$style.phoneInput"
            :value="modalData.data[field.key]"
            @update="updatePhone"
          />
          <b-form-input
            v-else
            :value="modalData.data[field.key]"
            @change="change($event,field.key)"
            :placeholder="field.label"
          />
        </b-input-group>


<!--        <b-input-group-->
<!--          class="mb-3"-->
<!--        >-->
<!--          <template-->
<!--            #prepend>-->
<!--            <b-input-group-text-->
<!--              :class="$style.modalText"-->
<!--            >-->
<!--              <div>ФИО</div>-->
<!--            </b-input-group-text>-->
<!--          </template>-->
<!--          <b-form-input-->
<!--            v-model="modalData.data?.last_name"-->
<!--            placeholder="Фамилия"-->
<!--            :state="!!modalData.data?.last_name"-->
<!--          />-->
<!--          <b-form-input-->
<!--            v-model="modalData.data?.first_name"-->
<!--            placeholder="Имя"-->

<!--          />-->
<!--          <b-form-input-->
<!--            v-model="modalData.data.patronymic"-->
<!--            placeholder="Отчество"-->
<!--            :state="true"-->
<!--          />-->
<!--        </b-input-group>-->
<!--        <b-input-group-->
<!--          class="mb-3"-->
<!--        >-->
<!--          <template #prepend>-->
<!--            <b-input-group-text-->
<!--              :class="$style.modalText"-->
<!--            >-->
<!--              Компания-->
<!--            </b-input-group-text>-->
<!--          </template>-->
<!--          <b-form-input-->
<!--            v-model="modalData.company"-->
<!--            placeholder="Компания"-->
<!--            :state="!!modalData.company"-->
<!--          />-->
<!--        </b-input-group>-->
<!--        <b-input-group-->
<!--          class="mb-3"-->
<!--        >-->
<!--          <template #prepend>-->
<!--            <b-input-group-text-->
<!--              :class="$style.modalText"-->
<!--            >-->
<!--              Должность-->
<!--            </b-input-group-text>-->
<!--          </template>-->
<!--          <b-form-input-->
<!--            v-model="modalData.post"-->
<!--            placeholder="Должность"-->
<!--            :state="!!modalData.post"-->
<!--          />-->
<!--        </b-input-group>-->
<!--        <b-input-group-->
<!--          class="mb-3"-->
<!--        >-->
<!--          <template #prepend>-->
<!--            <b-input-group-text-->
<!--              :class="$style.modalText"-->
<!--            >-->
<!--              Телефон-->
<!--            </b-input-group-text>-->
<!--          </template>-->
<!--          <BasePhoneInput-->
<!--            :class="$style.phoneInput"-->
<!--            :value="modalData.phone"-->
<!--            @update="updatePhone"-->
<!--          />-->
<!--        </b-input-group>-->
<!--        <b-input-group-->
<!--          class="mb-3"-->
<!--        >-->
<!--          <template #prepend>-->
<!--            <b-input-group-text-->
<!--              :class="$style.modalText"-->
<!--            >-->
<!--              Комментарий-->
<!--            </b-input-group-text>-->
<!--          </template>-->
<!--          <b-form-textarea-->
<!--            v-model="modalData.description"-->
<!--            placeholder="Введите описание контакта..."-->
<!--            size="sm"-->
<!--            rows="1"-->
<!--            max-rows="3"-->
<!--          />-->
<!--        </b-input-group>-->
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
            @click="closeModal"
          >
            Закрыть
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Component, {mixins} from 'nuxt-class-component'
import {IBaseModalData} from "~/types/BaseTypes/BaseModalData";
import {IContactsDataTable} from "~/types/IEntity/ContactsDataTable"
import BasePhoneInput from "~/components/BaseComponents/BasePhoneInput.vue"
const BaseEditModalProps = Vue.extend({

})
import { required, minLength, between } from 'vuelidate/lib/validators'
//@ts-ignore
import { validationMixin } from 'vuelidate'
import {mapState} from "vuex";
import {getModule} from "vuex-module-decorators";
import main from "~/store/main";
import contacts from "~/store/contacts";

//@ts-ignore
@Component({
  computed: {
    ...mapState('main', [
      'modalData',
    ])
  }
})
export default class SmartTable extends mixins(BaseEditModalProps, validationMixin){
  private modalData!: IBaseModalData;
  updatePhone(phone: any){
    this.$store.commit('main/SET_MODAL_PHONE', phone.formattedNumber);
  }
  saveContact(): void {
    this.$store.dispatch('contacts/UPDATE_CONTACT', this.modalData.data);
  }
  closeModal(): void{
    this.$store.commit('main/TOGGLE_EDIT_MODAL');
    this.$store.commit('main/CLEAR_EDIT_MODAL');
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
  change(value : any, field: any): void {
    this.$store.commit('main/SET_MODAL_DATA', {field: field, value: value})
  }
  mounted(): void{
    getModule(main, this.$store);
    getModule(contacts, this.$store);
    console.log(this.modalData);
  }

}
</script>
<style lang="scss" module>
.BaseEditModal{
  width: 100%;
}
.modalText{
  width: 110px;
  justify-content: center;
}
.phoneInput{
  width: calc(100% - 109px);
}
</style>
