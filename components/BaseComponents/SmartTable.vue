<template>
  <div :class="$style.smartTable">
    <table>
      <thead>
        <tr>
          <td
            v-for="column in columns"
            :key="column.name"
          >
            {{ column.name }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="index"
        >
          <td
            v-for="(item,indexItem) in columns"
            :key="indexItem"
          >
            {{ row[item.entity] }}
          </td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'



@Component({
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: false
    }
  }
})
export default class SmartTable extends Vue{

}
</script>
<style lang="scss" module>
.smartTable{

}
</style>
