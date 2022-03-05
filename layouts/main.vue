<template>
  <div :class="$style.page">
    <sideMenu
      :class="$style.side"
    />
    <div
      :class="$style.main"

    >
      <Header
        :class="$style.header"
      />
        <div
          :class="$style.content"
        >
          <nuxt/>
        </div>
        <Footer
          :class="$style.footer"
        />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

@Component

export default class Main extends Vue{

}
</script>

<style lang="scss" module>
  .page{
    height: 100vh;
    width: 100%;
    display: flex;
    .side{
      box-shadow: 1px 0 10px #505050;
      z-index: 1000;
    }
    .main{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .header{
        z-index: 900;
        padding: 20px 0 7vw $BasePaddingLeft;
      }
      .content{
        width: 100%;
        height: 100%;
        padding: $BasePaddingLeft;
        background: $main-additional-color;
        display: flex;
        flex-direction: column;
      }
      .footer{
        padding-left: $BasePaddingLeft;
      }
    }
  }

</style>
