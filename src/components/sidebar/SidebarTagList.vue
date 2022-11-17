<script setup lang="ts">
import type {Tag} from '../../types/file.types';
import TagMain from '../design/TagMain.vue';

// TODO: Make tagStore
const tagList: Tag[] = [
  {
    name: 'work',
    id: 0
  },
  {
    name: 'home',
    id: 1
  }
]
</script>

<template>
  <ul class="sidebar-taglist">
    <li v-for="tag in tagList" :key="tag.id"  class="sidebar-taglist__item">
      <TagMain :name="tag.name" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.sidebar-taglist {
  display: flex;
  margin-top: 18px;
  flex-wrap: wrap;
  gap: 8px;
}
</style>