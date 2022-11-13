<template>
  <div :class="$style.canvasCMP__wrapper">
    <img ref="image" src="~/assets/img/test.webp" alt="image">
    <canvas
      :class="$style.canvas"
      ref="canvas"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'



const CanvasImageProps = Vue.extend({

})
@Component({
  components:{

  }
})
export default class CanvasImage extends CanvasImageProps{
  private context!: CanvasRenderingContext2D;
  private imageEl!: HTMLImageElement;
  private width : number = 200;
  private height: number = 200;
  mounted() : void{

    if(this.$refs.canvas){
      //@ts-ignore
      this.imageEl = this.$refs.image;
      this.width =  this.imageEl.width;
      this.height =  this.imageEl.height;
      setTimeout(()=>{
        //@ts-ignore
        this.context = this.$refs.canvas?.getContext('2d');
        this.context.drawImage(this.imageEl, 0, 0, this.imageEl.width, this.imageEl.height);
        console.log(this.context);
      });

    }


  }
}
</script>
<style lang="scss" module>
.canvasCMP__wrapper{
  img{
    display: none;
  }
  height: 900px;
  width: 100%;
  .canvas{
    border: 1px solid #d5d4d4;
  }
}


</style>
