import Vue from 'vue'

const mixin = Vue.extend({
  mounted() : void {
    this.$store.commit('main/SET_MEDIA', window.innerWidth)
  },
})
export default mixin;
