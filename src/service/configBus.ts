import { readTextFile, BaseDirectory, createDir, writeTextFile, removeDir } from '@tauri-apps/api/fs';
import { CONFIG_ROOT, CONFIG_JSON } from '../data/path.define';
import { DEFAULT_CONFIG } from '../data/config.define';
import type { Config, Workspace } from '../types/file.types';

/**
 * Initialize default config in selected workspace
 * @param workspace Workspace to save default config
 * @returns Default config
 */
export async function initConfig(workspace: Workspace) {
  
  // Trying to create a directory for check if directory exists
  await createDir(`${CONFIG_ROOT}/${workspace.path}`).catch(console.info);
  
  // Writing new configuration file
  await writeTextFile(
    `${CONFIG_ROOT}/${workspace.path}/${CONFIG_JSON}`,
    JSON.stringify(DEFAULT_CONFIG),
    { dir: BaseDirectory.Config }
  );

  return DEFAULT_CONFIG;
}

/**
 * Load config from workspace
 * @param workspace Workspace to load config from
 * @returns Configuration from workspace
 */
export async function loadConfig(workspace: Workspace): Promise<Config> {
  
  // Trying to reach the configuration file
  // If file is unavailable - rejecting the promise
  try {
    const configRaw = await readTextFile(
      `${CONFIG_ROOT}/${workspace.path}/${CONFIG_JSON}`,
      {dir: BaseDirectory.Config}
    );
    return JSON.parse(configRaw);
  } catch (_) {
    return Promise.reject("Can't load configuration.json");
  }
}

/**
 * Save config to workspace
 * @param workspace Workspace to save config to
 * @param config Modified configuration
 */
export async function saveConfig(workspace: Workspace, config: Config) {
  const configRaw = JSON.stringify(config);
  
  // Trying to create a directory for check if directory exists
  await createDir(`${CONFIG_ROOT}/${workspace.path}`, {dir: BaseDirectory.Config}).catch(console.info);
  await writeTextFile(
    `${CONFIG_ROOT}/${workspace.path}/${CONFIG_JSON}`,
    configRaw,
    { dir: BaseDirectory.Config }
  );
}

/**
 * Remove `config.json` **with workspace folder**
 * @param workspace Workspace to delete
 */
export async function removeConfigDir(workspace: Workspace) {
  await removeDir(`${CONFIG_ROOT}/${workspace.path}`, {dir: BaseDirectory.Config, recursive: true}).catch(console.info);
}