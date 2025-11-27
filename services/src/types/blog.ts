import { FilterQuery } from 'mongoose';
import { BaseIdentity, Image } from './general';

export interface Blog extends BaseIdentity {
  title: string;
  blogSlug: string;
  coverImage?: Image;
  message?: string;
  description?: string;
  hidden?: boolean;
  author?: string;
  featured?: boolean;
}

export interface BlogDto extends Blog {}

export interface BlogAdminDto extends Blog {}

export interface GetAllBlogsArgs extends FilterQuery<Blog> {
  search?: string;
}
