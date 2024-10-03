<script setup lang="ts">
const props = defineProps({
  href: String
})
const { href } = props
</script>

<template>
  <li>
    <a
      :href="href"
      class="flex gap-1 text-zinc-400 hover:text-zinc-100 items-center py-3 font-medium px-5 transition duration-300 flex-col lg:gap-4 lg:flex-row"
    >
      <slot />
    </a>
  </li>
</template>
