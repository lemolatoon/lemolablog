export type Post = {
  id: string;
  post_id: number;
  title: string;
  raw_markdown: string;
  converted_html: string;
  is_public: boolean;
  is_deleted: boolean;
  updated_at: string;
};
