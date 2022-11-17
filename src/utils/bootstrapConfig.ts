import errors from "../data/error.define";
import { initConfig, loadConfig } from "../service/configBus";
import { initWorkspace, loadWorkspaces } from "../service/workspaceBus";
import type { Config, Workspace } from "../types/file.types";

/**
 * Try to load workspace list. If workspace.json is unavailable - initialize it
 * @returns Promise with workspace list
 */
export async function bootstrapWorkspaceList(): Promise<Workspace[]> {
  // New group for workspace file info
  console.group("Workspace file");

  let workspaceList: Workspace[] = [];
  try {
    workspaceList = await loadWorkspaces();
    console.log("Workspace file is loaded!");
  } catch (e) {
    // Informing a user about unavailable workspace.json
    console.error(errors.load.file.workspace, e);
    console.info("Trying to initialize a workspace file");

    // Try to create new workspace.json
    const defaultWorkspace = await initWorkspace();
    workspaceList.push(defaultWorkspace);
    console.info("Success!");
  }
  console.groupEnd();
  return workspaceList;
}

/**
 * Trying to load existing config.json, if it's not exist - create a new one
 * @param workspace Workspace where config.json is placed
 * @returns Configuration file
 */
export async function bootstrapConfig(workspace: Workspace): Promise<Config> {
  let config: Config;

  // New group for config file info
  console.group("Config file");
  try {
    config = await loadConfig(workspace);
    console.log("Config file is loaded!");
  } catch (e) {
    // Informing a user about unavailable workspace.json
    console.error(errors.load.file.config, e);
    console.info("Trying to initialize a config file");

    // Try to create new config.json
    config = await initConfig(workspace);
    console.info("Success!");
  }
  console.groupEnd();
  return config;
}
