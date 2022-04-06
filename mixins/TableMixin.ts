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
}


export default TableMixin;
