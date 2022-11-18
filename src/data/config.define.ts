import routes from '../data/router.define';
import type { Config, Workspace } from '../types/file.types';
import { LINK_JSON, BOOK_JSON, NOTE_JSON, VIDEO_JSON} from '../data/path.define';

export const DEFAULT_WORKSPACE_ID = 0;

// Default config
export const DEFAULT_CONFIG: Config = {
  isSynced: false,
  password: '',
  sections: [
    {
      title: 'link',
      emoji: '🔗',
      id: 0,
      path: LINK_JSON,
      order: 0,
      hrefName: routes.link.path,
      isActive: true
    },
    {
      title: 'book',
      emoji: '📚',
      id: 1,
      path: BOOK_JSON,
      hrefName: routes.book.path,
      order: 1,
      isActive: true
    },
    {
      title: 'video',
      emoji: '📼',
      id: 2,
      hrefName: routes.video.path,
      path: VIDEO_JSON,
      order: 2,
      isActive: true
    },
    {
      title: 'note',
      emoji: '📝',
      id: 3,
      hrefName: routes.note.path,
      path: NOTE_JSON,
      order: 3,
      isActive: true
    }
  ]
};

// Default workspace
export const DEFAULT_WORKSPACE: Workspace = {
  id: 0,
  name: 'Default',
  path: 'default'
};
