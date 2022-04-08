<template>
  <div :class="$style.main">
    <div
      :class="$style.wrapImg"
    >


      <img
        :class="$style.img" src="~/assets/img/test.png"
        @mouseup="mouseUp"
        @mousemove="mouseMove"
        @mousedown="mouseDown"
      >
      <div
        v-show="block.initialX"
        :class="$style.item"
        :style="{left: block.initialX + 'px', top: block.initialY + 'px', right: 640 - block.x + 'px', bottom: 640 - block.y + 'px'}"
        @click="showPopup"
        @mousemove="mouseMove"
      >
      </div>


    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, {mixins} from 'nuxt-class-component'
import PageMixin from "~/mixins/PageMixin";

@Component({
  layout: 'main',
})

export default class Look extends mixins(PageMixin){
  active: boolean = false;
  block: any = {
    initialY: 0,
    initialX: 0,
    y: 0,
    x: 0
  }
  showPopup() : void{
    alert('aaaaaaa');
  }
  mouseDown(e: MouseEvent): void {
    e.preventDefault();
    this.active = true;
    this.block = {
      initialY: e.offsetY,
      initialX: e.offsetX,
      y: e.offsetY,
      x: e.offsetX
    }
    console.log('down',this.block,e);
  }
  mouseUp(e: MouseEvent): void {
    this.active = false;
    this.block.y = e.offsetY;
    this.block.x = e.offsetX;
    console.log('up',this.block,e);
  }
  mouseMove(e: MouseEvent) : void {
    if (this.active){

      this.block.y = e.offsetY;
      this.block.x = e.offsetX;
      console.log(e, e.target ,e.offsetX, e.offsetY);

    }
  }

}

</script>
<style lang="scss" module>
@import "assets/style/global";
.main{
  background: $main-additional-color;
  text-align: center;
  .wrapImg{
    position: relative;

    width: 640px;
    height: 640px;
    img{
      user-select: none;
      z-index: 100;
    }
    .item{
      background: #A8E03F;
      opacity: 0.6;
      position: absolute;
      cursor: pointer;
      z-index: 10;
    }
  }

}

</style>
