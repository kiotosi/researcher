<script setup lang="ts">
import SidebarSearch from './SidebarSearch.vue';
import SidebarNavigation from './SidebarNavigation.vue';
import SidebarWorkspace from './SidebarWorkspace.vue';
import SidebarFooter from './SidebarFooter.vue';
</script>

<template>
  <div class="sidebar">
    <SidebarWorkspace class="sidebar__workspace" />
    <SidebarSearch class="sidebar__search" />
    <SidebarNavigation
      class="sidebar__section-list"
    />
    <SidebarFooter class="sidebar__footer" />
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  width: 346px;
  height: 100vh;
  background-color: var(--color-normal-10);
  padding: 16px 24px;
  position: relative;

  &__search {
    margin-top: 32px;
  }

  &__section-list {
    margin-top: 18px;
  }
}
</style>
