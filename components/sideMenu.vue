<template>
    <div
      :class="[$style.side,{[$style.activeSideBar] : sideBarActive }]"
      v-click-outside:expression="sideBarClick"
    >
      <div
        :class="$style.logo"
      >
        <NuxtLink
          to="/"
        >
          <img src="~assets/img/logo-test.png" alt="">
        </NuxtLink>
      </div>
      <div
        :class="$style.links"
      >
        <div
          v-for="link in links"
          :key="link.name"

        >
          <NuxtLink
            :class="$style.link"
            :to="{name:link.name}"
            @click="linkClick"
          >
            <fa
              :class="$style.icon"
              :icon="link.icon"></fa>
            {{ link.title }}
          </NuxtLink>
        </div>
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
      'sideBarActive',
    ]),
  }
})
export default class SideMenu extends Vue{
  private mediaQuery !: string
  private sideBarActive!: boolean
  get links(): ILink[]{
    return this.$store.state.main.links
  }
  sideBarClick(value: boolean) : void {
    this.$store.commit('main/SET_SIDE_BAR', value)
  }
  linkClick() : void {
    console.log('asdasdsds')
    if(this.mediaQuery === 'xs'){
      this.$store.commit('main/SET_SIDE_BAR', false)
    }
  }
}
</script>
<style lang="scss" module>
@import "assets/style/media";
  .side{
    width: 100%;
    max-width: 210px;
    min-width: 210px;
    z-index: 1100;
    background: $main-color;
    box-shadow: 1px 0 5px #505050;
    transition: transform 0.3s ease;
    @include xs {
      position: absolute;
      transform: translateY(-320px);
      width: 100%;
      padding: 20px 0;
      max-width: unset;
      //height: 100%;
    }
    @include mobile {
      position: absolute;
      transform: translateY(-500px);
      width: 100%;
      padding: 20px 0;
      max-width: unset;
      //height: 100%;
    }
    &.activeSideBar{
      transform: translateY(0);
    }

    .logo{
      width: 100%;

      img{
        width: 100%;
        height: auto;
      }
      @include xs {
        display: none;
      }
      @include mobile {
        width: 30%;
        margin: 0 auto;
      }

    }
    .links{
      padding: 0 20px;
      text-align: left;
      max-width: 260px;

      @include mobile {
        margin: 0 auto;
      }
      .link{

        font-size: 18px;
        .icon{
          margin-right: 10px;
          width: 20px;
        }

        &:hover{
          opacity: 0.8;
        }
      }

    }


  }

</style>
<style lang="scss">
.nuxt-link-exact-active{
  color:  $second-color;
}
.nuxt-link-exact-active:hover{
  color: $second-color;
}
</style>
