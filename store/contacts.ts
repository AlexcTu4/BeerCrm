
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import {AxiosRequestConfig} from "axios";
import {IContacts} from "~/types/ContactsDataTable";
@Module({
  name: 'contacts',
  stateFactory: true,
  namespaced: true,
})



export default class ContactsModule extends VuexModule {

  contacts: IContacts = {data: null, info:null};

  @Mutation
  setContacts(contacts: any): void {
    this.contacts = contacts;
  }

  @Action({ rawError: true })
  async getContacts(): Promise<any> {
    console.log(this);
    //@ts-ignore
    const response = await this.store.$CONTACTS({
      method: 'GET'
    });
    if(response.data){
      this.setContacts(response.data);
    }
  }


}
