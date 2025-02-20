<script setup lang="ts">
import { ref } from 'vue';
import ImageList from '../components/ImageList.vue';
import FilterComponent from '../components/FilterComponent.vue';
import { useImages } from '../composables/useImages';

const { filteredImages, loading, getAllImages } = useImages();
const error = ref(null);

getAllImages();
</script>

<template>
  <main class="home">
    <FilterComponent />
    <ImageList :images="filteredImages" :loading="loading" :error="error" />
  </main>
</template>

<style lang="scss">
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  &__title {
    font-size: 2rem;
    text-align: center;
  }
}
</style>
