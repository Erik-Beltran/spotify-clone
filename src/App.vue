<script setup lang="ts">
import { RouterView } from 'vue-router'
import AsideMenu from './components/AsideMenu.vue'
import Player from './components/Player.vue'
</script>

<template>
  <aside class="[grid-area:aside] flex-col flex overflow-y-auto">
    <AsideMenu />
  </aside>
  <footer class="[grid-area:player] lg:min-h-[100px]"><Player /></footer>
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
