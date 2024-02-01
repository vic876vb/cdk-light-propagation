<template>
  <header class="h-8leading-6 sticky top-0 border-2 border-current">Header tools</header>
  <RouterView class="py-4" />
  <footer class="border-2 border-current">Victor Antonio Hernandez Nunez</footer>
</template>

<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>
