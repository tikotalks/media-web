<script setup lang="ts">
import { type Image } from '../composables/useImages';
import { useRouter } from 'vue-router';
import { Icons } from "open-icon";
import Icon from "./ui/Icon.vue";
import ContextMenu from './ui/ContextMenu/ContextMenu.vue';
import type { ContextMenuConfig } from './ui/ContextMenu/ContextMenu.model';
import { ref, onMounted } from 'vue';

const props = defineProps<{
  image: Image
}>();

const router = useRouter();
const imageRef = ref<HTMLImageElement | null>(null);
const isIntersecting = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      isIntersecting.value = entry.isIntersecting;
    },
    {
      rootMargin: '300px'
    }
  );

  if (imageRef.value) {
    observer.observe(imageRef.value);
  }
});

const navigateToDetail = (id: string) => {
  router.push({ name: 'image-detail', params: { id } });
};

const config: ContextMenuConfig = {
  id: 'image-card-context-menu',
  clickMode: 'short',
  position: 'click',
  menu: [
    { label: 'View', icon: Icons.EYE, action: () => navigateToDetail(props.image.id) },
    {
      label: 'Download', icon: Icons.ARROW_DOWNLOAD,
      children: [
        { label: 'Small', icon: Icons.IMAGE, action: () => downloadImage('small') },
        { label: 'Medium', icon: Icons.IMAGE, action: () => downloadImage('medium') },
        { label: 'Large', icon: Icons.IMAGE, action: () => downloadImage('large') },
      ]
    },
  ]
}

const downloadImage = async (size: string) => {
  const getUrl = () => {
    switch (size) {
      case 'small':
        return props.image.url.thumbnail;
      case 'medium':
        return props.image.url.medium;
      case 'large':
        return props.image.url.original;
      default:
        return props.image.url.original;
    }
  };

  try {
    const link = document.createElement('a')
    link.href = getUrl()
    link.download = `${props.image.name}-original.jpg`
    link.click()
  } catch (error) {
    console.error('Error downloading image:', error);
  }
}


</script>

<template>
  <div v-if="image" class="image-card">
    <div class="image-card__actions">
      <ContextMenu :config="config">
        <button class="image-card__context-button">
          <Icon :name="Icons.THREE_DOTS_HORIZONTAL" />
        </button>
      </ContextMenu>

    </div>
    <img
      :src="isIntersecting ? image.url.thumbnail : undefined"
      :alt="image.name"
      class="image-card__image"
      ref="imageRef"
      loading="lazy"
    />
    <div class="image-card__content" @click="navigateToDetail(image.id)">
      <h3 class="image-card__title">{{ image.name }}</h3>
      <p class="image-card__description">{{ image.description }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.image-card {
  border-radius: calc(var(--border-radius) + var(--space));
  overflow: hidden;
  background: var(--color-background);
  transition: transform var(--transition-normal);
  cursor: pointer;
  position: relative;

  &:hover {
    // transform: translateY(calc(var(--space-xs) * -1));

    .image-card__content{
      transform: translateY(0);
      opacity: 1;
    }
  }

  &__image {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
  }

  &__content {
    margin: var(--space);
    border-radius: var(--border-radius);
    position: absolute;
    left: 0;
    bottom: 0;
    padding: var(--space);
    z-index: 1;
    background-color: color-mix(in srgb, var(--color-background), transparent 50%);
    transform: translateY(50%);
    opacity: 0;
    transition: .3s ease-in-out;
    //backdrop-filter: blur(0px);
  }


  &__actions {
    position: absolute;
    right: var(--space);
    top: var(--space);
  }

  &__context-button {
    width: 2em;
    height: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-primary);
    border-radius: var(--border-radius);
    color: var(--text-primary);
  }

  &__title {
    color: var(--color-foreground);
  }

  &__description {}

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
  }

  &__tag {
    background: var(--color-background-alt);
    color: var(--color-foreground);
    padding: var(--space-xs) var(--space-s);
    border-radius: var(--border-radius-sm);
    font-size: 0.8rem;
  }
}
</style>
