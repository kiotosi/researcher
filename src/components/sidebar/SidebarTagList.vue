<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTagStore } from '../../store/tagStore';
import TagMain from '../design/TagMain.vue';
import PopupTagDelete from '../popup/PopupTagDelete.vue';

const tagStore = useTagStore();
const tagList = computed(() => tagStore.tags);
const isDeleteMode = ref(false);
const isDeletePopupShowed = ref(false);
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