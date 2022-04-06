
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import {AxiosRequestConfig} from "axios";
import {IContacts, IContactsDataTable} from "~/types/IEntity/ContactsDataTable";
@Module({
  name: 'contacts',
  stateFactory: true,
  namespaced: true,
})



export default class ContactsModule extends VuexModule {

  contacts: IContacts = {
    data: null,
    current_page: 1,
    last_page: 0,
    per_page: 10,
    total: 0
  };

  @Mutation
  setContacts(contacts: IContacts): void {
    this.contacts = {
      ...contacts
    }

  }

  @Action({ rawError: true })
  async GET_CONTACTS(data : string | null): Promise<any> {
    //@ts-ignore
    const response = await this.store.$CONTACTS({
      method: 'GET',
      params: data
    });
    console.log(response)
    if(response.data){
      this.setContacts(response.data);
      console.log(this.contacts)
      return Promise.resolve(response);
    }
    else{
      Promise.reject(response);
    }
  }
  @Action({ rawError: true })
  async SEARCH_CONTACTS(data : string | null): Promise<any> {
    console.log(this);
    //@ts-ignore
    const response = await this.store.$CONTACTS({
      url: '/'+data,
      method: 'GET',

    });
    console.log(response)
    if(response.data){
      this.setContacts(response.data);
      console.log(this.contacts)
      return Promise.resolve(response);
    }
    else{
      Promise.reject(response);
    }
  }
  @Action({rawError: true})
  async UPDATE_CONTACT(payload: IContactsDataTable): Promise<any> {
    try {
      //@ts-ignore
      const response = await this.store.$CONTACTS({
        url: '/'+payload.id,
        method: 'PUT',
        data: payload
      });
      return Promise.resolve(response);
    }
    catch (error: any){
      return Promise.reject(error);
    }

  }
  @Action({rawError: true})
  async ADD_CONTACT(payload: IContactsDataTable): Promise<any> {
    try {
      //@ts-ignore
      const response = await this.store.$CONTACTS({
        url: '/',
        method: 'POST',
        data: payload
      });
      return Promise.resolve(response);
    }
    catch (error: any){
      return Promise.reject(error);
    }

  }

  @Action({rawError: true})
  async DELETE_CONTACT(id: string): Promise<any> {
    try {
      //@ts-ignore
      const response = await this.store.$CONTACTS({
        url: '/'+id,
        method: 'DELETE',
        data: {id : id}
      });
      return Promise.resolve(response);
    }
    catch (error: any){
      return Promise.reject(error);
    }

  }


}
