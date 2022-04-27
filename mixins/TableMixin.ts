import Vue from 'vue'
import Component from 'vue-class-component'


@Component
export class TableMixin extends Vue {
  onPageInput(value: string) : void {
    this.$emit('pagination', value);
  }
  onSearch(value: string) : void {
    this.$emit('search', value);
  }
  onAdd(): void {
    this.$emit('add')
  }
  onEdit(data: any): void {
    this.$emit('editRow', data);
  }
  onDelete(data: any): void {
    this.$emit('delete', data)
  }
}


export default TableMixin;
