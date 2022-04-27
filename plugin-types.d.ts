import Vue from 'vue'
import $axios from "@nuxtjs/axios"

declare module 'vue/types/vue' {
  interface Vue {
    $CRM: $axios,
    $CONTACTS: $axios,
    $Validate: any,
    $bvToast: any,
    $bvModal: any
  }
}
declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}
