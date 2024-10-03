<script setup lang="ts">
import { type Playlist } from '@/lib/data'
import CardPlayButton from './CardPlayButton.vue'
import { useAudioStore } from '@/stores/audio'
import { pinia } from '@/stores/pinia'
import { ref } from 'vue'
import { watch } from 'vue'

const props = defineProps<{
  playlist: Playlist
}>()

const audioStore = useAudioStore(pinia)

const { playlist } = props
const { artists, cover, id, title } = playlist
const artistsString = artists.join(', ')

const activeItem = ref(false)

watch(
  () => audioStore.currentMusic.playlist,
  (newValue: any) => {
    activeItem.value = newValue.id === id
  }
)
</script>

<template>
  <article
    class="group relative hover:bg-zinc-800 shadow-lg hover:shadow-xl bg-zinc-500/30 rounded-md ransi transition-all duration-300"
  >
    <div
      :class="`absolute right-4 bottom-20  transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 z-10 ${activeItem ? 'opacity-100 translate-y-0' : 'translate-y-4 opacity-0 '}`"
    >
      <CardPlayButton :id="id" />
    </div>
    <RouterLink
      :to="{ name: 'playlist', params: { id: id } }"
      class="playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md w-44 flex-col"
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
  </article>
</template>
