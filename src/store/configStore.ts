import { defineStore } from "pinia"
import { DEFAULT_CONFIG, DEFAULT_WORKSPACE } from "../data/config.define";
import type { Config, Workspace } from "../types/file.types"

interface ConfigStoreState {
  config: Config,
  workspaceList: Workspace[]
}

export const useConfigStore = defineStore('config', {
  state: (): ConfigStoreState => {
    return {
      config: DEFAULT_CONFIG,
      workspaceList: [DEFAULT_WORKSPACE]
    }
  },
});