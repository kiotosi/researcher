<script setup lang="ts">
import UnfoldIcon from 'vue-material-design-icons/unfoldMoreVertical.vue';
import BackArrow from 'vue-material-design-icons/ChevronLeft.vue';
import { ref, computed } from 'vue';
import { useConfigStore } from '../../store/configStore';
import { useRouter } from 'vue-router';
import SidebarWorkspaceList from './SidebarWorkspaceList.vue';

const configStore = useConfigStore();
const currentWorkspace = computed(() => configStore.currentWorkspace);
const router = useRouter();
const currentRoute = computed(() => router.currentRoute.value);
const isChoosing = ref(false);
</script>

<template>
  <div
    class="sidebar-workspace"
    @click="() => (isChoosing = true)"
  >
    <BackArrow
      v-show="currentRoute.path !== '/'"
      :size="22"
      class="sidebar-workspace__icon"
      @click.stop="router.push('/')"
    />
    <div class="sidebar-workspace__name">
      {{ currentWorkspace.name }}
    </div>
    <UnfoldIcon class="sidebar-workspace__icon" />
  </div>
  <Teleport to="#modal">
    <SidebarWorkspaceList
      v-if="isChoosing"
      @close="() => (isChoosing = false)"
    />
  </Teleport>
</template>

<style scoped lang="scss">
.sidebar-workspace {
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transition: all 2s ease-in-out;
  align-items: center;
  position: relative;
  color: var(--color-normal-700);
  user-select: none;

  &__icon {
    display: flex;
    color: var(--color-normal-500);

    &:hover {
      color: var(--color-normal-800);
    }
  }

  &__name {
    font-weight: 600;
    display: flex;
    align-items: center;
  }
}
</style>
