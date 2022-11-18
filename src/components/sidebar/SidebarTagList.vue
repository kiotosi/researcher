<script setup lang="ts">
import TagMain from '../design/TagMain.vue';
import TrashIcon from 'vue-material-design-icons/Delete.vue';
import PopupTagDelete from '../popup/PopupTagDelete.vue';
import errors from '../../data/error.define';
import { computed, ref } from 'vue';
import { useTagStore } from '../../store/tagStore';
import { saveTagList } from '../../service/tagBus';
import { useConfigStore } from '../../store/configStore';
import type { Tag } from '../../types/file.types';

const configStore = useConfigStore();
const tagStore = useTagStore();
const tagList = computed(() => tagStore.tags);
const currentTag = computed(() => tagStore.currentTag);
const isDeleteMode = ref(false);
const removedTag = ref<Tag | null>(null);
const isDeletePopupShowed = ref(false);

/**
 * Toggle tag
 * @param tag - Selected tag
 */
function selectTag(tag: Tag) {
  // Delete tag
  if (isDeleteMode.value) {
    removedTag.value = tag;
    isDeletePopupShowed.value = true;
    return;
  }

  // Toggle tag
  if (currentTag.value?.id === tag.id) {
    tagStore.currentTag = null;
    return;
  }

  // Select tag
  tagStore.currentTag = tag;
}

/**
 * Delete a tag
 */
async function deleteTag() {
  if (!removedTag.value) {
    console.error(errors.delete.tag);
    return;
  }

  tagStore.deleteTag(removedTag.value.id);

  try {
    await saveTagList(configStore.currentWorkspace, tagStore.tags);
  } catch (e) {
    console.error(errors.save.file.tag, e);
  }

  removedTag.value = null;
  isDeletePopupShowed.value = false;

  // TODO: Implement deletion from all content items
}
</script>

<template>
  <div class="sidebar-taglist">
    <TrashIcon
      :size="21"
      class="sidebar-taglist__trash"
      :class="{ 'sidebar-taglist__trash_active': isDeleteMode }"
      @click="isDeleteMode = !isDeleteMode"
    />
    <div class="sidebar-taglist__list">
      <TagMain
        v-for="tag in tagList"
        :key="tag.id"
        class="sidebar-taglist__item"
        :class="{ 'sidebar-taglist__item_shake': isDeleteMode }"
        :name="tag.name"
        @click="selectTag(tag)"
      />
    </div>
    <Teleport to="#modal">
      <PopupTagDelete
        v-if="isDeletePopupShowed"
        @close="isDeletePopupShowed = false"
        @delete="deleteTag"
      />
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.sidebar-taglist {
  margin-top: 18px;

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__item_shake {
    animation: shake 1s ease-in infinite;
  }

  &__trash {
    float: right;
    cursor: pointer;
    color: var(--color-normal-70);

    &:hover {
      color: var(--color-red);
    }

    &_active {
      color: var(--color-red-active);
    }
  }
}

// TODO: Move animation to animations.scss
@keyframes shake {
  from {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(3deg);
  }

  75% {
    transform: rotate(-3deg);
  }

  to {
    transform: rotate(0deg);
  }
}
</style>
