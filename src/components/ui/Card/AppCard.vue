<template>
  <article :class="bemm()">
    <div :class="bemm('icon')">
      <Icon :name="icon" size="large" />
    </div>
    <div v-if="image" :class="bemm('image')">
      <img :src="image" :alt="title" />
    </div>
    <div :class="bemm('content')">
      <h3 :class="bemm('title')">{{ title }}</h3>

      <p :class="bemm('description')">{{ description }}</p>
      <div :class="bemm('actions')">
        <slot name="actions"></slot>
      </div>
      <div :class="bemm('tags')">
        <span v-for="tag in tags" :key="tag" :class="bemm('tag')">#{{ tag }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useBemm } from 'bemm';
import Icon from '../Icon/Icon.vue';
import { Icons } from 'open-icon';

interface Props {
  title: string;
  description: string;
  icon: Icons;
  tags?: string[];
  image?: string | null;
}

defineProps<Props>();
const bemm = useBemm('app-card');
</script>

<style lang="scss">
.app-card {
  display: flex;
  flex-direction: row;
  background: var(--color-background-light);
  border-radius: var(--border-radius);
  padding: var(--space-l);
  width: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  gap: var(--space);
  align-items: flex-start;
  position: relative;

  animation: itemIn linear forwards, itemOut linear forwards;
  animation-timeline: view();
  animation-range: entry, exit;

  @media screen and (max-width: 960px) {
    flex-direction: column;
  }

  @keyframes itemIn {
    0% {
      opacity: 0;
      transform: translateY(100%);
      z-index: 0;
    }

    100% {
      opacity: 1;
      transform: translateY(0%);
      z-index: 3;
    }
  }

  @keyframes itemOut {
    0% {
      opacity: 1;
      transform: translateY(0%);
      z-index: 3;
    }

    100% {
      opacity: 0;
      transform: translateY(-100%);
      z-index: 0;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    gap: var(--space-m);
    margin-bottom: var(--space-m);
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    height: 1.5em;
    width: 1.5em;
    position: absolute;
    left: 0;
    top: 0;

    background: var(--color-primary);
    color: var(--text-primary);
    border-radius: var(--border-radius);
  }

  &__title-group {
    flex: 1;
  }

  &__title {
    margin: 0;
    font-size: 1.25em;
    color: var(--color-text);
  }

  &__tags {
    display: flex;
    gap: var(--space-s);
  }

  &__tag {
    font-size: 0.8em;
    padding: 0.2em 0.6em;

    color: var(--text-primary);
    border-radius: var(--border-radius);
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
  }

  &__image {
    margin: var(--space-m) 0;
    border-radius: var(--border-radius);
    overflow: hidden;
    aspect-ratio: 1/1;
    width: 10em;
    flex-shrink: 0;
    height: auto;

    @media screen and (max-width: 960px) {
      width: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space);
  }

  &__description {
    margin: 0;
    color: var(--color-text-light);
    line-height: 1.5;
  }

  &__actions {
    display: flex;
    gap: var(--space-m);
  }
}
</style>
