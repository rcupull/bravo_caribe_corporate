import { BaseIdentity, Image } from "./general";

export interface Blog extends BaseIdentity {
  title: string;
  blogSlug: string;
  coverImage?: Image;
  message?: string;
  description?: string;
  hidden?: boolean;
}
