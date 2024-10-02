<script setup lang="ts">
import { ref } from 'vue'
import { useAudioStore } from '@/stores/audio'
import { pinia } from '@/stores/pinia'
import { computed } from 'vue'
import { watch } from 'vue'

import CurrentSong from './CurrentSong.vue'
import Slider from './Slider.vue'

import PauseIcon from './icons/IconPause.vue'
import PlayIcon from './icons/IconPlay.vue'
import VolumeDownIcon from './icons/IconVolumeDown.vue'
import VolumeUpIcon from './icons/IconVolumeUp.vue'
import VolumeMuteIcon from './icons/IconVolumeMute.vue'

const audioStore = useAudioStore(pinia)

const isPlaying = computed(() => audioStore.isPlaying)
const currentMusic = computed(() => audioStore.currentMusic)

const audioElement = ref(null)
const audioSrc = ref('')
const isReadyToPlay = ref(false)
const volumeRef = ref(100)
const previousVolumeRef = ref(100)

const handleClickVolumen = () => {
  const isVolumeSilenced = volumeRef.value == 0

  if (isVolumeSilenced) {
    volumeRef.value = previousVolumeRef.value
  } else {
    volumeRef.value = 0
  }
}

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

const onCanPlay = () => {
  isReadyToPlay.value = true
  playAudio()
}

watch(
  () => isPlaying.value,
  (newValue: any) => {
    newValue ? playAudio() : pauseAudio()
  }
)

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

watch(
  () => volumeRef.value,
  (newValue: any, oldValue) => {
    audioElement.value.volume = newValue / 100
    previousVolumeRef.value = oldValue
  }
)
</script>
<template>
  <div class="flex flex-row justify-between w-full px-4 z-50" v-if="currentMusic.song">
    <div><CurrentSong :song="currentMusic.song" /></div>
    <div class="grid place-content-center gap-4 flex-1">
      <button
        @click="audioStore.setIsPlaying(!isPlaying)"
        class="bg-white rounded-full p-2 text-black"
      >
        <PauseIcon v-if="isPlaying" />
        <PlayIcon v-else />
      </button>
    </div>
    <div class="flex justify-center items-center gap-x-1">
      <button @click="handleClickVolumen">
        <VolumeMuteIcon v-if="volumeRef == 0" />
        <VolumeDownIcon v-else-if="volumeRef <= 75" />
        <VolumeUpIcon v-else />
      </button>
      <Slider v-model:value="volumeRef" />
    </div>
  </div>
  <audio ref="audioElement" :src="audioSrc" @canplay="onCanPlay"></audio>
</template>
