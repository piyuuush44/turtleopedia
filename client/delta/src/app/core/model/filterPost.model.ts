import {Posts} from "./posts.model";

export class FilterPostModel {
  constructor(
    public results: Posts[],
    public _link: {}
  ) {
  }
}
