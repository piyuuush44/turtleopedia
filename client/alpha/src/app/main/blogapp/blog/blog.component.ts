import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {fuseAnimations} from '@fuse/animations';
import {FuseUtils} from '@fuse/utils';

import {Blog} from './blog.model';
import {BlogService} from './blog.service';

@Component({
    selector: 'e-commerce-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BlogComponent implements OnInit, OnDestroy {
    blog: Blog;
    pageType: string;
    blogForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {BlogService} _blogService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _blogService: BlogService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar
    ) {
        // Set the default
        this.blog = new Blog();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to update blog on changes
        this._blogService.onBlogChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(blog => {

                if (blog) {
                    this.blog = new Blog(blog);
                    this.pageType = 'edit';
                } else {
                    this.pageType = 'new';
                    this.blog = new Blog();
                }

                this.blogForm = this.createBlogForm();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create blog form
     *
     * @returns {FormGroup}
     */
    createBlogForm(): FormGroup {
        return this._formBuilder.group({
            _id: [this.blog._id],
            title: [this.blog.title],
            description: [this.blog.description],
            categories: [this.blog.category],
            tags: [this.blog.tags],
            images: [this.blog.images],
        });
    }

    /**
     * Save blog
     */
    saveBlog(): void {
        const data = this.blogForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._blogService.saveBlog(data)
            .then(() => {

                // Trigger the subscription with new data
                this._blogService.onBlogChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Blog saved', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            });
    }

    /**
     * Add blog
     */
    addBlog(): void {
        const data = this.blogForm.getRawValue();
        // data.handle = FuseUtils.handleize(data.name);
        console.log(data)
        // this._blogService.addBlog(data)
        //     .then(() => {
        //
        //         // Trigger the subscription with new data
        //         this._blogService.onBlogChanged.next(data);
        //
        //         // Show the success message
        //         this._matSnackBar.open('Blog added', 'OK', {
        //             verticalPosition: 'top',
        //             duration: 2000
        //         });
        //
        //         // Change the location with new one
        //         this._location.go('apps/blog/one/' + this.blog._id + '/' + this.blog.handle);
        //     });
    }
}
