import errors from '../data/error.define';
import { readTextFile, BaseDirectory, createDir, writeTextFile } from '@tauri-apps/api/fs';
import { CONFIG_ROOT, TAGLIST_JSON } from '../data/path.define';
import type { Tag, Workspace } from '../types/file.types';

/**
 * Initialize default tag list in selected workspace
 * @param workspace Workspace to save default taglist
 * @returns Default taglist
 */
export async function initTagList(workspace: Workspace) {
  
  // Trying to create a directory for check if directory exists
  await createDir(`${CONFIG_ROOT}/${workspace.path}`).catch(console.info);
  
  // Writing new configuration file
  await writeTextFile(
    `${CONFIG_ROOT}/${workspace.path}/${TAGLIST_JSON}`,
    JSON.stringify([]),
    { dir: BaseDirectory.Config }
  );

  return [];
}

/**
 * Load config from workspace
 * @param workspace Workspace to load config from
 * @returns Configuration from workspace
 */
export async function loadTagList(workspace: Workspace): Promise<Tag[]> {
  
  // Trying to reach the configuration file
  // If file is unavailable - rejecting the promise
  try {
    const tagListRaw = await readTextFile(
      `${CONFIG_ROOT}/${workspace.path}/${TAGLIST_JSON}`,
      {dir: BaseDirectory.Config}
    );
    return JSON.parse(tagListRaw);
  } catch (_) {
    return Promise.reject(errors.load.file.tag);
  }
}

/**
 * Save config to workspace
 * @param workspace Workspace to save config to
 * @param config Modified configuration
 */
export async function saveTagList(workspace: Workspace, tagList: Tag[]) {
  const configRaw = JSON.stringify(tagList);
  
  // Trying to create a directory for check if directory exists
  await createDir(`${CONFIG_ROOT}/${workspace.path}`, {dir: BaseDirectory.Config}).catch(console.info);
  await writeTextFile(
    `${CONFIG_ROOT}/${workspace.path}/${TAGLIST_JSON}`,
    configRaw,
    { dir: BaseDirectory.Config }
  );
}