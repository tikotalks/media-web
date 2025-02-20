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
      <h1 class="docs__title">@tikotalks/media Package Documentation</h1>

      <section class="docs__section">
        <h2>Overview</h2>
        <p>The @tikotalks/media package provides a robust solution for managing and displaying media assets in your application. It offers features for image management, optimization, and display with a focus on performance and user experience.</p>
      </section>

      <section class="docs__section">
        <h2>Installation</h2>
        <pre class="docs__code">npm install @tikotalks/media</pre>
      </section>

      <section class="docs__section">
        <h2>Key Features</h2>
        <ul class="docs__list">
          <li>Image optimization and resizing</li>
          <li>Automatic thumbnail generation</li>
          <li>Responsive image loading</li>
          <li>Image metadata management</li>
          <li>Tag-based organization</li>
        </ul>
      </section>

      <section class="docs__section">
        <h2>Usage</h2>
        <p>Import and use the package in your Vue.js application:</p>
        <pre class="docs__code">import { useImages } from '@tikotalks/media';

// In your component
const { getAllImages, getImageDetails, filterState } = useImages();</pre>
      </section>

      <section class="docs__section">
        <h2>API Reference</h2>
        <h3>useImages()</h3>
        <p>The main composable that provides access to image management functionality.</p>

        <h4>Methods</h4>
        <ul class="docs__list">
          <li><strong>getAllImages()</strong> - Retrieves all available images</li>
          <li><strong>getImageDetails(id)</strong> - Gets detailed information for a specific image</li>
          <li><strong>updateFilters(filters)</strong> - Updates the current filter state</li>
        </ul>

        <h4>Properties</h4>
        <ul class="docs__list">
          <li><strong>filterState</strong> - Reactive object containing current filter settings</li>
          <li><strong>loading</strong> - Boolean indicating if images are being loaded</li>
          <li><strong>filteredImages</strong> - Computed property returning filtered images</li>
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

  &__code {
    background: var(--color-background-alt);
    padding: var(--space);
    border-radius: var(--border-radius);
    font-family: monospace;
    overflow-x: auto;
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
