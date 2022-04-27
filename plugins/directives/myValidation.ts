import Vue from 'vue'
import {DirectiveBinding} from 'vue/types/options';
import classValidate from '~/classes/classValidate'






export default ({app} : any, inject : any) => {

  const ValidateInstance = new classValidate();
  Vue.directive('validation', {
    inserted(el: HTMLElement, binding: DirectiveBinding, vnode: any): void {
      ValidateInstance.addEntity(el,binding,vnode);
    },
    bind(el: HTMLElement, binding: DirectiveBinding, vnode: any ): void{
      el.addEventListener('input', (event: Event) => {
        ValidateInstance.inputListener(el,binding,vnode);
      });
    },
    unbind(el: HTMLElement, binding: DirectiveBinding,  vnode: any) : void{
      console.log(binding,vnode);
      //@ts-ignore
      el.removeEventListener('input', ValidateInstance.inputListener);
    },

  })
  // Inject to context as $api
  inject('Validate', ValidateInstance)
}

