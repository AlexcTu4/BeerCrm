import {DirectiveBinding} from "vue/types/options";

export interface IValidate {
  [index: string]: {
    el : HTMLElement
    binding : DirectiveBinding
    vnode : any
  }
}
