<script setup lang="ts">
import { type FilteredImagesResult } from '../composables/useImages';
import ImageCard from './ImageCard.vue';
import { useBemm } from 'bemm';

const bemm = useBemm('image-list');



defineProps<{
  images: FilteredImagesResult,
  loading: boolean,
  error: string | null
}>();
</script>

<template>
  <div :class="bemm()">
    <div v-if="loading" :class="bemm('loading')">Loading images...</div>
    <div v-else-if="error" :class="bemm('error')">{{ error }}</div>
    <template v-else>
      <div :class="bemm('list')" v-if="images.type === 'flat'">
        <div v-if="images.data.length === 0" :class="bemm('empty')">No images found.</div>
        <ImageCard v-else v-for="image in images.data" :key="image.id" :image="image" :class="bemm('item')" />
      </div>
      <div v-else :class="bemm('categories')">
        <div v-if="images.data.length === 0" :class="bemm('empty')">No images found.</div>
        <div v-else v-for="[category, categoryImages] in images.data" :key="category" :class="bemm('category')">
          <h2 :class="bemm('category-title')">{{ category }}</h2>
          <div :class="bemm('list', ['', 'categorized'])">
            <ImageCard v-for="image in categoryImages" :key="image.id" :image="image" :class="bemm('item')" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.image-list {
  padding: var(--space-l);

  &__loading,
  &__error,
  &__empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: var(--space-xl);
    color: var(--color-foreground);
    background: var(--color-background);
    border-radius: var(--border-radius);
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--image-min-width, 320px), 1fr));
    gap: var(--space-l);

    &--categorized {

      --image-min-width: 240px;
    }
  }

  &__category {
    border: 2px solid blue;

    &+& {
      margin-top: var(--spacing);
    }
  }

  &__category-title {
    margin: 0 0 var(--space-l);
    font-size: 1.5rem;
    color: var(--color-foreground);
  }

  &__category-content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--space-l);
  }
}
</style>
