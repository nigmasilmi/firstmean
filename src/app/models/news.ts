export interface News {
  created_at?: Date;
  title: string;
  author: string;
  points?: number;
  story_text?: string;
  comment_text?: object;
  num_comments?: number;
  story_id: number;
  story_title: string;
  story_url: string;
  parent_id?: number;
  created_at_i?: number;
  _tags?: Array<any>;
  objectID?: string;
  _highlightResult?: Array<any>;
}
