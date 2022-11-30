<script setup lang="ts">
import ButtonMain from '../design/ButtonMain.vue';
import InputMain from '../design/InputMain.vue';
import PopupMain from './PopupMain.vue';
import type { Tag } from '../../types/file.types';

interface PopupLinkChangeProps {
  url: string,
  title: string,
  tags: Tag[]
}
defineProps<PopupLinkChangeProps>();
defineEmits(['close']);

// TODO: Handle changes into file
</script>

<template>
  <PopupMain @close="$emit('close')">
    <div class="popup-link-change">
      <h2 class="popup-link-change__title">
        Change Link
      </h2>
      <form
        action="#"
        class="popup-link-change__form edit-link"
      >
        <label class="edit-link__label">Link title</label>
        <InputMain :value="title" class="edit-link__input" />
        <label class="edit-link__label">Link URL</label>
        <InputMain :value="url" class="edit-link__input" />
        <label class="edit-link__label">Link tags</label>
        <InputMain placeholder="Tags, separated, with, comma" :value="tags.map(tag => tag.name).join(', ')" class="edit-link__input" />
        <div class="edit-link__footer">
          <ButtonMain
            class="edit-link__button edit-link__button_cancel"
            text="Close"
            @click="$emit('close')"
          />
          <ButtonMain
            class="edit-link__button edit-link__button_ok"
            text="Change"
          />
        </div>
      </form>
    </div>
  </PopupMain>
</template>

<style scoped lang="scss">
.popup-link-change {
  padding: 16px;
  width: 400px;

  &__title {
    text-align: center;
  }

  &__form {
    margin-top: 16px;
  }
}

.edit-link {
  &__input + &__label {
    margin-top: 16px;
  }

  &__label {
    color: var(--color-normal-300);
    display: block;
    font-size: 12px;
  }

  &__input {
    width: 100%;
  }

  &__footer {
    margin-top: 32px;
    display: flex;
    justify-content: space-around;
  }

  &__button {
    width: 30%;

    &_ok {
      background-color: var(--color-blue-light);
    }

    &_cancel {
      background-color: var(--color-red-light);
    }
  }
}
</style>