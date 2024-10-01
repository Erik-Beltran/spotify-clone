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
      class="flex gap-4 text-zinc-400 hover:text-zinc-100 items-center py-3 font-medium px-5 transition duration-300"
    >
      <slot />
    </a>
  </li>
</template>
