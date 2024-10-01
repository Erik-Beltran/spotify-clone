<script setup lang="ts">
import SideMenuItem from './SideMenuItem.vue'
import HomeIcon from './icons/IconHome.vue'
import SearchIcon from './icons/IconSearch.vue'
import LibraryIcon from './icons/IconLibrary.vue'

import { playlists } from '../lib/data'
import SideMenuCard from './SideMenuCard.vue'
</script>

<template>
  <nav class="flex flex-col flex-1 gap-2">
    <div class="bg-zinc-900 rounded-lg p-2">
      <ul>
        <SideMenuItem href="/">
          <HomeIcon />
          Home
        </SideMenuItem>
        <SideMenuItem href="/#">
          <SearchIcon />
          Search
        </SideMenuItem>
      </ul>
    </div>
    <div class="bg-zinc-900 rounded-lg p-2 flex-1">
      <ul>
        <SideMenuItem href="/">
          <LibraryIcon />
          Your Library
        </SideMenuItem>

        <SideMenuCard v-for="playlist in playlists" :key="playlist.id" :playlist="playlist" />
      </ul>
    </div>
  </nav>
</template>
