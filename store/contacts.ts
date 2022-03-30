
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import {AxiosRequestConfig} from "axios";
import {IContacts, IContactsDataTable} from "~/types/IEntity/ContactsDataTable";
@Module({
  name: 'contacts',
  stateFactory: true,
  namespaced: true,
})



export default class ContactsModule extends VuexModule {

  contacts: IContacts = {data: null};

  @Mutation
  setContacts(contacts: any): void {
    this.contacts.data = contacts;
  }

  @Action({ rawError: true })
  async GET_CONTACTS(): Promise<any> {
    console.log(this);
    //@ts-ignore
    const response = await this.store.$CONTACTS({
      method: 'GET'
    });
    console.log(response)
    if(response.data){
      console.log(response.data)
      this.setContacts(response.data);
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


}
