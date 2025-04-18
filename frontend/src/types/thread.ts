export interface Thread {
  id: string;
  thread_title: string;
  created_at: string;
  comments_count?: number;
  image_key?: string;
  votes_summary: {
    male_votes: number;
    female_votes: number;
  };
}
