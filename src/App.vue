<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import AsideMenu from './components/AsideMenu.vue'
</script>

<template>
  <aside class="[grid-area:aside] flex-col flex overflow-y-auto">
    <AsideMenu />
  </aside>
  <main class="[grid-area:main]">main</main>
  <footer class="[grid-area:player]">player</footer>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> 

  <RouterView />-->
</template>

<style></style>
