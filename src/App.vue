<script setup lang="ts">
import SidebarMain from './components/sidebar/SidebarMain.vue';

import { onMounted, ref } from 'vue';
import {
  bootstrapWorkspaceList,
  bootstrapConfig,
} from './utils/bootstrapConfig';
import { useConfigStore } from './store/configStore';
import { useTagStore } from './store/tagStore';
import { LAST_USED_WORKSPACE } from './data/localStorage.define';
import { DEFAULT_WORKSPACE_ID } from './data/config.define';
import LoaderMain from './components/loader/LoaderMain.vue';
import { initTagList, loadTagList } from './service/tagBus';
import type { Tag } from './types/file.types';

const configStore = useConfigStore();
const tagStore = useTagStore();
const isAppLoading = ref(true);

onMounted(async () => {
  // Fetching last used workspace id
  let lastUsedWorkspaceId: number = parseInt(
    localStorage.getItem(LAST_USED_WORKSPACE) as string
  );

  // If there's no last used workspace - define it with Default workspace ID
  if (!lastUsedWorkspaceId) {
    lastUsedWorkspaceId = DEFAULT_WORKSPACE_ID;
    localStorage.setItem(LAST_USED_WORKSPACE, DEFAULT_WORKSPACE_ID.toString());
  }

  // Bootstraping workspace.json file
  const workspaceList = await bootstrapWorkspaceList();

  // Finding last used workspace by ID
  let lastUsedWorkspace = workspaceList.find(
    (workspace) => workspace.id === lastUsedWorkspaceId
  );
  if (!lastUsedWorkspace) {
    // If workspace was deleted, then use first one in the list
    lastUsedWorkspace = workspaceList[0];
  }

  // Bootstraping config.json file in workspace folder
  const config = await bootstrapConfig(lastUsedWorkspace);

  // TODO: Make loading of config.json and tags.json by one function - `loadWorkspaceFile(name: string)`
  // Try to load tags.json
  let tagList: Tag[];
  console.group('Tags file');
  try {
    console.info('Trying to load tags.json');
    tagList = await loadTagList(lastUsedWorkspace);
  } catch (e) {
    console.error(e);
    console.info('Trying to create tags.json');
    tagList = await initTagList(lastUsedWorkspace);
  }
  console.info('Success!');
  console.groupEnd();

  // Save configurations into store
  configStore.workspaceList = workspaceList;
  configStore.config = config;
  configStore.currentWorkspace = lastUsedWorkspace;
  tagStore.tags = tagList;

  // Turn off loading of the app
  isAppLoading.value = false;
});
</script>

<template>
  <LoaderMain v-if="isAppLoading" />
  <div
    v-else
    class="container"
  >
    <SidebarMain />
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
}
</style>
