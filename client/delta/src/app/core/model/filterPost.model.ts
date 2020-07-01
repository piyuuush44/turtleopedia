import {Posts} from './posts.model';

export class FilterPostModel {
    constructor(
        public results: Posts[],
        // tslint:disable-next-line
        public _links: {
            previous: string,
            next: string,
        }
    ) {
    }
}
