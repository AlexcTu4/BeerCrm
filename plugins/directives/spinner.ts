import Vue from 'vue'
import {DirectiveBinding} from 'vue/types/options';


Vue.directive('spinner', {
  bind(el: HTMLElement, binding: DirectiveBinding, vnode: any) : void{

    el.classList.add('spinner');
    if(binding.value){
      el.parentElement?.classList.add('spinnerWrap');
      el.parentElement?.parentElement?.classList.add('spinnerParent');
      el.classList.add('active');
    }
    else{
      el.parentElement?.classList.remove('spinnerWrap');
      el.parentElement?.parentElement?.classList.remove('spinnerParent');
      el.classList.remove('active');
    }
  },
  update(el: HTMLElement, binding: DirectiveBinding, vnode: any) : void {
    if(binding.value){
      el.parentElement?.classList.add('spinnerWrap');
      el.parentElement?.parentElement?.classList.add('spinnerParent');
      el.classList.add('active');
    }
    else{
      el.parentElement?.classList.remove('spinnerWrap');
      el.parentElement?.parentElement?.classList.remove('spinnerParent');
      el.classList.remove('active');
    }  }
})
