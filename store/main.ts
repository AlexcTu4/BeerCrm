
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import {IBaseModalData} from "~/types/BaseTypes/BaseModalData";
import {BaseErrors} from "~/types/BaseTypes/mainErrors";
import {errorsInfo} from "~/constants/errorsInfo"
import Vue from 'vue'
@Module({
  name: 'main',
  stateFactory: true,
  namespaced: true,
})



export default class MainModule extends VuexModule {
  private mediaQuery : string = '';
  private sideBarActive : boolean = false;
  links: ILink[] = [
    {
      name: 'index',
      icon: 'home',
      title: 'Главная',
    },
    {
      name: 'production',
      icon: 'tractor',
      title: 'Производство',
    },
    {
      name: 'recipes',
      icon: 'book',
      title: 'Рецепты',
    },
    {
      name: 'purchases',
      icon: 'shopping-cart',
      title: 'Закупки',
    },
    {
      name: 'groups',
      icon: 'boxes',
      title: 'Группы товаров',
    },
    {
      name: 'contacts',
      icon: 'users',
      title: 'Контакты',
    },
  ]
  private modalData: IBaseModalData  = {
    title: '',
    show: false,
    data: null,
    fields: null
  };
  private errors: BaseErrors = {
    modal: errorsInfo
  }

  @Mutation
  TOGGLE_SIDE_BAR() : void {
    this.sideBarActive = !this.sideBarActive;
    console.log(this.sideBarActive);
  }
  @Mutation
  SET_SIDE_BAR(value : boolean) : void {
    this.sideBarActive = value;
  }
  @Mutation
  SET_MEDIA( width: number): void {
    console.log('media')
    if (width <= 767) {
      this.mediaQuery = 'xs';
    } else if (width >= 768 && width <= 1400 ) {
      this.mediaQuery = 'md';
    } else if (width > 1401) {
      this.mediaQuery = 'lg';
    }
  }

  @Mutation
  SET_MODAL_ERROR(payload: {key: string, value: boolean}): void {
    // Для глубокого отслеживания необходимо использовать vue.set
    // p.s Не уверен, что так правильно делать.
    Vue.set(this.errors.modal[payload.key],'error',payload.value);
  }

  @Mutation
  TOGGLE_EDIT_MODAL(): void {
    this.modalData.show = !this.modalData.show;
  }

  @Mutation
  SET_MODAL_PHONE(value: string): void {
    console.log(value);
    if(this.modalData.data){
      Vue.set(this.modalData.data,'phone',value);
    }
    console.log(this.modalData)
  }
  @Mutation
  SET_MODAL_DATA(payload: {value : any, field: string}): void {
    if(this.modalData.data){
      Vue.set(this.modalData.data,payload.field,payload.value);
    }

    console.log(this.modalData.data)
  }

  @Mutation
  SET_EDIT_MODAL(payload: IBaseModalData): void {
    console.log(payload)
    this.modalData = payload;
  }

  @Mutation
  CLEAR_EDIT_MODAL(): void {
    this.modalData = {
      title: '',
      show: false,
      data: null,
      fields: null
    }
    console.log(this.modalData);
  }



  get modalErrorText(): string {
    let errorText = 'Введите корректно следующие поля формы: ';
    let arrayErrorsText = [];
    for(let error in this.errors.modal){
      if(this.errors.modal[error].error){
        arrayErrorsText.push(this.errors.modal[error].text)
      }
    }
    return arrayErrorsText.length !==0 ? errorText + arrayErrorsText.join(', ') : '';
  }
}
