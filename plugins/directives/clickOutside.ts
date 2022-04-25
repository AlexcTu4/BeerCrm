import Vue from 'vue'
import {DirectiveBinding} from 'vue/types/options';




Vue.directive('click-outside', {
  bind: function (el: HTMLElement, binding: DirectiveBinding, vnode) {


    //@ts-ignore
    el.clickOutsideEvent = (event : Event) => {
      const toggleMenuEl = document.getElementById('toggleMenu');
      //@ts-ignore
      if (!vnode.context.$store.state.main.sideBarActive && (toggleMenuEl == event.target || toggleMenuEl?.contains(event.target))){
        binding.value(true);
      }
      //@ts-ignore
      else if ( !vnode.context.$store.state.main.sideBarActive || !(el == event.target || el.contains(event.target)) ) {
        //@ts-ignore
        binding.value(false);
      }


    };
    //@ts-ignore
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    //@ts-ignore
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});
