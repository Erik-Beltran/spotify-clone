<script setup lang="ts">
import { type Playlist } from '@/lib/data'
import { useAudioStore } from '@/stores/audio'
import { pinia } from '@/stores/pinia'
import { watch } from 'vue'
import { ref } from 'vue'
import IconVolumeUp from './icons/IconVolumeUp.vue'
import { computed } from 'vue'

const props = defineProps<{
  playlist: Playlist
}>()

const audioStore = useAudioStore(pinia)

const { playlist } = props
const { artists, cover, id, title } = playlist
const artistsString = artists.join(', ')

const isPlaying = computed(() => audioStore.isPlaying)

const activeItem = ref(false)

watch(
  () => audioStore.currentMusic.playlist,
  (newValue: any) => {
    activeItem.value = newValue.id == id
  }
)
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
      <h4
        v-text="title"
        :class="`font-medium text-sm ${activeItem ? 'text-green-400' : 'text-white'}`"
      />
      <span v-text="artistsString" class="text-xs text-gray-400" />
    </div>
    <IconVolumeUp class="text-green-400" v-if="activeItem && isPlaying" />
  </RouterLink>
</template>
