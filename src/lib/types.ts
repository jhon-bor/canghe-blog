export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  excerpt: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TagCount {
  name: string;
  count: number;
}
