// tslint:disable
export class Posts {
  constructor(
    public _id: string,
    public title: string,
    public category: string,
    public feature_content: string,
    public no_of_views: number,
    public slug_url: string,
    public image_url: string,
    public is_top: Boolean,
    public content: [],
    public tags: [],
    public createdAt: string,
    public updatedAt: string,
  ) {
  }
}
