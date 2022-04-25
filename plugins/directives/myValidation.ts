import Vue from 'vue'
import {DirectiveBinding} from 'vue/types/options';

const checkEmail = (email: string) : boolean => {
  var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return regex.test(email);
}
const checkPhone = (phone: string) => {
  console.log(phone)
  let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  return regex.test(phone);
}
function inputListener(el: HTMLElement, binding: DirectiveBinding, vnode: any,){

    let error = false;
    switch (binding.value.type){
      case 'phone':
        console.log(vnode.context.$listeners);
        //@ts-ignore
        // error = !checkPhone(el.querySelector('input[type=tel]').value);
        break;
      case 'email':
        //@ts-ignore
        error = !checkEmail(el.value);
        break;
      default:
        //@ts-ignore
        if(binding.value.required && !el.value){
          error = true
        }
    }
    if(error){
      if(binding.value.type === 'phone'){
        el.classList.add('error-phone');
      }
      el.classList.add('error');
      vnode.context.$store.commit('main/SET_MODAL_ERROR', {key:binding.value.type, value:true});
    }
    else{
      el.classList.remove('error');
      vnode.context.$store.commit('main/SET_MODAL_ERROR', {key:binding.value.type, value:false});
    }

}

Vue.directive('validation', {
  bind(el: HTMLElement, binding: DirectiveBinding, vnode: any ): void{
    el.addEventListener('input', (event: Event) => {
      inputListener(el,binding,vnode);
    });
    inputListener(el,binding,vnode);

  },
  unbind(el: HTMLElement, binding: DirectiveBinding,  vnode: any) : void{
    //@ts-ignore
    el.removeEventListener('input', inputListener);
  },

})
