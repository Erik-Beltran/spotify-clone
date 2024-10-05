<script setup lang="ts">
import { useAudioStore } from '@/stores/audio'
import { pinia } from '@/stores/pinia'
import PauseIcon from './icons/IconPause.vue'
import PlayIcon from './icons/IconPlay.vue'
import { computed, watch } from 'vue'
import { getMusic } from '@/lib/data'
import { ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

const props = defineProps({
  id: String
})
const { id } = props
const displayedId = ref(id) // Variable reactiva para mostrar el ID

const audioStore = useAudioStore(pinia)
const isPlaying = computed(() => audioStore.isPlaying)
const isPlayingPlayList = ref(false)

const handleClick = () => {
  if (isPlayingPlayList.value) {
    audioStore.setIsPlaying(false)
    return
  }

  const { playList, playListSongs } = getMusic(displayedId.value)

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
    if (isPlaying.value && newId?.id === displayedId.value) {
      isPlayingPlayList.value = true
    } else {
      isPlayingPlayList.value = false
    }
  }
)

watch(
  () => isPlaying.value,
  (newValue) => {
    if (newValue && audioStore.currentMusic.playlist.id === displayedId.value) {
      isPlayingPlayList.value = true
    } else {
      isPlayingPlayList.value = false
    }
  }
)

onBeforeRouteUpdate((to) => {
  const newId = to.params.id
  displayedId.value = newId

  if (isPlaying.value && newId == audioStore.currentMusic.playlist.id) {
    isPlayingPlayList.value = true
  } else {
    isPlayingPlayList.value = false
  }
  // Aquí puedes agregar la lógica que necesites para manejar el nuevo ID
})

watch(
  () => props.id,
  (newId) => {
    if (isPlaying.value && newId == audioStore.currentMusic.playlist.id) {
      isPlayingPlayList.value = true
    } else {
      isPlayingPlayList.value = false
    }
  },
  { immediate: true } // Para que se ejecute inmediatamente
)
</script>

<template>
  <button @click="handleClick" class="card-play-button rounded-full bg-green-400 p-4 text-black">
    <PauseIcon v-if="isPlayingPlayList" />
    <PlayIcon v-else />
  </button>
</template>
