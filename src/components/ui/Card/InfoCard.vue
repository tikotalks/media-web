<template>
  <div :class="bemm('', ['', 'colorScheme'])">
    <div :class="[bemm('icon'), 'blob']">
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
import Icon from '../Icon/Icon.vue';

const bemm = useBemm('info-card');

type ColorScheme = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'accent';

defineProps<{
  icon: string;
  title: string;
  description: string;
  colorScheme?: ColorScheme;
}>();
</script>

<style lang="scss">
.info-card {
  padding: var(--spacing);
  background: var(--color-background);
  border-radius: var(--border-radius);
  transition: transform 0.3s ease;
  height: 100%;
  position: relative;

  max-width: calc(100vw - (var(--spacing) * 2));

  @media screen and (max-width: 960px){
    padding: var(--space-l);
  }

  &:hover {
    transform: translateY(-2px);
  }

  &__icon {
    font-size: 4em;
    background-color: color-mix(in srgb, var(--color-primary), transparent 33.33%);
    color: var(--text-primary);
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -.75em;
    left: -.75em;
    backdrop-filter: blur(4px);

    @media screen and (max-width: 960px){
      font-size: 2.5em;
      top: -.5em;
      left: -.5em;
    }

    .icon {
      text-shadow: 2px 2px 0 rgba(0, 0, 0, 1);
      filter: drop-shadow(2px 2px 2px rgba(0,0,0,.25));

    }

  }

  &__title {
    margin: 0 0 var(--space-s);
    font-size: 1.25em;
  }

  &__description {
    margin: 0;
    color: var(--color-foreground-alt);
    line-height: 1.5;
    opacity: .75;
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
