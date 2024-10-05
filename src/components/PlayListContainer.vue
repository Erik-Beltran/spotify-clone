<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { watch } from 'vue'
import { computed } from 'vue'

import { allPlaylists, songs } from '@/lib/data'
import PlayListTable from './PlayListTable.vue'
import CardPlayButton from './CardPlayButton.vue'

import ArrowBackIcon from './icons/IconArrowBack.vue'

const route = useRoute()
const { id } = route.params

const playList = ref(allPlaylists.find((playList) => playList.id === id))
const playListSongs = ref(songs.filter((song) => song.albumId === playList.value?.albumId))
const darkColor = ref(playList.value?.color.dark)

const songsList = computed(() => playListSongs.value)

watch(
  () => route.params.id,
  (newId) => {
    playList.value = allPlaylists.find((playList) => playList.id === newId)
    playListSongs.value = songs.filter((song) => song.albumId === playList.value?.albumId)
    darkColor.value = playList.value?.color.dark
  }
)
</script>
<template>
  <div id="playlist-container" class="relative bg-zinc-900 flex-col flex h-full overflow-x-hidden">
    <div class="relative z-10 px-6 pt-10">
      <button @click="$router.go(-1)" class="blcok lg:hidden">
        <ArrowBackIcon />
      </button>

      <header class="flex lg:flex-row gap-8 px-6 pt-10 flex-col">
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
                <span class="text-white">{{ playListSongs.length }} songs</span>, about 2 hr 25 min
              </p>
            </div>
          </div>
        </div>
      </header>
      <div class="pl-6 pt-6">
        <CardPlayButton :id="id" />
      </div>

      <section class="lg:p-8 mt-2">
        <PlayListTable :songs="songsList" />
      </section>
    </div>
    <div
      :style="`background: linear-gradient(to bottom, ${darkColor} 10%, #18181b 60%);`"
      class="absolute inset-0 via-zinc-900/80"
    ></div>
  </div>
</template>
