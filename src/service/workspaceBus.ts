import {
  BaseDirectory,
  createDir,
  readTextFile,
  writeFile,
} from "@tauri-apps/api/fs";
import { CONFIG_ROOT, WORKSPACE_JSON } from "../data/path.define";
import { DEFAULT_WORKSPACE } from "../data/config.define";
import type { Workspace } from "../types/file.types";

/**
 * Initialize default workspace
 * @returns Default workspace
 */
export async function initWorkspace(): Promise<Workspace> {
  await createDir(CONFIG_ROOT, { dir: BaseDirectory.Config }).catch(
    console.info
  );

  await createDir(`${CONFIG_ROOT}/${DEFAULT_WORKSPACE.path}`, {
    dir: BaseDirectory.Config,
  }).catch(console.info);

  await writeFile(
    `${CONFIG_ROOT}/${WORKSPACE_JSON}`,
    JSON.stringify([DEFAULT_WORKSPACE]),
    { dir: BaseDirectory.Config }
  );
  return DEFAULT_WORKSPACE;
}

/**
 * Get list of all workspaces
 * @returns List of workspaces
 */
export async function loadWorkspaces(): Promise<Workspace[]> {
  const workspaceListRaw = await readTextFile(
    `${CONFIG_ROOT}/${WORKSPACE_JSON}`,
    { dir: BaseDirectory.Config }
  );
  return JSON.parse(workspaceListRaw);
}

/**
 * Save new list of workspaces
 * @param workspaceList Modified list of all workspaces
 */
export async function saveWorkspace(workspaceList: Workspace[]): Promise<void> {
  await writeFile(
    `${CONFIG_ROOT}/${WORKSPACE_JSON}`,
    JSON.stringify(workspaceList),
    { dir: BaseDirectory.Config }
  );
}
