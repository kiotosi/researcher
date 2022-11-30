<script setup lang="ts">
import LinkItem from '../components/link-manager/LinkItem.vue';
import ContextMenu from '../components/design/ContextMenuMain.vue';
import PopupLinkChange from '../components/popup/PopupLinkChange.vue';
import { reactive, ref } from 'vue';
import type { Link } from '../types/linkmanager.types';
import PopupLinkDelete from '../components/popup/PopupLinkDelete.vue';

let activeLinkItem: Link;
const isContextShowed = ref(false);
const contextMenuCoordinates = reactive({
  x: 0,
  y: 0
});
const isChanging = ref(false);
const isDeleting = ref(false);

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

/**
 * Event handler on context menu in link item
 * @param ev Mouse click event
 */
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
        @contextmenu.prevent="(e) => {onLinkContext(e); activeLinkItem = link}" 
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
      :x="contextMenuCoordinates.x"
      :y="contextMenuCoordinates.y"
      @close="isContextShowed = false"
    >
      <div @click.prevent="isChanging = true">
        Change link
      </div>
      <div @click.prevent="isDeleting = true">Delete link</div>
    </ContextMenu>
  </Teleport>
  <Teleport to="#modal">
    <PopupLinkChange
      v-if="isChanging && activeLinkItem"
      :title="activeLinkItem.title"
      :url="activeLinkItem.url"
      :tags="activeLinkItem.tags"
      @close="isChanging = false"
    />
    <PopupLinkDelete
      v-if="isDeleting && activeLinkItem"
      :link="activeLinkItem"
      @close="isDeleting = false"
    />
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
