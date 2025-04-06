export interface Thread {
  id: string;
  thread_title: string;
  created_at: number;
  comments_count?: number;
  image_key?: string;
}
