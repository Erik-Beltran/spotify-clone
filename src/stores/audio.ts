import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', () => {
  const isPlaying = ref(false)
  const currentMusic = ref({
    playlist: null,
    song: null,
    songs: []
  })

  const setIsPlaying = (value: Boolean) => {
    isPlaying.value = value ? true : false
  }

  const setCurrentMusic = (music) => {
    currentMusic.value = music
  }

  return { isPlaying, setIsPlaying, currentMusic, setCurrentMusic }
})
