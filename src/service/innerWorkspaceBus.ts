import {
  readTextFile,
  BaseDirectory,
  createDir,
  writeTextFile,
  removeDir,
} from '@tauri-apps/api/fs';
import { CONFIG_ROOT, CONFIG_JSON } from '../data/path.define';
import type { Workspace } from '../types/file.types';

/**
 * Load config from workspace
 * @param workspace Workspace to load config from
 * @returns Configuration from workspace
 */
export async function loadFile<T>(workspace: Workspace, filename: string): Promise<T> {
  // Trying to reach the configuration file
  // If file is unavailable - rejecting the promise
  try {
    const configRaw = await readTextFile(
      `${CONFIG_ROOT}/${workspace.path}/${filename}`,
      { dir: BaseDirectory.Config }
    );
    return JSON.parse(configRaw);
  } catch (_) {
    return Promise.reject("Can't load " + filename);
  }
}

/**
 * Save config to workspace
 * @param workspace Workspace to save config to
 * @param content Modified configuration
 */
export async function saveFile<T>(
  workspace: Workspace,
  filename: string,
  content: T
) {
  const contentRaw = JSON.stringify(content);

  // Trying to create a directory for check if directory exists
  await createDir(`${CONFIG_ROOT}/${workspace.path}`, {
    dir: BaseDirectory.Config,
  }).catch(console.info);

  await writeTextFile(
    `${CONFIG_ROOT}/${workspace.path}/${filename}`,
    contentRaw,
    { dir: BaseDirectory.Config }
  );
}

/**
 * Remove `config.json` **with workspace folder**
 * @param workspace Workspace to delete
 */
export async function removeConfigDir(workspace: Workspace) {
  await removeDir(`${CONFIG_ROOT}/${workspace.path}`, {
    dir: BaseDirectory.Config,
    recursive: true,
  }).catch(console.info);
}
