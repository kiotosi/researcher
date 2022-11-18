<script setup lang="ts">
defineEmits(['close']);
</script>

<template>
  <div class="mask" @click="$emit('close')" />
  <div class="modal">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.mask {
  position: absolute;
  z-index: 500;
  background-color: hsla(0, 0, 0, 0.2);
  inset: 0;
}

.modal {
  position: absolute;
  z-index: 501;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-normal-20);
  border: 1px solid var(--color-normal-30);
  border-radius: 4px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.05);

  // Proportion should be smtng like: 1/4
  min-width: 200px;
  min-height: 50px;
}
</style>
