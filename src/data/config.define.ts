import routes from "../data/router.define";
import type { Config, Workspace } from "../types/file.types";
import {
  LINK_JSON,
  BOOK_JSON,
  NOTE_JSON,
  VIDEO_JSON,
} from "../data/path.define";

export const DEFAULT_WORKSPACE_ID = 0;

// Default config
export const DEFAULT_CONFIG: Config = {
  isSynced: false,
  password: "",
  sections: [
    {
      title: "Links",
      emoji: "🔗",
      id: 0,
      path: LINK_JSON,
      order: 0,
      hrefName: routes.link.path,
      isActive: true,
    },
    {
      title: "Books",
      emoji: "📚",
      id: 1,
      path: BOOK_JSON,
      hrefName: routes.book.path,
      order: 1,
      isActive: true,
    },
    {
      title: "Videos",
      emoji: "📼",
      id: 2,
      hrefName: VIDEO_JSON,
      path: routes.video.path,
      order: 2,
      isActive: true,
    },
    {
      title: "Notes",
      emoji: "📝",
      id: 3,
      hrefName: NOTE_JSON,
      path: routes.link.path,
      order: 3,
      isActive: true,
    },
  ],
};

// Default workspace
export const DEFAULT_WORKSPACE: Workspace = {
  id: 0,
  name: "Default",
  path: "default",
};
