<script setup lang="ts">
import { onMounted } from 'vue';
import { bootstrapWorkspaceList, bootstrapConfig } from './utils/bootstrapConfig';
import { useConfigStore } from './store/configStore';
import { LAST_USED_WORKSPACE } from './data/localStorage.define';
import { DEFAULT_WORKSPACE_ID } from './data/config.define';

const configStore = useConfigStore();

onMounted(async () => {

  // Fetching last used workspace id
  let lastUsedWorkspaceId: number = parseInt(localStorage.getItem(LAST_USED_WORKSPACE) as string);

  // If there's no last used workspace - define it with Default workspace ID
  if (!lastUsedWorkspaceId) {
    lastUsedWorkspaceId = DEFAULT_WORKSPACE_ID;
    localStorage.setItem(LAST_USED_WORKSPACE, DEFAULT_WORKSPACE_ID.toString());
  }
  
  // Bootstraping workspace.json file
  const workspaceList = await bootstrapWorkspaceList();

  // Finding last used workspace by ID
  let lastUsedWorkspace = workspaceList.find(workspace => workspace.id === lastUsedWorkspaceId);
  if (!lastUsedWorkspace) {
    
    // If workspace was deleted, then use first one in the list
    lastUsedWorkspace = workspaceList[0];
  }
  
  // Bootstraping config.json file in workspace folder
  const config = await bootstrapConfig(lastUsedWorkspace);

  // Save configurations into store
  configStore.workspaceList = workspaceList;
  configStore.config = config;

  console.log(configStore.config, configStore.workspaceList);
});
</script>

<template>
  <div class="container">

  </div>
</template>

<style scoped lang="scss">

</style>
