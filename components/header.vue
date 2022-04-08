<template>
  <div :class="$style.header">
    <div
    :class="$style.title"
    >
      {{ title }}
    </div>
    <div
      id="toggleMenu"
      :class="$style.toggleMenu"
      v-if="mediaQuery !== 'lg'"
    >
        <div
          :class="$style.toggleMenuItem"
        />
        <div
          :class="[$style.toggleMenuItem, $style.middle, {[$style.toggle] : sideBarActive}]"
        />
        <div
          :class="[$style.toggleMenuItem,{[$style.toggle] : sideBarActive} ]"
        />
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import {mapState} from "vuex";



@Component({
  computed: {
    ...mapState('main', [
      'mediaQuery',
      'sideBarActive'
    ]),
  }
})
export default class Header extends Vue{
  get title(): string {
    return this.$store.state.main.links.find((item: ILink) => item.name === this.$route.name)?.title
  }
  mounted(): void {

  }
  onChangeSideBar() : void {
    console.log('asd')
    this.$store.commit('main/TOGGLE_SIDE_BAR');
  }
}
</script>
<style lang="scss" module>
@import "assets/style/media";

  .header{
    background: $second-color;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    .toggleMenu{
      margin: auto 0;
      overflow: hidden;
      @include lg {
        display: none;
      }
      @include md {
        display: none;
      }
      @include mobile {
        display: block;
      }

      .toggleMenuItem{
        height: 3px;
        width: 20px;
        background: #fff;
        border-radius: 3px;
        transition: all .15s ease;
        &.middle{
          margin: 3px 0;
          &.toggle{
            transform: translateX(8px);
          }
        }
        &.toggle{
          transform: translateX(14px);
        }

      }
    }
    .title{
      font-size: 22px;
      font-weight: bold;
    }
    &:after{
      content: '';
      background: $second-color;
      height: 140px;
      width: 100%;
      position: absolute;
      left: 0;
      transform: translateY(30px) skewY(-4deg);
      transform-origin: right;
      z-index: 900;
    }
  }

</style>
