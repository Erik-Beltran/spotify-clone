<script setup lang="ts">
import { useAudioStore } from '@/stores/audio'
import { pinia } from '@/stores/pinia'
import { computed, ref } from 'vue'
import { watch } from 'vue'

import CurrentSong from './CurrentSong.vue'
import Slider from './Slider.vue'

import PauseIcon from './icons/IconPause.vue'
import PlayIcon from './icons/IconPlay.vue'
import VolumeDownIcon from './icons/IconVolumeDown.vue'
import VolumeUpIcon from './icons/IconVolumeUp.vue'
import VolumeMuteIcon from './icons/IconVolumeMute.vue'

import { formatTime } from '../util/formatetter'
import { onMounted } from 'vue'
import { onBeforeUnmount } from 'vue'

const audioStore = useAudioStore(pinia)

const isPlaying = computed(() => audioStore.isPlaying)
const currentMusic = computed(() => audioStore.currentMusic)
const darkColor = computed(() => audioStore.currentMusic.playlist?.color.dark || '#000')

const audioElement = ref(null)
const audioSrc = ref('')
const isReadyToPlay = ref(false)
const volumeRef = ref(100)
const previousVolumeRef = ref(100)
const duration = ref<number | null>(null)
const currentTime = ref(0)
const isMobile = ref(window.innerWidth < 1024)

const updateMobileStatus = () => {
  isMobile.value = window.innerWidth < 1024
}

const backgroundStyle = computed(() => {
  return isMobile.value
    ? `background: linear-gradient(to bottom, ${darkColor.value} 10%, #18181b 60%);`
    : 'background: none;'
})

const handleClickVolumen = () => {
  const isVolumeSilenced = volumeRef.value == 0

  if (isVolumeSilenced) {
    volumeRef.value = previousVolumeRef.value
  } else {
    volumeRef.value = 0
  }
}

const playAudio = () => {
  if (audioElement.value && isReadyToPlay.value && isPlaying.value) {
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

const onLoadedMetadata = () => {
  if (audioElement.value) {
    duration.value = audioElement.value.duration
  }
}

const handleTimeUpdate = () => {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime
  }
}

onMounted(() => {
  if (audioElement.value) {
    audioElement.value.addEventListener('timeupdate', handleTimeUpdate)
  }

  window.addEventListener('resize', updateMobileStatus)
})

onBeforeUnmount(() => {
  if (audioElement.value) {
    audioElement.value.removeEventListener('timeupdate', handleTimeUpdate)
  }
  window.removeEventListener('resize', updateMobileStatus)
})

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

const updateVolume = (newValue) => {
  audioElement.value.volume = newValue / 100
}

const updatePlaybackTime = (event) => {
  const value = event.target.value
  audioElement.value.currentTime = value
}
</script>
<template>
  <div
    class="flex flex-row justify-between w-full px-4 z-50 max-md:rounded-md max-md:p-2"
    :style="backgroundStyle"
    v-if="currentMusic.song"
  >
    <div class="w-[200px]">
      <CurrentSong :song="currentMusic.song" />
    </div>
    <div className="grid place-content-center gap-4 lg:flex-1">
      <div className="flex justify-center flex-col items-center">
        <button
          @click="audioStore.setIsPlaying(!isPlaying)"
          class="bg-white rounded-full p-2 text-black"
        >
          <PauseIcon v-if="isPlaying" />
          <PlayIcon v-else />
        </button>
        <div className="hidden  lg:flex gap-x-3 text-xs pt-2 items-center">
          <span v-text="formatTime(currentTime)" />
          <input
            class="bg-white hover:accent-green-500 hover:appearance-auto rounded-lg h-2 accent-white cursor-pointer w-[400px]"
            type="range"
            min="0"
            :max="duration"
            v-model="currentTime"
            @input="updatePlaybackTime"
          />
          <span v-if="duration" v-text="formatTime(duration)" />
        </div>
      </div>
    </div>
    <div class="hidden lg:flex justify-center items-center gap-x-1">
      <button @click="handleClickVolumen">
        <VolumeMuteIcon v-if="volumeRef == 0" />
        <VolumeDownIcon v-else-if="volumeRef <= 75" />
        <VolumeUpIcon v-else />
      </button>
      <Slider :initialValue="volumeRef" @update:value="updateVolume" :max="100" />
    </div>
  </div>
  <audio
    ref="audioElement"
    :src="audioSrc"
    @canplay="onCanPlay"
    @loadedmetadata="onLoadedMetadata"
  ></audio>
</template>
