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
    contentType = 1;
    uploadImageUrl: string;
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
            image_url: [this.blog.image_url],
            is_top: [this.blog.is_top],
            slug_url: [this.blog.slug_url],
            description: [this.blog.description],
            categories: [this.blog.category],
            tags: [this.blog.tags],
            content: [this.blog.content]
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

    addContent(text: string): void {
        const content = this.blogForm.controls['content'].value
        let finalContent;
        if (this.contentType === 1) {
            finalContent = {
                type: 'text',
                image_url: null,
                text: text
            }
        } else if (this.contentType === 2) {
            finalContent = {
                type: 'image',
                image_url: this.uploadImageUrl,
                text: ''
            }
        } else {
            finalContent = {
                type: 'image',
                image_url: this.uploadImageUrl,
                text: text
            }
        }
        content.push(finalContent)
    }

    editContent(text: string, index: number): void {
        const content = this.blogForm.controls['content'].value
        let finalContent;
        if (this.contentType === 1) {
            finalContent = {
                type: 'text',
                image_url: null,
                text: text
            }
        } else if (this.contentType === 2) {
            finalContent = {
                type: 'image',
                image_url: this.uploadImageUrl,
                text: ''
            }
        } else {
            finalContent = {
                type: 'image',
                image_url: this.uploadImageUrl,
                text: text
            }
        }
        content.push(finalContent)
    }

    changeType(type: string) {
        if (type === 'text') {
            this.contentType = 1
        } else if (type === 'image') {
            this.contentType = 2
        } else {
            this.contentType = 3
        }
    }

    imageUpload = async (file) => {
        // const bucketName = ''
        // // Uploads a local file to the bucket
        // await storage.bucket(bucketName).upload(file, {
        //     // Support for HTTP requests made with `Accept-Encoding: gzip`
        //     gzip: true,
        //     // By setting the option `destination`, you can change the name of the
        //     // object you are uploading to a bucket.
        //     metadata: {
        //         // Enable long-lived HTTP caching headers
        //         // Use only if the contents of the file will never change
        //         // (If the contents will change, use cacheControl: 'no-cache')
        //         cacheControl: 'public, max-age=31536000',
        //     },
        // });
        //
        // console.log(`${file} uploaded to ${bucketName}.`);
    }


    imageUploadEdit(): void {

    }
}
