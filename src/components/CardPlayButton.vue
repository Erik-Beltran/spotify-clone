<script setup lang="ts">
import { useAudioStore } from '@/stores/audio'
import { pinia } from '@/stores/pinia'
import PauseIcon from './icons/IconPause.vue'
import PlayIcon from './icons/IconPlay.vue'
import { computed, watch } from 'vue'
import { getMusic } from '@/lib/data'
import { ref } from 'vue'

const props = defineProps({
  id: String
})
const { id } = props

const audioStore = useAudioStore(pinia)
const isPlaying = computed(() => audioStore.isPlaying)
const isPlayingPlayList = ref(false)

const handleClick = () => {
  if (isPlayingPlayList.value) {
    audioStore.setIsPlaying(false)
    return
  }

  const { playList, playListSongs } = getMusic(id)

  audioStore.setCurrentMusic({
    songs: playListSongs,
    song: playListSongs[0],
    playlist: playList
  })

  audioStore.setIsPlaying(!isPlayingPlayList.value)
}

watch(
  () => audioStore.currentMusic.playlist,
  (newId: any) => {
    if (isPlaying.value && newId?.id === id) {
      isPlayingPlayList.value = true
    } else {
      isPlayingPlayList.value = false
    }
  }
)

watch(
  () => isPlaying.value,
  (newValue) => {
    if (newValue && audioStore.currentMusic.playlist.id === id) {
      isPlayingPlayList.value = true
    } else {
      isPlayingPlayList.value = false
    }
  }
)
</script>

<template>
  <button @click="handleClick" class="card-play-button rounded-full bg-green-400 p-4 text-black">
    <PauseIcon v-if="isPlayingPlayList" />
    <PlayIcon v-else />

    {{ isPlayingPlayList }}
  </button>
</template>
