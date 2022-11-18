import { defineStore } from 'pinia';
import type { Tag } from '../types/file.types';

interface TagStoreState {
  tags: Tag[];
  currentTag: Tag | null;
}

export const useTagStore = defineStore('tags', {
  state(): TagStoreState {
    return {
      tags: [],
      currentTag: null,
    };
  },
  actions: {
    /**
     * Delete a tag from the store
     * @param id Id of deleted tag
     */
    deleteTag(id: number) {
      this.tags = this.tags.filter((tag) => tag.id !== id);
      if (this.currentTag?.id === id) {
        this.currentTag = null;
      }
    },
  },
});
