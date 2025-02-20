<template>
  <div :class="[bemm('', [colorScheme, layout, size])]">
    <div v-if="icon" :class="bemm('icon')">
      <Icon :name="icon" />
    </div>
    <div :class="bemm('content')">
      <h3 :class="bemm('title')">{{ title }}</h3>
      <p :class="bemm('description')">{{ description }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBemm } from 'bemm';
import { type PropType } from "vue";
import Icon from '../Icon/Icon.vue';

const bemm = useBemm('tech-feature-card');

type ColorScheme = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'accent';
type Layout = 'vertical' | 'horizontal';
type Size = 'small' | 'medium' | 'large';

defineProps({
  icon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  colorScheme: {
    type: String as PropType<ColorScheme>,
    default: 'primary',
  },
  layout: {
    type: String as PropType<Layout>,
    default: 'vertical',
  },
  size: {
    type: String as PropType<Size>,
    default:'medium',
  }
})
 </script>

<style lang="scss">
.tech-feature-card {
  padding: var(--space-xl);
  background: var(--color-background);
  border-radius: var(--border-radius);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &__icon {
    color: var(--color-primary);
    font-size: 2em;
  }

  &__title {
    margin: 0 0 var(--space-s);
    font-size: 1.25em;
  }

  &__description {
    margin: 0;
    color: var(--color-foreground-alt);
    line-height: 1.5;
  }

  &--horizontal {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-l);
    align-items: center;


  }

  &--small {
    padding: var(--space);
    font-size: 0.9em;
  }

  &--medium {
    padding: var(--space-l);
  }

  &--large {
    padding: var(--space-xl);
    font-size: 1.1em;
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

  &--accent {
    background: color-mix(in srgb, var(--color-accent), transparent 90%);
  }
}
</style>
