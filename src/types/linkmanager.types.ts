import type { Tag } from "./file.types"

export interface Link {
  id: number
  title: string,
  url: string,
  tags: Tag[]
}