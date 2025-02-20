<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useImages } from '../composables/useImages';
import { Icons } from 'open-icon';
import Icon from '@/components/ui/Icon.vue';

const route = useRoute();
const router = useRouter();
const { getImageDetails, loading } = useImages();

const image = ref();
const error = ref();

onMounted(async () => {
  const imageId = route.params.id as string;
  const details = getImageDetails(imageId);

  if (!details) {
    error.value = 'Image not found';
    router.push({ name: 'home' });
    return;
  }

  image.value = details;
});
</script>

<template>
  <main class="image-detail">
    <nav class="image-detail__nav">
      <button @click="router.back()" class="image-detail__back">
        <Icon :name="Icons.ARROW_LEFT" />Back
      </button>
    </nav>

    <div v-if="loading" class="image-detail__loading">Loading image...</div>
    <div v-else-if="error" class="image-detail__error">{{ error }}</div>
    <div v-else-if="image" class="image-detail__content">
      <img :src="image.url" :alt="image.name" class="image-detail__image" />

      <div class="image-detail__info">
        <h1 class="image-detail__title">{{ image.name }}</h1>
        <p v-if="image.description" class="image-detail__description">{{ image.description }}</p>

        <div class="image-detail__tags">
          <span v-for="tag in image.tags" :key="tag" class="image-detail__tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.image-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  &__back {
    background: none;
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
    padding: var(--space);
    border-radius: 4px;
    transition: background-color 300ms;
    color: var(--color-foreground);
    gap: var(--space-s);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {}
  }

  &__loading,
  &__error {
    text-align: center;
    padding: 2rem;
    border-radius: 8px;
  }

  &__content {}

  &__image {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: var(--border-radius);
  }

  &__info {
    padding: 2rem;
  }

  &__title {}

  &__description {}

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__tag {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
  }
}
</style>
