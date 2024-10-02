import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type Playlist } from '@/lib/data'

export const useAudioStore = defineStore('audio', () => {
  const isPlaying = ref(false)
  const currentMusic = ref({
    playlist: null,
    song: null,
    songs: []
  })

  const setIsPlaying = (value: Boolean) => {
    isPlaying.value = value
  }

  const setCurrentMusic = (music) => {
    currentMusic.value = music
  }

  return { isPlaying, setIsPlaying, currentMusic, setCurrentMusic }
})
