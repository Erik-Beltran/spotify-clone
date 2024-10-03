<script setup lang="ts">
import { useAudioStore } from '@/stores/audio'
import { pinia } from '@/stores/pinia'
import { computed } from 'vue'

const audioStore = useAudioStore(pinia)

const currentMusic = computed(() => audioStore.currentMusic.song)
</script>
<template>
  <div class="flex items-center gap-5 relative overflow-hidden">
    <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
      <img :src="currentMusic.image" alt="album cover" />
    </picture>

    <div className="flex flex-col">
      <h3 className="font-semibold text-sm block" v-text="currentMusic.title" />
      <span className="text-xs opacity-80" v-text="currentMusic.artists.join(', ')" />
    </div>
  </div>
</template>
