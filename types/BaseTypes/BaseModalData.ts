import {IContactsDataTable} from "~/types/IEntity/ContactsDataTable";
import {IColumnTable} from "~/types/BaseTypes/ColumnTable";

export interface IBaseModalData{
  title?: string,
  show: boolean,
  data: null | IContactsDataTable,
  fields: null | IColumnTable
}
