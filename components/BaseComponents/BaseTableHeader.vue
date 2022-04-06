<template>
  <div :class="$style.BaseTableHeader"
  >
    <div
      :class="$style.searchInputWrap"
    >
      <b-form-input
        :class="$style.searchInput"
        v-model="searchString"
        placeholder="Поиск..."
        @input="onSearchInput"
      />
      <div
        :class="$style.iconWrap"
      >
        <fa
          :class="$style.icon"
          icon="search"
          @click="onSearchString"
        />
      </div>

    </div>
    <div
      :class="$style.btnTable"
    >
      <b-button
        variant="success"
        size="sm"
        @click="onAdd"
      >
        <fa
          icon="plus"
        />
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, {mixins} from 'nuxt-class-component'
import TableMixin from "~/mixins/TableMixin";


const BaseTableHeaderProps = Vue.extend({

})
@Component({

})
export default class BaseTableHeader extends mixins(BaseTableHeaderProps, TableMixin){
  private searchString : string = '';

  onSearchInput( value : string) : void {
    if (!value) {
      this.$emit('search', false);
    }
  }
  onSearchString() : void {
    this.$emit('search', this.searchString);
  }
}
</script>
<style lang="scss" module>

.BaseTableHeader{
  display: flex;
  justify-content: space-between;
  .searchInputWrap{
    position: relative;
    max-width: 300px;
    margin-bottom: 20px;
    .searchInput{

    }
    .iconWrap{
      margin: auto;
      position: absolute;
      height: 50%;
      top: 0;  bottom: 0; right: 10px;
      cursor: pointer;
    }

  }
  .btnTable{

  }
}

</style>
