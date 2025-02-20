<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <div class="header__container">
      <h1>
        <RouterLink to="/">tiko</RouterLink>
        <span>media</span>
      </h1>

    </div>
  </header>
  <RouterView />
</template>

<style lang="scss">
.header {
  &__container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}

h1 {
  a {
    text-decoration: none;
    color: var(--color-foreground);
    text-shadow: 1px 1px 3px var(--color-dark), 3px 3px 0px var(--color-primary), -3px -3px 0px var(--color-secondary);

    &:hover {
    text-decoration: none;
      color: var(--color-primary);
    }
  }
  span{
    font-family: var(--font-secondary);
    margin-left: .25em;
    font-size: .5em;
    color: var(--color-primary)
  }

}
</style>
