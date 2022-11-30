<script setup lang="ts">
import PopupMain from './PopupMain.vue';
import ButtonMain from '../design/ButtonMain.vue';
import type { Link } from '../../types/linkmanager.types';

defineEmits(['close']);
defineProps<{link: Link}>();
</script>

<template>
  <PopupMain @close="$emit('close')">
    <div class="popup-link-delete">
      <h2 class="popup-link-delete__title">Are you sure want to delete the link?</h2>
      <p class="popup-link-delete__text">
        Link "{{link.title}}" will be deleted permanently. There is no way you can restore it. Are you sure about deleting it?
      </p>
      <div class="popup-link-delete__footer">
        <ButtonMain
          class="popup-link-delete__button popup-link-delete__button_close"
          text="Close"
          @click="$emit('close')"
        />
        <ButtonMain
          class="popup-link-delete__button popup-link-delete__button_accept"
          text="Delete"
        />
      </div>
    </div>
  </PopupMain>
</template>

<style scoped lang="scss">
.popup-link-delete {
  width: 700px;
  padding: 16px;

  &__title {
    text-align: center;
  }

  &__text {
    margin-top: 16px;
  }
  
  &__footer {
    display: flex;
    margin-top: 24px;
    justify-content: space-around;
  }

  &__button {
    width: 280px;
  }
}
</style>