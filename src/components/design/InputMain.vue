<script setup lang="ts">
defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
    required: false
  }
});
</script>

<template>
  <input
    :placeholder="placeholder"
    :value="value"
    class="input"
    type="text"
  >
</template>

<style scoped lang="scss">
.input {
  background-color: var(--color-normal-20);
  border: 1px solid var(--color-normal-30);
  color: var(--color-normal-800);
  outline: none;
  padding: 10px 12px;
  border-radius: 4px;
  font-weight: 500;

  &::placeholder {
    color: var(--color-normal-90);
  }
}
</style>
