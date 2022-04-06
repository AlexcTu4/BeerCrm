<template>
  <div :class="$style.page">
    <b-sidebar
      id="sidebar"
      :visible="mediaQuery === 'lg'"
      no-header
      shadow
      :no-slide="mediaQuery === 'lg'"
      :backdrop="mediaQuery !== 'lg'"
      @change="onChangeSideBar"
    >
      <sideMenu
        :class="$style.side"
      />
    </b-sidebar>

    <div
      :class="[$style.main, {[$style.activeSideBar] : mediaQuery === 'lg' }]"
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
import Component, {mixins} from 'nuxt-class-component'
import mixin from '~/mixins/BaseMixin'
import Footer from '~/components/footer.vue'
import  Header from '~/components/header.vue'
import {mapState} from "vuex";

const MainProps = Vue.extend({

})
@Component({
  components:{
    Footer,
    Header
  },
  computed: {
    ...mapState('main', [
      'mediaQuery',
    ]),
  }
})
export default class Main extends mixins(mixin,MainProps){
  onChangeSideBar() : void {
    console.log('asd')
    this.$store.commit('main/TOGGLE_SIDE_BAR');
  }
}
</script>

<style lang="scss" module>
  .page{
    min-height: 100vh;
    width: 100%;
    display: flex;
    .side{
      box-shadow: 1px 0 10px #505050;
      z-index: 1000;
      height: 100%;
    }
    .main{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &.activeSideBar{
        margin-left: 320px;
      }
      .header{
        z-index: 900;
        padding: 20px 20px 7vw $BasePaddingLeft;
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
