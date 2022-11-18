import { DEFAULT_CONFIG } from "../data/config.define";
import errors from "../data/error.define";
import { CONFIG_JSON } from "../data/path.define";
import { loadFile, saveFile } from "../service/innerWorkspaceBus";
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