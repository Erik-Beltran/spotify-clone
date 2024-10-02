<script setup lang="ts">
import { ref } from 'vue'

import PauseIcon from './icons/IconPause.vue'
import PlayIcon from './icons/IconPlay.vue'
import { useAudioStore } from '@/stores/audio'
import { pinia } from '@/stores/pinia'
import { computed } from 'vue'
import { watch } from 'vue'

const audioStore = useAudioStore(pinia)

const isPlaying = computed(() => audioStore.isPlaying)
const currentMusic = computed(() => audioStore.currentMusic)

const audioElement = ref(null)
const audioSrc = ref('')

const isReadyToPlay = ref(false)

const playAudio = () => {
  if (audioElement.value && isReadyToPlay.value) {
    audioElement.value.play()
  }
}

const pauseAudio = () => {
  if (audioElement.value) {
    audioElement.value.pause()
  }
}

watch(
  () => isPlaying.value,
  (newValue: any) => {
    newValue ? playAudio() : pauseAudio()
  }
)

const onCanPlay = () => {
  isReadyToPlay.value = true
  playAudio()
}

watch(
  () => currentMusic.value,
  (newValue: any) => {
    if (newValue.song) {
      const { song, playlist, songs } = newValue
      audioSrc.value = `/music/${playlist?.id}/0${song.id}.mp3`

      isReadyToPlay.value = false

      if (audioElement.value) {
        audioElement.value.load()
      }
    }
  }
)
</script>
<template>
  <div class="flex flex-row justify-between w-full px-4 z-50">
    <div>Current Song</div>
    <div class="grid place-content-center gap-4 flex-1">
      <button
        @click="audioStore.setIsPlaying(!isPlaying)"
        class="bg-white rounded-full p-2 text-black"
      >
        <PauseIcon v-if="isPlaying" />
        <PlayIcon v-else />
      </button>
    </div>
    <div class="grid place-content-center">Volumen</div>
  </div>
  <audio ref="audioElement" :src="audioSrc" controls @canplay="onCanPlay"></audio>
</template>
