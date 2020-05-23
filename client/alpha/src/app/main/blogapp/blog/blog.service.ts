import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class BlogService implements Resolve<any>
{
    routeParams: any;
    blog: any;
    onBlogChanged: BehaviorSubject<any>;

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
        this.onBlogChanged = new BehaviorSubject({});
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
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getBlog()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get blog
     *
     * @returns {Promise<any>}
     */
    getBlog(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onBlogChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get('api/e-commerce-blogs/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.blog = response;
                        this.onBlogChanged.next(this.blog);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Save blog
     *
     * @param blog
     * @returns {Promise<any>}
     */
    saveBlog(blog): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/e-commerce-blogs/' + blog.id, blog)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add blog
     *
     * @param blog
     * @returns {Promise<any>}
     */
    addBlog(blog): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/e-commerce-blogs/', blog)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
