<template>
  <div :class="$style.BaseEditModal">
    <b-modal
      :id="id"
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
          :class="[mediaQuery === 'xs'? 'mb-2' : 'mb-3']"
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
            :name="field.key"
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
import Vue from 'vue'
import Component, {mixins} from 'nuxt-class-component'
import {IBaseModalData} from "~/types/BaseTypes/BaseModalData";
import {mapState} from "vuex";
import {getModule} from "vuex-module-decorators";
import main from "~/store/main";
import contacts from "~/store/contacts";
import {BaseErrors} from "~/types/BaseTypes/mainErrors";

const BaseEditModalProps = Vue.extend({

  props:{
    id:{
      type: String
    }
  }
})
@Component({
  computed: {
    ...mapState('main', [
      'modalData',
      'mediaQuery',
      'errors'
    ])
  }
})
export default class SmartTable extends mixins(BaseEditModalProps){
  private modalData!: IBaseModalData;
  private mediaQuery !: string;
  private errors !:BaseErrors;
  updatePhone(phone: any){
    this.$emit('updatePhone', phone.formattedNumber);
  }
  saveContact(): void {
    this.$Validate.touch();
    this.$emit('save', this.modalData.data);
  }
  closeModal(): void{

    this.$bvModal.hide(this.id);
    setTimeout(()=>{
      this.$store.commit('main/CLEAR_EDIT_MODAL');
    }, 200)
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
@import "assets/style/media";

.BaseEditModal{
  width: 100%;
}
.modalText{
  width: 110px;
  justify-content: center;
  @include xs {
    width: 80px;
    font-size: 12px;
  }
}
.phoneInput{
  width: calc(100% - 109px);
  @include xs {
    width: calc(100% - 79px);
  }
}
.requiredField{
  color: #ef3737;
}
</style>

