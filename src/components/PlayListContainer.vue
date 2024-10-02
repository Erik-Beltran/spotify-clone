<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { watch } from 'vue'

import { allPlaylists, songs } from '@/lib/data'

const route = useRoute()
const { id } = route.params

const playList = ref(allPlaylists.find((playList) => playList.id === id))
const playListSongs = ref(songs.filter((song) => song.albumId === playList.value?.albumId))

watch(
  () => route.params.id,
  (newId) => {
    playList.value = allPlaylists.find((playList) => playList.id === newId)
    playListSongs.value = songs.filter((song) => song.albumId === playList.value?.albumId)
  }
)
</script>

<template>
  <div id="playlist-container" class="relative bg-zinc-900 flex-col flex h-full overflow-x-hidden">
    <header class="flex flex-row gap-8 px-6 pt-10">
      <picture class="h-52 w-52 flex-none aspect-auto">
        <img
          :src="playList?.cover"
          :alt="`cover of ${playList?.title}`"
          class="object-cover w-full h-full rounded-md"
        />
      </picture>

      <div class="flex flex-col justify-between">
        <h2 class="flex flex-1 items-end">Playlist</h2>
        <div>
          <h1 class="text-5xl font-bold block text-white" v-text="playList?.title" />
        </div>

        <div class="flex-1 flex items-end">
          <div class="text-sm text-gray-300 font-normal">
            <div>
              <span>{{ playList?.artists.join(', ') }} </span>
            </div>
            <p class="mt-1">
              <span class="text-white">{{ playListSongs.length }} songs</span>, 3 h aproximadamente
            </p>
          </div>
        </div>
      </div>
    </header>
    <div class="relative z-10 px-6 pt-10">
      <div class="flex flex-wrap mt-6 gap-4"></div>
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 -z-10"></div>
  </div>
</template>
