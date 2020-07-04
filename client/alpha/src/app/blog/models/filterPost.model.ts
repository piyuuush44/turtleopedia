import {Blog} from "./blog.model";

export class FilterPostModel {
  constructor(
    public results: Blog[],
    // tslint:disable-next-line
    public _links: {
      previous: string,
      next: string,
    }
  ) {
  }
}
