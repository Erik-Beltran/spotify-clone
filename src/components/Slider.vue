<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  max: number | string
  initialValue: number
}>()

const { max, initialValue } = props
const value = ref(initialValue)

const emit = defineEmits()

const updateValue = (event: any) => {
  const newValue = event.target.value
  emit('update:value', Number(newValue))
}
</script>

<template>
  <input
    type="range"
    class="bg-white hover:accent-green-500 hover:appearance-auto rounded-lg w-full h-2 accent-white cursor-pointer"
    @input="updateValue($event)"
    :max="max"
    min="0"
    v-model="value"
  />
</template>

<style>
input[type='range'] {
  outline: 1px solid white;
}

input[type='range']::-webkit-slider-thumb {
  opacity: 0;
  transition: opacity 0.2s;
}

input[type='range']:hover::-webkit-slider-thumb {
  opacity: 1;
}

input[type='range']::-moz-range-thumb {
  opacity: 0;
  transition: opacity 0.2s;
}

input[type='range']:hover::-moz-range-thumb {
  opacity: 1;
}
</style>
