import { Blog, BlogAdminDto, BlogDto } from '../../types/blog';
import { deepJsonCopy } from '../../utils/general';

export class BlogDtosServices {
  constructor() {}

  getBlogsDto = async (blogs: Array<Blog>): Promise<Array<BlogDto>> => {
    const getBlogDto = async (blog: Blog): Promise<BlogDto> => {
      return {
        ...deepJsonCopy(blog)
      };
    };

    const promises = blogs.map(getBlogDto);
    const out = await Promise.all(promises);

    return out;
  };

  getBlogsAdminDto = async (blogs: Array<Blog>): Promise<Array<BlogAdminDto>> => {
    const getBlogDto = async (blog: Blog): Promise<BlogAdminDto> => {
      return {
        ...deepJsonCopy(blog)
      };
    };

    const promises = blogs.map(getBlogDto);
    const out = await Promise.all(promises);

    return out;
  };
}
