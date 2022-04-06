<template>
  <div :class="$style.BaseTableFooter"
  >
      <b-pagination
        align="center"
        :value="data.current_page"
        :total-rows="data.total"
        :per-page="data.per_page"
        @input="onPageInput"
      />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import TableMixin from "~/mixins/TableMixin";


const BaseTableFooterProps = Vue.extend({
  props:{
    data: {
      type: Object,
      required: true
    },
  }
})
@Component({

})
export default class BaseTableFooter extends mixins(BaseTableFooterProps, TableMixin){
  private searchString : string = '';

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
