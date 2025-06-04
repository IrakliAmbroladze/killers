export interface Comment {
  id?: number;
  text: string;
  task_id?: string;
  parent_id?: number | null;
  author_avatar?: string;
  author_nickname?: string;
  author_id?: string;
  created_at?: string;
  employees?: {
    display_name: string;
  };
  // sub_comments?: Comment[];
}
