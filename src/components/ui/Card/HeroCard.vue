<template>
  <div :class="[bemm('', colorScheme)]">
    <div :class="bemm('content')">
      <h2 :class="bemm('title')">{{ title }}</h2>
      <p :class="bemm('description')">{{ description }}</p>
      <slot></slot>
    </div>
    <div v-if="imageUrl" :class="bemm('image')">
      <img :src="imageUrl" :alt="title" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBemm } from 'bemm';

const bemm = useBemm('hero-card');

type ColorScheme = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'accent';

defineProps<{
  title: string;
  description: string;
  imageUrl?: string;
  colorScheme?: ColorScheme;
}>();
</script>

<style lang="scss">
.hero-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
  padding: var(--space-xl);
  background: var(--color-background);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: transform 0.3s ease;

  @media (min-width: 48em) {
    grid-template-columns: 1fr 1fr;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--space);
  }

  &__title {
    font-size: 2.5em;
    margin: 0;
    color: var(--color-primary);

  }

  &__description {
    font-size: 1.2em;
    margin: 0;
    color: var(--color-foreground-alt);
    line-height: 1.6;
  }

  &__image {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: var(--border-radius);
    }
  }

  &--accent {
    background: color-mix(in srgb, var(--color-accent), transparent 90%);
  }

  &--primary {
    background: color-mix(in srgb, var(--color-primary), transparent 90%);
  }

  &--secondary {
    background: color-mix(in srgb, var(--color-secondary), transparent 90%);
  }

  &--tertiary {
    background: color-mix(in srgb, var(--color-tertiary), transparent 90%);
  }

  &--quaternary {
    background: color-mix(in srgb, var(--color-quaternary), transparent 90%);
  }
}
</style>
