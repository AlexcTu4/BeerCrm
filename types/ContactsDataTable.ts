interface IContactsDataTable {
  id: number,
  first_name: string,
  last_name: string,
  patronymic?: string,
  phone: string,
  post: string,
  description: string
}
interface IContactsColumnNamesTable {
  [index: string]: string;
}
export interface IContacts {
  data: IContactsDataTable[] | null,
  info: IContactsColumnNamesTable | null
}

