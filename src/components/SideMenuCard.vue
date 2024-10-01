<script setup lang="ts">
import { type Playlist } from '@/lib/data'

const props = defineProps<{
  playlist: Playlist
}>()

const { playlist } = props
const { albumId, artists, color, cover, id, title } = playlist
const artistsString = artists.join(', ')
</script>

<template>
  <RouterLink
    :to="{ name: 'playlist', params: { id: id } }"
    class="playlist-item flex relative p-2 overflow-hidden items-center gap-5 rounded-md hover:bg-zinc-800"
  >
    <picture class="h-12 w-12 flex-none">
      <img
        :src="cover"
        :alt="`cover of ${title} by ${artistsString}`"
        class="object-cover w-full h-full rounded-md"
      />
    </picture>
    <div class="flex flex-auto flex-col truncate">
      <h4 v-text="title" class="font-medium text-white text-sm" />
      <span v-text="artistsString" class="text-xs text-gray-400" />
    </div>
  </RouterLink>
</template>
