<template>
  <div v-html="iconData" :class="bemm()"></div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Icons, getIcon } from "open-icon";
import { useBemm } from "bemm";

const { bemm } = useBemm('icon');

interface Props {
  name: string;
}

const props = defineProps<Props>();

const iconData = ref();

const loadIcon = async () => {
  const iconLoadData = await getIcon(props.name as Icons);
  iconData.value = iconLoadData;
};

loadIcon();

watch(
  () => props.name,
  loadIcon
);
</script>

<style lang="scss">
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  height: 1em;
  width: 1em;

  svg {
    display: block;
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;

    path,
    circle,
    rect,
    polygon,
    polyline,
    ellipse,
    line {
      stroke: currentColor;
      fill: currentColor;
    }
  }
}
</style>
