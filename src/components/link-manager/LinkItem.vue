<script setup lang="ts">
import { open } from '@tauri-apps/api/shell';
import type { Tag } from '../../types/file.types';
import TagMain from '../design/TagMain.vue';

interface LinkItemProps {
  title: string,
  url: string,
  tags: Tag[]
}

defineProps<LinkItemProps>();
</script>

<template>
  <div
    class="link"
    @click="open(url)"
  >
    <h2 class="link__title">
      {{ title }}
    </h2>
    <div class="link__url">
      {{ url }}
    </div>
    <ul class="link__tags taglist">
      <li
        v-for="tag in tags"
        :key="tag.id"
        class="taglist__item"
      >
        <TagMain :name="tag.name" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.link {
  padding: 16px 24px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  background-color: var(--color-normal-20);
  border: 1px solid var(--color-normal-30);

  &:hover {
    background-color: var(--color-normal-30);
  }

  &__url {
    margin-top: 8px;
    color: var(--color-blue);

    &:hover {
      color: var(--color-blue-hover);
    }
  }
}
</style>
