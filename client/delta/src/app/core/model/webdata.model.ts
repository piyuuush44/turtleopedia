interface ImageObject {
  link: String;
}

export interface Posts {
  _id: String;
  title: String;
  category: String;
  image_url: ImageObject[];
  is_top: Boolean;
  content: [];
  tags: [];
  createdAt: String;
  updatedAt: String;

}

export interface PostCount {
  _id: String;
  count: Number;
}

export class WebdataModel {
  constructor(
    // @ts-ignore
    public recent_posts: Posts[],
    public count: PostCount[],
    public top_posts: Posts[],
    public categories: Array<String>
  ) {
  }
}
