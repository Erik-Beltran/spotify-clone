<script setup lang="ts">
import { type Song } from '@/types/types'

const props = defineProps<{
  song: Song
}>()

const { song } = props

const { title, artists, image } = song

const artistsString = artists.join(', ')
</script>
<template>
  <div class="flex items-center gap-5 relative overflow-hidden">
    <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
      <img :src="image" alt="album cover" />
    </picture>

    <div className="flex flex-col">
      <h3 className="font-semibold text-sm block" v-text="title" />
      <span className="text-xs opacity-80" v-text="artistsString" />
    </div>
  </div>
</template>
