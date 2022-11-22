<script setup lang="ts">
import LinkItem from '../components/link-manager/LinkItem.vue';
import ContextMenu from '../components/design/ContextMenuMain.vue';
import { reactive, ref } from 'vue';
import type { Link } from '../types/linkmanager.types';

const isContextShowed = ref(false);
const contextMenuCoordinates = reactive({
  x: 0,
  y: 0
});

// TODO: Implement LinkStore
const linkList: Link[] = [
  {
    id: 0,
    tags: [],
    title: 'Google',
    url: 'https://google.com'
  },
  {
    id: 1,
    tags: [],
    title: 'Yandex',
    url: 'https://ya.ru'
  }
];

function onLinkContext(ev: MouseEvent): void {
  isContextShowed.value = true;
  contextMenuCoordinates.x = ev.clientX;
  contextMenuCoordinates.y = ev.clientY;
}
</script>

<template>
  <div class="link-manager">
    <div class="link-manager__control" />
    <ul class="link-manager__list">
      <li
        v-for="link in linkList"
        :key="link.id"
        class="link-manager__item"
        @contextmenu.prevent="onLinkContext" 
      >
        <LinkItem
          :tags="link.tags"
          :title="link.title"
          :url="link.url"
        />
      </li>
    </ul>
  </div>
  <Teleport to="#contextmenu">
    <!-- Context menu for link -->
    <ContextMenu
      v-if="isContextShowed"
      @close="isContextShowed = false"
      :x="contextMenuCoordinates.x"
      :y="contextMenuCoordinates.y"
    >
      <div>Change link</div>
      <div>Delete link</div>
    </ContextMenu>
  </Teleport>
</template>

<style lang="scss">
.link-manager {
  width: 100%;
  height: 100vh;
  padding: 16px 12px;

  &__item + &__item {
    margin-top: 16px;
  }
}
</style>
