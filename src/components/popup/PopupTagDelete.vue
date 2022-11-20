<script setup lang="ts">
import PopupMain from './PopupMain.vue';
import ButtonMain from '../design/ButtonMain.vue';
defineEmits(['close', 'delete']);
</script>

<template>
  <PopupMain @close="$emit('close')">
    <div class="popup-tag-delete">
      <div class="popup-tag-delete__title">
        Are you sure want to delete tag?
      </div>
      <div class="popup-tag-delete__text">
        If you delete this tag - it will dissapear from
        <i>all your linked items</i>!<br>
        You cannot restore this tag.
      </div>
      <div class="popup-tag-delete__footer">
        <ButtonMain
          text="No"
          class="popup-tag-delete__button popup-tag-delete__button_no"
          @click="$emit('close')"
        />
        <ButtonMain
          text="Yes"
          class="popup-tag-delete__button popup-tag-delete__button_yes"
          @click="$emit('delete')"
        />
      </div>
    </div>
  </PopupMain>
</template>

<style scoped lang="scss">
.popup-tag-delete {
  padding: 16px;
  width: 600px;

  &__title {
    font-size: var(--fz-header-3);
    font-weight: 600;
    text-align: center;
  }

  &__text {
    margin-top: 16px;
  }

  &__footer {
    margin-top: 24px;
    display: flex;
    gap: 16px;
    justify-content: space-between;
  }

  &__button {
    width: 150px;

    &_no {
      background-color: var(--color-red-light-active);

      &:hover {
        background-color: var(--color-red-light-hover);
      }
    }

    &_yes {
      background-color: var(--color-blue-light-active);

      &:hover {
        background-color: var(--color-blue-light-hover);
      }
    }
  }
}
</style>
