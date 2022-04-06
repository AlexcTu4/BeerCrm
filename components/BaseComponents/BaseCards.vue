<template>
  <div :class="$style.BaseCards"
  >
    <BaseTableHeader
      @add="onAdd"
      @search="onSearch"
    />
    <div
      :class="$style.wrapCards"
    >
      <BaseCard
        v-for="card in data.data"
        :key="card.id"
        :data="card"
      />
    </div>
    <BaseTableFooter
      :data="data"
      @pagination="onPageInput"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, {mixins} from 'nuxt-class-component'
import BaseTableHeader from "~/components/BaseComponents/BaseTableHeader.vue";
import BaseTableFooter from "~/components/BaseComponents/BaseTableFooter.vue";
import TableMixin from "~/mixins/TableMixin";


const BaseCardsProps = Vue.extend({
  props:{
    data: {
      type: Object,
      required: true
    },
  }
})
@Component({
  components:{
    BaseTableFooter,
    BaseTableHeader,
  },
})
export default class BaseCards extends mixins(BaseCardsProps, TableMixin){

}
</script>
<style lang="scss" module>
.BaseCards{
  .wrapCards{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
    margin-bottom: 20px;
  }
}


</style>
