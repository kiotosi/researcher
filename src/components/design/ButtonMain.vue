<script setup lang="ts">
defineProps({
  text: {
    required: true,
    type: String,
  },
  isDisabled: Boolean,
});
</script>

<template>
  <div
    class="button"
    :class="{ button_disabled: isDisabled }"
  >
    {{ text }}
  </div>
</template>

<style scoped lang="scss">
.button {
  padding: 8px;
  background-color: var(--color-normal-30);
  color: var(--color-normal-900);
  border-radius: 4px;
  border: 1px solid var(--color-normal-50);
  text-align: center;
  font-weight: 600;
  user-select: none;
  cursor: pointer;

  &_disabled {
    color: var(--color-normal-70);
    background-color: var(--color-normal-20);
    cursor: not-allowed;
  }
}
</style>
