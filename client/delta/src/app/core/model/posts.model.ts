import {ImageObject} from "./imageobject.interface";

export class Posts {
  constructor(
    public _id: String,
    public title: String,
    public category: String,
    public feature_content: String,
    public no_of_views: number,
    public slug_url: String,
    public image_url: ImageObject[],
    public is_top: Boolean,
    public content: [],
    public tags: [],
    public createdAt: String,
    public updatedAt: String,
  ) {
  }
}
