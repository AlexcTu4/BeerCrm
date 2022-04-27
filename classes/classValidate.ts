import {IValidate} from "~/types/validate";
import {DirectiveBinding} from "vue/types/options";

export default class Validate  {
  private items !:  IValidate
  constructor() {

  }
  touch() : void {
    for (const index in this.items){
      const item :{el: HTMLElement, binding: DirectiveBinding, vnode : any} =  this.items[index];
      this.inputListener(item.el, item.binding, item.vnode);
    }
  }
  addEntity(el: HTMLElement, binding: DirectiveBinding, vnode: any) : void {
    this.items = {...this.items, [this.uuidv4()] : {el,binding, vnode}}
  }
  inputListener(el: HTMLElement, binding: DirectiveBinding, vnode: any,){
    let error = false;
    switch (binding.value.type){
      case 'phone':

          error = !vnode.componentInstance.$data.results.isValid;
          if(error){
            el.classList.add('error-phone');
          }
          else{
            el.classList.remove('error-phone');
          }
          vnode.context.$store.commit('main/SET_MODAL_ERROR', {key:binding.value.type, value:error});

        break;
      case 'email':
        //@ts-ignore
        error = !this.checkEmail(el.value);
        break;
      default:
        //@ts-ignore
        if(binding.value.required && !el.value){
          error = true
        }
    }
    if(error && binding.value.type !== 'phone'){
      el.classList.add('error');
    }
    else{
      el.classList.remove('error');
    }
    if(binding.value.type !== 'phone'){
      vnode.context.$store.commit('main/SET_MODAL_ERROR', {key:binding.value.type, value:error});
    }


  }
  checkEmail(email: string) : boolean  {
    var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return regex.test(email);
  }
  uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
}

