<script setup lang="ts">
import InputMain from '../design/InputMain.vue';
import PopupMain from './PopupMain.vue';
import { computed, ref } from 'vue';
import type { Workspace } from '../../types/file.types';
import ButtonMain from '../design/ButtonMain.vue';
import { useConfigStore } from '../../store/configStore';
import { saveWorkspace } from '../../service/workspaceBus';
import { removeConfigDir } from '../../service/configBus';
import errors from '../../data/error.define';

interface PopupWorkspaceRemoveProps {
  workspace: Workspace
}

const props = defineProps<PopupWorkspaceRemoveProps>();
const emit = defineEmits(['close']);

const name = ref('');
const configStore = useConfigStore();
const isInvalid = computed(() => {
  return name.value !== props.workspace.name;
});

/**
 * Check input from name reference
 * @param e Input event
 */
function onInput(e: Event) {
  const input = e.target as HTMLInputElement;
  name.value = input.value;
}

/**
 * Remove workspace
 */
async function removeWorkspace() {
  if (isInvalid.value) {
    return;
  }

  // Filtering removed workspace from other workspaces
  const workspaceList = configStore.workspaceList.filter((workspace) => workspace.id !== props.workspace.id);

  // Trying to save info into workspace.json
  try {
    await saveWorkspace(workspaceList);
    configStore.workspaceList = workspaceList;
  } catch(e) {
    console.error(errors.save.file.workspace, e);
    return;
  }

  // Removing configuration dir
  await removeConfigDir(props.workspace);
  emit('close');
}
</script>

<template>
  <PopupMain @close="$emit('close')">
    <div class="popup-workspace-remove">
      <div class="popup-workspace-remove__title">
        Remove the {{workspace.name}} workspace
      </div>
      <div class="popup-workspace-remove__text">
        {{$t('popup.workspace.remove')}}
      </div>
      <InputMain
        class="popup-workspace-remove__input"
        :class="{'popup-workspace-remove__input_invalid': isInvalid}"
        :placeholder="workspace.name"
        @input="onInput"
      />
      <ButtonMain
        :is-disabled="isInvalid"
        class="popup-workspace-remove__button"
        text="Delete!"
        @click="removeWorkspace"
      />
    </div>
  </PopupMain>
</template>

<style scoped lang="scss">
.popup-workspace-remove {
  width: 500px;
  padding: 16px;

  &__title {
    font-size: var(--fz-header-3);
    font-weight: 600;
    text-align: center;
  }

  &__text {
    margin-top: 16px;
  }

  &__input {
    margin-top: 16px;
    width: 100%;
    font-weight: 500;
    background-color: var(--color-normal-30);
    border: 1px solid var(--color-normal-40);

    &_invalid {
      border: 1px solid rgb(231, 147, 147);
    }
  }

  &__button {
    margin-top: 16px;
  }
}
</style>
