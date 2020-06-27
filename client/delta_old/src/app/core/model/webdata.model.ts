import {Posts} from './posts.model';
import {PostCount} from './postcount.interface';

export class WebdataModel {
  constructor(
    // tslint:disable
    public recent_posts: Posts[],
    public count: PostCount[],
    public top_posts: Posts[],
    public categories: Array<string>
  ) {
  }
}
