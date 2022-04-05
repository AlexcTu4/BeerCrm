<template>
  <div :class="$style.side">
    <div
      :class="$style.logo"
    >
      <NuxtLink to="/">
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
          :to="{name:link.name}">
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

@Component
export default class SideMenu extends Vue{
  get links(): ILink[]{
    return this.$store.state.main.links
  }
  mounted(): void {

  }
}
</script>
<style lang="scss" module>

  .side{
    width: 260px;
    background: $main-color;
    box-shadow: 1px 0 5px #505050;
    .logo{
      width: 100%;

      img{
        width: 100%;
        height: auto;
      }
    }
    .links{
      padding: 0 20px;
      text-align: left;
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
