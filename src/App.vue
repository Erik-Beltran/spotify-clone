<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import AsideMenu from './components/AsideMenu.vue'
import Player from './components/Player.vue'
</script>

<template>
  <aside class="[grid-area:aside] flex-col flex overflow-y-auto">
    <AsideMenu />
  </aside>
  <footer class="[grid-area:player] min-h-[100px]"><Player /></footer>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <RouterView />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active en <2.1.8 */ {
  opacity: 0;
}
</style>
