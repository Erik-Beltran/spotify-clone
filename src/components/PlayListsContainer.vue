<script setup lang="ts">
import { playlists } from '../lib/data'
import PlayListItemCard from './PlayListItemCard.vue'
</script>

<template>
  <div id="playlist-container" class="relative transition-all duration-1000">
    <div class="relative z-10 px-6 pt-10">
      <h1 class="text-4xl font-bold">Home</h1>
      <div class="flex flex-wrap mt-6 gap-4">
        <PlayListItemCard v-for="playlist in playlists" :key="playlist.id" :playlist="playlist" />
      </div>
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80"></div>
  </div>
</template>
