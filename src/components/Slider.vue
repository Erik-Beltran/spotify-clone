<script setup lang="ts">
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
  />
</template>

<style>
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
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
