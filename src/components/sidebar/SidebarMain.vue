<script setup lang="ts">
import SidebarSearch from './SidebarSearch.vue';
import SidebarNavigation from './SidebarNavigation.vue';
import SidebarWorkspace from './SidebarWorkspace.vue';
import SidebarFooter from './SidebarFooter.vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import routes from '../../data/router.define';
import SidebarTagList from './SidebarTagList.vue';

const router = useRouter();
const currentRoute = computed(() => router.currentRoute.value);
</script>

<template>
  <div class="sidebar">
    <SidebarWorkspace />
    <SidebarSearch class="sidebar__search" />
    <SidebarNavigation
      v-show="currentRoute.path === routes.home.path"
      class="sidebar__section-list"
    />
    <SidebarTagList v-show="currentRoute.path !== routes.home.path" />
    <SidebarFooter class="sidebar__footer" />
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  width: 346px;
  height: 100vh;
  background-color: var(--color-normal-10);
  padding: 16px 24px 61px;
  position: relative;

  &__search {
    margin-top: 24px;
  }

  &__section-list {
    margin-top: 24px;
  }
}
</style>