<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <main class="docs">
    <nav class="docs__nav">
      <button @click="router.back()" class="docs__back">← Back</button>
    </nav>

    <div class="docs__content">
      <h1 class="docs__title">Image Guidelines</h1>

      <section class="docs__section">
        <h2>Image Requirements</h2>
        <p>To ensure consistent quality and performance across the platform, please follow these image requirements:</p>

        <h3>Technical Specifications</h3>
        <ul class="docs__list">
          <li><strong>Format:</strong> JPEG, PNG, or WebP</li>
          <li><strong>Maximum file size:</strong> 5MB</li>
          <li><strong>Recommended dimensions:</strong> 1920x1080px or larger</li>
          <li><strong>Aspect ratio:</strong> 16:9 or 1:1 (square)</li>
          <li><strong>Color space:</strong> sRGB</li>
        </ul>
      </section>

      <section class="docs__section">
        <h2>Best Practices</h2>
        <ul class="docs__list">
          <li>Use high-quality, clear images without excessive noise or compression artifacts</li>
          <li>Ensure proper lighting and contrast in your images</li>
          <li>Avoid text overlays in images when possible</li>
          <li>Use descriptive filenames that reflect the image content</li>
          <li>Include relevant metadata and tags for better searchability</li>
        </ul>
      </section>

      <section class="docs__section">
        <h2>Metadata Guidelines</h2>
        <p>Each image should include the following metadata:</p>
        <ul class="docs__list">
          <li><strong>Name:</strong> A clear, descriptive title</li>
          <li><strong>Description:</strong> A brief explanation of the image content</li>
          <li><strong>Tags:</strong> Relevant keywords for categorization and search</li>
          <li><strong>Alt text:</strong> Accessible description for screen readers</li>
        </ul>
      </section>

      <section class="docs__section">
        <h2>Optimization</h2>
        <p>The system automatically handles:</p>
        <ul class="docs__list">
          <li>Thumbnail generation for grid views</li>
          <li>Responsive image sizing</li>
          <li>Image compression</li>
          <li>Format conversion for optimal delivery</li>
        </ul>
      </section>

      <section class="docs__section">
        <h2>Usage Context</h2>
        <p>Images in the system are used in various contexts:</p>
        <ul class="docs__list">
          <li><strong>Grid View:</strong> Displayed as square thumbnails in the main gallery</li>
          <li><strong>Detail View:</strong> Full-size image with complete metadata</li>
          <li><strong>API Access:</strong> Available through the media API for other applications</li>
        </ul>
      </section>
    </div>
  </main>
</template>

<style lang="scss">
.docs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  &__nav {
    margin-bottom: 2rem;
  }

  &__back {
    background: none;
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 300ms;

    &:hover {
      background-color: var(--color-background-alt);
    }
  }

  &__content {
    background: var(--color-background);
    border-radius: var(--border-radius);
    padding: var(--space-xl);
  }

  &__title {
    margin: 0 0 2rem;
    color: var(--color-foreground);
  }

  &__section {
    margin: 2rem 0;

    h2 {
      color: var(--color-foreground);
      margin: 1.5rem 0 1rem;
    }

    h3 {
      color: var(--color-foreground);
      margin: 1.5rem 0 0.5rem;
    }

    h4 {
      color: var(--color-foreground);
      margin: 1rem 0 0.5rem;
    }
  }

  &__list {
    list-style: disc;
    margin-left: 1.5rem;

    li {
      margin: 0.5rem 0;
    }
  }
}
</style>
