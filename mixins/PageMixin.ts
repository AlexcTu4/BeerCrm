import Vue from 'vue'

const mixin = Vue.extend({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit('main/SET_SIDE_BAR', false)
    })
  }
})
export default mixin;
