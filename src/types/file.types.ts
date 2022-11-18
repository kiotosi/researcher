export interface Config {
  sections: Section[];
  password: string;
  isSynced: boolean;
}

export interface Section {
  title: string;
  emoji: string;
  hrefName: string;
  order: number;
  id: number;
  path: string;
  isActive: boolean;
}

export interface Workspace {
  id: number;
  name: string;
  path: string;
}

export interface Tag {
  name: string;
  id: number;
}
