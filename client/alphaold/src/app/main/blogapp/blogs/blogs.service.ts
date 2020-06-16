import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class BlogsService implements Resolve<any>
{
    blogs: any[];
    onBlogsChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onBlogsChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getBlogs()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get blogs
     *
     * @returns {Promise<any>}
     */
    getBlogs(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/e-commerce-blogs')
                .subscribe((response: any) => {
                    this.blogs = response;
                    this.onBlogsChanged.next(this.blogs);
                    resolve(response);
                }, reject);
        });
    }
}
