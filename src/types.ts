export type Site = {
  NAME: string;
  HEADER_NAME: string;
  NUM_POSTS_ON_HOMEPAGE: number;
  NUM_WORKS_ON_HOMEPAGE: number;
  NUM_PROJECTS_ON_HOMEPAGE: number;
};

export type Metadata = {
  TITLE: string;
  DESCRIPTION: string;
};

export type Socials = {
  NAME: string;
  HREF: string;
}[];

export type Bookmark = {
  _id: number;
  excerpt: string;
  note: string;
  type: string;
  cover: string;
  tags: string[];
  removed: boolean;
  title: string;
  link: string;
  created: string;
  lastUpdate: string;
  important: boolean;
  sort: number;
  collectionId: number;
  media: {
    link: string;
    type: string;
  }[];
};
