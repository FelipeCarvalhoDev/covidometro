<template>
  <div class="bg-[#fff9f9] h-full pb-60">
    <Loading v-if="useLoadingStore().loading" />
    <AppHeader />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from "@/stores/loading.store";

import { generateMeta } from '@/utils/generateMeta';

useHead({
  title: 'Covidômetro - FarmTech',
  meta: generateMeta(),
  htmlAttrs: {
    lang: 'pt-BR',
  },
})


</script>