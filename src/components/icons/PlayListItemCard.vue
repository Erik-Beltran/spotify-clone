<script setup lang="ts">
import { type Playlist } from '@/lib/data'

const props = defineProps<{
  playlist: Playlist
}>()

const { playlist } = props
const { artists, cover, id, title } = playlist
const artistsString = artists.join(', ')
</script>

<template>
  <RouterLink
    :to="{ name: 'playlist', params: { id: id } }"
    class="playlist-item transition-all duration-300 flex relative gap-2 p-2 pb-6 overflow-hidden rounded-md hover:bg-zinc-800 shadow-lg hover:shadow-xl w-44 flex-col"
  >
    <picture class="h-auto w-full flex-none aspect-auto">
      <img
        :src="cover"
        :alt="`cover of ${title} by ${artistsString}`"
        class="object-cover w-full h-full rounded-md"
      />
    </picture>
    <div class="flex flex-auto flex-col px-2">
      <h4 v-text="title" class="font-medium text-white text-sm" />
      <span v-text="artistsString" class="text-xs text-gray-400" />
    </div>
  </RouterLink>
</template>
