<template>
  <div :class="$style.main">
    <div
      :class="$style.canvasWrap"
    >
      <canvas-image/>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, {mixins} from 'nuxt-class-component'
import PageMixin from "~/mixins/PageMixin";
import CanvasImage from "~/components/imagePicker/canvasImage.vue";
@Component({
  layout: 'main',
  components:{
    CanvasImage
  }
})

export default class Groups extends mixins(PageMixin){
  mounted():void{

  }
}

</script>
<style lang="scss" module>
.main{
  z-index: 1000;
  .canvasWrap{
    padding: 20px;
    background: #fff;
    margin-top: -7vw;
    border-radius: 10px;
    position: relative;
  }
}
</style>
