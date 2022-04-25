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
      :class="$style.btnTableWrap"
    >
      <b-button
        :class="$style.btnTable"
        variant="success"
        size="sm"
        @click="onAdd"
        v-b-modal="idModal"
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
  props:{
    idModal:{
      type: String
    }
  }
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
  padding-bottom: 20px;
  .searchInputWrap{
    position: relative;
    max-width: 300px;
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
  .btnTableWrap{
    margin: auto 0;
    .btnTable{

      width: 36px;
      height: 36px;
    }
  }

}

</style>
