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
              <div>
                {{ field.label }}
                <span
                  v-if="field.required"
                  :class="$style.requiredField">
                  *
                </span>
              </div>
            </b-input-group-text>
          </template>

          <BasePhoneInput
            v-if="field.type === 'phone'"
            v-validation="{type: 'phone', required: true}"
            :class="$style.phoneInput"
            :value="modalData.data[field.key]"
            @update="updatePhone"
          />

          <b-form-textarea
            id="textarea"
            v-else-if="field.type === 'textArea'"
            :value="modalData.data[field.key]"
            placeholder="Описание..."
            rows="1"
            max-rows="4"
            @change="change($event,field.key)"
          ></b-form-textarea>

          <b-form-input
            v-else
            :readonly="!field.editable"
            :value="modalData.data[field.key]"
            v-validation="{type: field.key, required: field.required}"
            @change="change($event,field.key)"
            :placeholder="field.label"

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
export default class SmartTable extends mixins(BaseEditModalProps){
  private modalData!: IBaseModalData;
  updatePhone(phone: any){
    this.$emit('updatePhone', phone.formattedNumber);
  }
  saveContact(): void {
    this.$emit('save', this.modalData.data);
  }
  closeModal(): void{
    this.$store.commit('main/TOGGLE_EDIT_MODAL');
    this.$store.commit('main/CLEAR_EDIT_MODAL');
  }

  change(value : any, field: any): void {
    this.$store.commit('main/SET_MODAL_DATA', {field: field, value: value})
  }
  mounted(): void{
    getModule(main, this.$store);
    getModule(contacts, this.$store);
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
.requiredField{
  color: #ef3737;
}
</style>
