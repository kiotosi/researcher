import { defineStore } from "pinia";
import type { Tag } from "../types/file.types";

interface TagStoreState {
  tags: Tag[]
}

export const useTagStore = defineStore('tags', {
  state(): TagStoreState {
    return {
      tags: []
    }
  }
});