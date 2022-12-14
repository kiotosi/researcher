<script setup lang="ts">
import InputMain from '../design/InputMain.vue';
import PopupMain from './PopupMain.vue';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import type { Workspace } from '../../types/file.types';
import ButtonMain from '../design/ButtonMain.vue';
import { useConfigStore } from '../../store/configStore';
import { saveWorkspace } from '../../service/workspaceBus';
import errors from '../../data/error.define';
import { saveFile } from '../../service/innerWorkspaceBus';
import { DEFAULT_CONFIG } from '../../data/config.define';
import { CONFIG_JSON, TAGLIST_JSON } from '../../data/path.define';

const emit = defineEmits(['close']);
const name = ref('');
const configStore = useConfigStore();
const path = computed(() =>
  [...name.value.matchAll(/[\d\w]*/gi)].join('').toLowerCase()
);
const isInvalid = computed(() => {
  const formattedname = name.value.trim().toLowerCase();
  return (
    formattedname === '' ||
    path.value === '' ||
    configStore.workspaceList.some(
      (workspace) => workspace.name.toLowerCase() === formattedname
    )
  );
});

/**
 * Handle input from name input
 * @param e Keyboard event
 */
function onInput(e: Event) {
  const input = e.target as HTMLInputElement;
  name.value = input.value;
}

/**
 * Add new workspace into the store and into file
 */
async function addNewWorkspace() {
  if (isInvalid.value) {
    return;
  }

  // Getting last id of workspaceList
  const lastWorkspaceId = Math.max(
    ...configStore.workspaceList.map((workspace) => workspace.id),
    0
  );

  // Creating new workspace
  const newWorkspace: Workspace = {
    id: lastWorkspaceId + 1,
    name: name.value.trim(),
    path: path.value,
  };

  // Pushing new workspace to workspace list
  const workspaceList = [...configStore.workspaceList, newWorkspace];

  // Saving workspace list
  try {
    await saveWorkspace(workspaceList);
  } catch (e) {
    console.error(errors.save.file.workspace, e);
    return;
  }

  // Bootstrap new config
  try {
    await saveFile(newWorkspace, CONFIG_JSON, DEFAULT_CONFIG);
  } catch (e) {
    console.error(errors.save.file.config, e);

    // Return old workspace list
    await saveWorkspace(configStore.workspaceList);
    return;
  }

  // Bootstrap new tag list
  try {
    await saveFile(newWorkspace, TAGLIST_JSON, []);
  } catch (e) {
    console.error(errors.save.file.config, e);

    // Return old workspace list
    await saveWorkspace(configStore.workspaceList);
    return;
  }

  // Save new workspace to workspaceList
  configStore.workspaceList.push(newWorkspace);
  emit('close');
}

/**
 * Handle hotkeys for popup
 * @param ev Keyboard event
 */
async function handleHotkeys(ev: KeyboardEvent) {
  if (ev.key === 'Escape') {
    ev.stopPropagation();
    emit('close');
    return;
  }

  if (ev.key === 'Enter') {
    ev.stopPropagation();
    await addNewWorkspace();
    return;
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleHotkeys);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleHotkeys);
});
</script>

<template>
  <PopupMain @close="$emit('close')">
    <div class="popup-workspace-add">
      <div class="popup-workspace-add__title">
        Add new workspace
      </div>
      <InputMain
        class="popup-workspace-add__input"
        :class="{ 'popup-workspace-add__input_invalid': isInvalid }"
        placeholder="Add a name for workspace"
        @input="onInput"
      />
      <ButtonMain
        :is-disabled="isInvalid"
        class="popup-workspace-add__button"
        text="Create!"
        @click="addNewWorkspace"
      />
    </div>
  </PopupMain>
</template>

<style scoped lang="scss">
.popup-workspace-add {
  width: 500px;
  padding: 16px;

  &__title {
    font-size: var(--fz-header-3);
    font-weight: 600;
    text-align: center;
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
