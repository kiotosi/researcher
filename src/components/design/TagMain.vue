<script setup lang="ts">
defineProps({
  name: {
    required: true,
    type: String,
  },
  isActive: Boolean,
});
</script>

<template>
  <div class="tag" :class="{ tag_active: isActive }">
    <span class="tag__hash">#</span>
    {{ name }}
  </div>
</template>

<style scoped lang="scss">
.tag {
  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content;
  padding: 4px 6px;

  background-color: var(--color-normal-20);
  border: 1px solid var(--color-normal-30);
  border-radius: 4px;
  color: var(--color-normal-700);

  font-size: var(--fz-small);
  cursor: pointer;
  user-select: none;

  &__hash {
    color: var(--color-normal-200);
  }

  &:hover {
    background-color: var(--color-normal-40);
    border: 1px solid var(--color-normal-50);
  }

  &_active {
    background-color: var(--color-normal-30);
    border: 1px solid var(--color-normal-40);
  }
}
</style>
