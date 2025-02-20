<script setup lang="ts">
import { useBemm } from 'bemm';

const bemm = useBemm('page-transition',{
  return: 'string'
});
</script>

<template>
  <transition
    :enter-active-class="bemm('enter-active') as string"
    :enter-from-class="bemm('enter-from') as string"
    :enter-to-class="bemm('enter-to') as string"
    :leave-active-class="bemm('leave-active') as string"
    :leave-from-class="bemm('leave-from') as string"
    :leave-to-class="bemm('leave-to') as string"
    mode="out-in"
  >
    <slot></slot>
  </transition>
</template>

<style lang="scss">
.page-transition {
  &__enter-active,
  &__leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease-out;
  }

  &__enter-from {
    opacity: 0;
    transform: translateX(20px);
  }

  &__leave-to {
    opacity: 0;
    transform: translateX(-20px);
  }
}
</style>
