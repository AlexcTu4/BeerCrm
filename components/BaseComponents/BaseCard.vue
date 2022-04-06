<template>
  <div :class="$style.BaseCard"
  >
      <b-card
        :class="$style.card"
        :title="data.first_name + ' ' + data.last_name"
      >

      </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, {mixins} from 'nuxt-class-component'


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

  },
})
export default class BaseCards extends mixins(BaseCardsProps){

}
</script>
<style lang="scss" module>
.BaseCard{
  //border: 1px solid #838383;
  .card{
    height: 100%;

  }
}
</style>
<style scoped>
  .card-body{
    padding: 10px!important;
  }
</style>
