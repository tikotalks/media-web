<template>
  <div :class="bemm()">
    <div :class="bemm('items')">
      <Tag
        v-for="tag in displayedTags"
        :key="tag"
        :label="tag"
        :active="selectedTags.includes(tag)"
        @click="$emit('toggle', tag)"
      />
      <button
        v-if="hasMoreTags"
        :class="bemm('more', [showAll ? 'active' : ''])"
        @click="showAll = !showAll"
      >
        {{ showAll ? 'Show less' : `+${remainingTags} more` }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBemm } from 'bemm'
import Tag from './Tag.vue'

const bemm = useBemm('tag-list')

const props = defineProps<{
  tags: string[]
  selectedTags: string[]
  limit?: number
}>()

defineEmits<{
  (e: 'toggle', tag: string): void
}>()

const showAll = ref(false)

const displayedTags = computed(() => {
  if (showAll || !props.limit) return props.tags
  return props.tags.slice(0, props.limit)
})

const hasMoreTags = computed(() => {
  return props.tags.length > (props.limit || props.tags.length)
})

const remainingTags = computed(() => {
  if (!props.limit) return 0
  return props.tags.length - props.limit
})
</script>

<style lang="scss">
.tag-list{
  &__items{
    display: flex;
  gap: var(--space-s);
  flex-wrap: wrap;

  }
}
</style>
