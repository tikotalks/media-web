<template>
  <div :class="[bemm('', colorScheme)]">
    <div :class="bemm('graphic')">
      <div :class="[bemm('number'),'blob']">{{ step + 1 }}</div>
      <div :class="bemm('icon')">
        <Icon :name="icon" />
      </div>
    </div>
    <div :class="bemm('content')">
      <h2 :class="bemm('title')">{{ title }}</h2>
      <p :class="bemm('description')">{{ description }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBemm } from 'bemm';
import Icon from '../Icon/Icon.vue';

const bemm = useBemm('step-card');

type ColorScheme = 'primary' | 'secondary' | 'tertiary';

defineProps<{
  icon: string;
  title: string;
  description: string;
  colorScheme?: ColorScheme;
  step: number;
}>();
</script>

<style lang="scss">
.step-card {
  padding: var(--space-xl);
  background: transparent;
  border-radius: var(--border-radius);
  transition: transform 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: row;

  &:nth-child(2n) {
    flex-direction: row-reverse;

    .step-card__content {
      text-align: right;
    }
  }

  &:hover {
    transform: translateY(-2px);
  }

  &__content {
    text-align: left;
  }

  &__graphic {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    color: var(--color-secondary);
    font-size: 10em;
    --icon-stroke-width: 2;
  }

  &__title {

  }

  &__description {

    color: var(--color-foreground-alt);
  }



  &__number {

    width: 2.5em;
    height: 2.5em;
    // background: var(--color-primary);
    color: var(--text-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.5em;
    z-index: 1;
    border: 4px solid var(--color-primary);
  }

  &--primary {
    border-left: 4px solid var(--color-primary);
  }

  &--secondary {
    border-left: 4px solid var(--color-secondary);
  }

  &--tertiary {
    border-left: 4px solid var(--color-tertiary);
  }
}
</style>
