<script setup lang="ts">
import SideMenuItem from './SideMenuItem.vue'
import HomeIcon from './icons/IconHome.vue'
import SearchIcon from './icons/IconSearch.vue'
import LibraryIcon from './icons/IconLibrary.vue'

import { playlists } from '../lib/data'
import SideMenuCard from './SideMenuCard.vue'
</script>

<template>
  <nav class="lg:bg-zinc-900 rounded-lg lg:p-2 flex-1">
    <ul class="w-full flex justify-between lg:flex-col">
      <SideMenuItem href="/">
        <HomeIcon />
        Home
      </SideMenuItem>
      <SideMenuItem href="/#">
        <SearchIcon />
        Search
      </SideMenuItem>
      <SideMenuItem href="/">
        <LibraryIcon />
        Your Library
      </SideMenuItem>
    </ul>
    <div class="hidden lg:block">
      <SideMenuCard v-for="playlist in playlists" :key="playlist.id" :playlist="playlist" />
    </div>
  </nav>
</template>
