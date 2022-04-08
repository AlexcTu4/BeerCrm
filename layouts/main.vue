<template>
  <div :class="$style.page">
    <sideMenu
      :class="$style.side"
    />
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
import BaseMixin from '~/mixins/BaseMixin'
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
export default class Main extends mixins(BaseMixin,MainProps){

}
</script>

<style lang="scss" module>
  .page{
    min-height: 100vh;
    width: 100%;
    display: flex;
    .side{

    }
    .main{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &.activeSideBar{
        //margin-left: 320px;
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
