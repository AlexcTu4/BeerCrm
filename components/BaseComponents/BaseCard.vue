<template>
  <div :class="$style.BaseCard"
  >
      <b-card
        :class="$style.card"
      >
        <div
          :class="$style.cardBtn"
        >
            <fa
              icon="pen"
              :class="[$style.icon, $style.edit]"
              @click="onEdit(data)"
              v-b-modal="idModal"
            />
            <fa
              icon="times"
              :class="[$style.icon, $style.delete]"
              @click="onDelete(data)"
            />
        </div>

        <b-card-text>
          <a :href="'tel:'+data.phone">{{data.phone}}</a>
          <br>
          {{ FIO }}
          <br>
          <span :class="$style.cardCompany">{{ data.post + ' ' + data.company }}</span>
        </b-card-text>
      </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, {mixins} from 'nuxt-class-component'
import TableMixin from "~/mixins/TableMixin";


const BaseCardsProps = Vue.extend({
  props:{
    data: {
      type: Object,
      required: true
    },
    idModal:{
      type: String
    }
  }
})
@Component({
  components:{

  },
})
export default class BaseCards extends mixins(BaseCardsProps, TableMixin){
  get FIO() : string{
    return [this.data.last_name, this.data.first_name, this.data.patronymic].join(' ');
  }
}
</script>
<style lang="scss" module>
.BaseCard{
  //border: 1px solid #838383;
  .card{
    height: 100%;
    position: relative;
    .cardBtn{
      position: absolute;
      top: 10px;
      right: 10px;
      .icon{
        cursor: pointer;
        &.save{
          color: #86ce00;
        }
        &.edit{
          color: #5581E0;
          margin-right: 5px;
        }
        &.delete{
          color: #ef3737;
        }
      }
    }
    .cardCompany{
      font-weight: bold;
    }


  }
}
</style>
<style scoped>
  .card-body{
    padding: 10px!important;
    font-size: 14px!important;
  }
</style>
