
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import {IBaseModalData} from "~/types/BaseTypes/BaseModalData";
@Module({
  name: 'main',
  stateFactory: true,
  namespaced: true,
})



export default class MainModule extends VuexModule {
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
  @Mutation
  TOGGLE_EDIT_MODAL(): void {
    this.modalData.show = !this.modalData.show;
  }

  @Mutation
  SET_MODAL_PHONE(value: string): void {
    console.log(value);
    if(this.modalData.data){
      this.modalData.data.phone = value;
    }
    console.log(this.modalData)
  }
  @Mutation
  SET_MODAL_DATA(payload: {value : any, field: string}): void {
    if(this.modalData.data){
      //@ts-ignore
      this.modalData.data[payload.field] = payload.value;
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


  @Action({ rawError: true })
  getContacts(): void {
    console.log('111111111');
  }
}
