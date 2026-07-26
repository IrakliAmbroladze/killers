export type TeamTask = {
  id: string;
  created_at: string;
  title: string | null;
  description: string | null;
  column_id: number;
  author_id: string | null;
};
