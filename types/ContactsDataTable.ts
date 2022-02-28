export interface ContactsDataTable {
  id: number,
  first_name: string,
  last_name: string,
  patronymic?: string,
  phone: string,
  post: string,
  description: string
}
export interface ContactsColumnNamesTable {
  entity: string,
  name: string
}

