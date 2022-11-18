<script setup lang="ts">
import PopupWorkspaceAdd from '../popup/PopupWorkspaceAdd.vue';
import PlusIconCircle from 'vue-material-design-icons/PlusCircle.vue';
import TrashIcon from 'vue-material-design-icons/Delete.vue';
import errors from '../../data/error.define';
import { computed, ref } from 'vue';
import { useConfigStore } from '../../store/configStore';
import { loadConfig } from '../../service/configBus';
import { LAST_USED_WORKSPACE } from '../../data/localStorage.define';
import type { Workspace } from '../../types/file.types';
import PopupWorkspaceRemove from '../popup/PopupWorkspaceRemove.vue';
import { loadTagList } from '../../service/tagBus';
import { useTagStore } from '../../store/tagStore';

const emit = defineEmits(['close']);
const isAdding = ref(false);
const isRemoving = ref(false);
const removingWorkspace = ref<Workspace | null>(null);

const configStore = useConfigStore();
const tagStore = useTagStore();
const workspaceList = computed(() => configStore.workspaceList);
const currentWorkspace = computed(() => configStore.currentWorkspace);

/**
 * Choose one workspace from the list and load configuration
 * @param workspace Workspace to choose
 */
async function chooseWorkspace(workspace: Workspace) {
  if (currentWorkspace.value.id === workspace.id) {
    emit('close');
    return;
  }

  // Try to load configuration from `workspace.path/config.json`
  try {
    const config = await loadConfig(workspace);
    configStore.config = config;
    configStore.currentWorkspace = workspace;
    localStorage.setItem(LAST_USED_WORKSPACE, workspace.id.toString());
  } catch (e) {
    console.error(errors.load.file.config, e);
  }

  // Try to load tag list from `workspace.path/tags.json`
  try {
    const tagList = await loadTagList(workspace);
    tagStore.tags = tagList;
  } catch (e) {
    console.error(errors.load.file.tag, e);
  }
  emit('close');
}
</script>

<template>
  <div class="wrapper" @click="$emit('close')">
    <div class="workspace-list">
      <div
        v-for="workspace in workspaceList"
        :key="workspace.id"
        class="workspace-list__item workspace-item"
        :class="{
          'workspace-item_active': workspace.id === currentWorkspace.id,
        }"
        @click.stop="chooseWorkspace(workspace)"
      >
        {{ workspace.name }}
        <TrashIcon
          v-show="workspace.id !== currentWorkspace.id"
          :size="20"
          class="workspace-item__trash"
          @click.stop="
            isRemoving = true;
            removingWorkspace = workspace;
          "
        />
      </div>
      <div
        class="workspace-item workspace-item_add"
        @click.stop="isAdding = true"
      >
        {{ $t('sidebar.workspace.add') }}
        <PlusIconCircle :size="18" class="workspace-item__add-icon" />
      </div>
    </div>
  </div>
  <Teleport to="#modal">
    <PopupWorkspaceAdd v-if="isAdding" @close="isAdding = false" />
    <PopupWorkspaceRemove
      v-if="isRemoving"
      :workspace="removingWorkspace as Workspace"
      @close="isRemoving = false"
    />
  </Teleport>
</template>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  z-index: 100;
  inset: 0;
  background-color: hsla(0, 0, 0, 0.2);
}

.workspace-list {
  position: absolute;
  z-index: 101;
  padding: 8px;
  overflow-y: auto;
  max-height: calc(100vh - 32px);
  background-color: var(--color-normal-20);
  color: var(--color-normal-700);
  border: 1px solid var(--color-normal-40);
  border-radius: 6px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.05);
  width: 304px;
  top: 18px;
  left: 18px;
}

.workspace-item {
  font-weight: 600;
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  position: relative;
  display: flex;
  justify-content: space-between;

  & + & {
    margin-top: 8px;
  }

  &:hover {
    background-color: var(--color-normal-40);
    border: 1px solid var(--color-normal-50);

    .workspace-item__trash {
      display: flex;
    }
  }

  &_active {
    background-color: var(--color-normal-30);
    border: 1px solid var(--color-normal-50);
  }

  &_add {
    text-align: center;
    color: var(--color-normal-300);
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      color: var(--color-normal-700);
    }
  }

  &__add-icon {
    display: flex;
    margin: 0 8px;
  }

  &__trash {
    color: var(--color-normal-300);
    display: none;

    &:hover {
      color: var(--color-red-normal);
    }
  }
}
</style>
