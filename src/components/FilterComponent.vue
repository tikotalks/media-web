<script setup lang="ts">
import { useImages } from '../composables/useImages';
import { computed } from 'vue';

const { filterState, updateFilters, filteredImages, state } = useImages();
const totalImages = computed(() => state.images.length);
const filteredImagesCount = computed(() => {
  if (filteredImages.value.type === 'flat') {
    return filteredImages.value.data.length;
  } else {
    return filteredImages.value.data.reduce((total, [_, images]) => total + images.length, 0);
  }
});

const updateFilter = () => {
  updateFilters(filterState.value);
};
</script>

<template>
  <div class="filter-component">
    <div class="filter-component__stats">
      <template v-if="filteredImagesCount == totalImages">
        Showing all {{ totalImages }} images
      </template>
      <template v-else>
        Showing {{ filteredImagesCount }} of {{ totalImages }} images
      </template>
    </div>
    <div class="filter-component__row">
      <div class="filter-component__search">
        <input
          type="text"
          v-model="filterState.search"
          placeholder="Search images..."
          @input="updateFilter"
          class="filter-component__input"
        />
      </div>

      <div class="filter-component__sort">
        <select v-model="filterState.sortBy" @change="updateFilter" class="filter-component__select">
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date</option>
          <option value="category">Group by Category</option>
        </select>

        <button
          @click="filterState.sortOrder = filterState.sortOrder === 'asc' ? 'desc' : 'asc'; updateFilter()"
          class="filter-component__button"
        >
        order
          {{ filterState.sortOrder === 'asc' ? '↑' : '↓' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.filter-component {

  --border-color:  color-mix(in srgb, var(--color-foreground), transparent 80%);

  &__stats {
    text-align: right;
    color: var(--color-foreground);
    font-size: 0.9rem;
  }

  &__row {
    display: flex;
    gap: var(--space);
    align-items: center;
    justify-content: space-between;
    background: var(--color-background);
    padding: var(--space);
    border-radius: var(--border-radius);
    // border: 1px solid var(--border-color);
  }

  &__search {
    flex: 1;
  }

  &__input {
    width: 100%;
    padding: var(--space);
    border: 1px solid  var(--border-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
    background-color: transparent;
    color: currentColor;

    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }

  &__sort {
    display: flex;
    gap: var(--space-s);
    align-items: center;
  }

  &__select {
    padding: var(--space);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--color-background);
    font-size: 1rem;
color: currentColor;

    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }

  &__button {
    padding: var(--space);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--color-background);
    cursor: pointer;
    font-size: 1rem;
    color: currentColor;

    &:hover {
      background: var(--color-background-alt);
    }
  }
}
</style>
