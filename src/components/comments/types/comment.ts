export interface Comment {
  id?: number;
  text: string;
  task_id?: string;
  parent_id?: number | null;
  author_avatar?: string;
  author_nickname?: string;
  // sub_comments?: Comment[];
}
