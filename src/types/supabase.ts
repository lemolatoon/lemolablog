export type Post = {
  id: string;
  post_id: number;
  title: string;
  raw_markdown: string;
  converted_html: string;
  is_public: boolean;
  is_deleted: boolean;
  updated_at: string;
  published_at: string;
};

type TableRecord<T> = T;

export type DatabaseWebhookPayload<T> =
  | InsertPayload<T>
  | UpdatePayload<T>
  | DeletePayload<T>;

export type InsertPayload<T> = {
  type: "INSERT";
  table: string;
  schema: string;
  record: TableRecord<T>;
  old_record: null;
};

export type UpdatePayload<T> = {
  type: "UPDATE";
  table: string;
  schema: string;
  record: TableRecord<T>;
  old_record: TableRecord<T>;
};
export type DeletePayload<T> = {
  type: "DELETE";
  table: string;
  schema: string;
  record: null;
  old_record: TableRecord<T>;
};
