<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive, ref } from 'vue';

const contextMenuRef = ref<HTMLElement | undefined>();
const emit = defineEmits(['close']);
const props = defineProps({
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  }
});

const coordinates = reactive({
  x: props.x,
  y: props.y
});

onMounted(() => {
  document.addEventListener('click', () => emit('close'));
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  nextTick(() => {

    if (!contextMenuRef.value) {
      return;
    }

    // If contextmenu is overflowing width
    if (props.x + contextMenuRef.value.clientWidth > windowWidth) {
      const emptySpace = windowWidth - props.x;
      coordinates.x = windowWidth - (emptySpace + contextMenuRef.value.clientWidth);
    }

    // If contextmenu is overflowing height
    if (props.y + contextMenuRef.value.clientHeight > windowHeight) {
      const emptySpace = windowHeight - props.y;
      coordinates.y = windowHeight - (emptySpace + contextMenuRef.value.clientHeight);
    }
  });
});

onUnmounted(() => {
  document.removeEventListener('click', () => emit('close'));
});
</script>

<template>
  <div ref="contextMenuRef" :style="{'top': coordinates.y + 'px', 'left': coordinates.x + 'px'}" class="context-menu">
    <slot />
  </div>
</template>

<style lang="scss">
.context-menu {
  padding: 8px;
  background-color: var(--color-normal-0);
  position: absolute;
  border-radius: 4px;
  border: 1px solid var(--color-normal-20);
  min-width: 240px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.05);

  div {
    width: 100%;
    padding: 2px 8px;
    cursor: pointer;
    border-radius: 2px;
    user-select: none;

    &:hover {
      background-color: var(--color-normal-30);
    }
  }

  div + div {
    margin-top: 4px;
  }
}
</style>