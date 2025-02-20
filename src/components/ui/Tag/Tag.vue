<template>
  <button :class="bemm('', ['',active ? 'active' : 'inactive'])" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { useBemm } from 'bemm'

const bemm = useBemm('tag')

defineProps<{
  label: string
  active?: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style lang="scss">
.tag {
  display: inline-flex;
  align-items: center;
  padding: var(--space-s) var(--space);
  border: none;
  border-radius: 100px;
  background: var(--color-background);
  color: var(--color-foreground);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: color-mix(in srgb, var(--color-foreground), transparent 75%);
  }

  &--active {
    background: var(--color-primary);
    color: var(--text-primary);
  }
}
</style>
