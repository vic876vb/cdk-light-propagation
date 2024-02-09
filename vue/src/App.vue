<template>
  <header class="dark:border-gray-600 md:h-16 sticky top-0 h-12 pt-2 leading-6 border-b border-gray-200">
    <div class="gap-x-4 container flex items-center h-full px-4">
      <span class="mr-2">
        <svg class="dark:text-white md:w-8 md:h-8 w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"/>
        </svg>
      </span>
      <h1 class="text-xl md:text-2xl lg:text-3xl font-bold md:after:content-['/'] md:after:ml-2">
        Light Propagation Visualize
      </h1>
      <span class="md:block hidden mt-3 text-xs">by Victor Hernandez Nuñez</span>
    </div>
  </header>
  <RouterView class="py-4" />
</template>

<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>