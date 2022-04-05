import {IColumnTable} from "~/types/BaseTypes/ColumnTable";

export interface IContactsDataTable {
  id?: number,
  first_name: string,
  last_name: string,
  email: string,
  patronymic?: string,
  company: string,
  phone: string,
  post: string,
  description: string
}
export interface IContactsColumnNamesTable {
  [index: string]: string;
}
export interface IContacts {
  data: IContactsDataTable[] | null,
  current_page: number,
  last_page: number,
  per_page: number,
  total: number
}

