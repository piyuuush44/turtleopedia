import {ProfileModel} from '../../auth/profile.model';

// tslint:disable
export class Blog {
  _id: string;
  title: string;
  image_url: string;
  is_top: boolean;
  slug_url: string;
  handle: string;
  feature_content: string;
  category: string[];
  tags: string[];
  user_id: ProfileModel;
  content: Array<{ type: string, text: string, imageUrl: string, videoUrl: string }>;
  created_at: string;
  updated_at: string;
  images: {
    default: boolean,
    id: string,
    url: string,
    type: string
  }[];

  constructor(blog?) {
    blog = blog || {};
    this._id = blog._id || null;
    this.title = blog.title || '';
    this.image_url = blog.image_url || '';
    this.is_top = blog.is_top || false;
    this.slug_url = blog.slug_url || '';
    this.feature_content = blog.feature_content || '';
    this.category = blog.category || [];
    this.tags = blog.tags || [];
    this.images = blog.images || [];
    this.content = blog.contact || [];
    this.user_id = blog.user_id || null;
    this.created_at = blog.created_at || null;
    this.updated_at = blog.updated_at || null;
  }
}
