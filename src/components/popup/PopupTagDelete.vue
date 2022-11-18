<script setup lang="ts">
import PopupMain from './PopupMain.vue';
import ButtonMain from '../design/ButtonMain.vue';
const emit = defineEmits(['close']);
</script>

<template>
  <PopupMain @close="$emit('close')">
    <div class="popup-tag-delete">
      <div class="popup-tag-delete__title">Are you sure you want to delete tag?</div>
      <div class="popup-tag-delete__footer">
        <ButtonMain text="No" class="popup-tag-delete__button popup-tag-delete__button_no" />
        <ButtonMain text="Yes" class="popup-tag-delete__button popup-tag-delete__button_yes" />
      </div>
    </div>
  </PopupMain>
</template>

<style scoped lang="scss">
.popup-tag-delete {
  &__title {
    
  }
  &__footer {
    display: flex;
    justify-content: space-between;
  }
}
</style>