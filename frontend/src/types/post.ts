export interface AdminPost {
  id: string;
  post_title?: string;
  content: string;
  created_at: string;
  updated_at: string;
  discussion_thread_id: string;
  gender: number;
  user_id: string;
  reports_count?: number;
}

export interface ThreadsPosts {
  id: string;
  disscussion_thread_id: string;
  gender: number;
  content: string;
  created_at: number;
  image_key: string | null;
  votes: { id: string; gender: number; vote_type: number }[];
}

export interface Props {
  postId: string;
}

export interface ThreadsProps {
  threadId: string;
}

export type SearchKey = {
  searchText: string;
  setSearchText: (value: string) => void;
  sortKey: string;
  setSortKey: (value: string) => void;
};
