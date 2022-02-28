import Vue from 'vue'
import $axios from "@nuxtjs/axios"

declare module 'vue/types/vue' {
  interface Vue {
    $CRM: $axios,
    $CONTACTS: $axios
  }
}
