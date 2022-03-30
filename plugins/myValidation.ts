import Vue from 'vue'
import {DirectiveBinding} from 'vue/types/options';

const checkEmail = (email: string) : boolean => {
  var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return regex.test(email);
}

Vue.directive('validation', {
  bind(el: HTMLElement, binding: DirectiveBinding, vnode: any ): void{
    console.log(vnode);
    const store = vnode.context.$store;
    el.addEventListener('input', (event: Event) =>{
      const target = event.target as HTMLInputElement;
      let error = false;
      switch (binding.value.type){
        case 'phone':
          console.log('phone');
          break;
        case 'email':
          error = !checkEmail(target.value);
          break;
        default:
          if(binding.value.required && !target.value){
            error = true
          }
      }
      if(error){
        target.classList.add('error');
        store.commit('main/SET_MODAL_ERROR', {key:binding.value.type, value:true});
      }
      else{
        target.classList.remove('error');
        store.commit('main/SET_MODAL_ERROR', {key:binding.value.type, value:false});
      }

    })
  },
  unbind(el: HTMLElement, binding: DirectiveBinding) : void{
    console.log(el, binding)
  },

})
