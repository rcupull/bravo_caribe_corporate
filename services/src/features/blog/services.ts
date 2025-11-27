import { modelGetter } from './schemas';

import { getAllFilterQuery, getBlogSlugFromName } from './utils';
import { ModelCrudTemplate } from '../../utils/ModelCrudTemplate';
import { Blog, GetAllBlogsArgs } from '../../types/blog';

export class BlogServices extends ModelCrudTemplate<
  Blog,
  Pick<Blog, 'title' | 'blogSlug' | 'hidden' | 'description' | 'coverImage' | 'message'>,
  GetAllBlogsArgs
> {
  constructor() {
    super(modelGetter, getAllFilterQuery);
  }

  getBlogSlugFromName: typeof getBlogSlugFromName = (name) => getBlogSlugFromName(name);
}
