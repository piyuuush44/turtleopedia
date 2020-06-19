import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BlogService} from "../blog.service";
import {Blog} from "../blog.model";
import * as BlogActions from "../store/blog.actions";
import {select, Store} from "@ngrx/store";
import {BlogState} from "../store/blog.reducer";
import {blogStateContentImageUrlSelector, blogStateImageUrlSelector} from "../store/blog.selector";

@Component({
  selector: 'app-saveblog',
  templateUrl: './saveblog.component.html',
  styleUrls: ['./saveblog.component.css']
})
export class SaveblogComponent implements OnInit {
  blog: Blog;
  blogForm: FormGroup;

  content = []
  contentImageUrl = null
  imageUrl = null
  postImage: File = null
  contentImage: File = null
  previewPostImage: any = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg'
  currentIndex: number

  constructor(
    private _blogService: BlogService,
    private _formBuilder: FormBuilder,
    private _store: Store<BlogState>
  ) {
  }

  ngOnInit(): void {
    // Set the default
    this.blog = new Blog();
    this.currentIndex = 0;
    this.content.push({type: 'Text', addButton: false})
    this.blogForm = this.createBlogForm();

    this._store.pipe(select(blogStateImageUrlSelector)).subscribe(
      value => {
        this.previewPostImage = value;
        this.imageUrl = value;
        this.blogForm.controls['image_url'].patchValue(this.imageUrl)
      }
    )

    this._store.pipe(select(blogStateContentImageUrlSelector)).subscribe(
      value => {
        this.contentImageUrl = value

      }
    )
  }

  onSubmit() {
    const value = this.blogForm.getRawValue();
    console.log(value)
    // this._store.dispatch(BlogActions.SAVE_BLOG(value));
  }

  addContent(value: string) {
    this.currentIndex++;
    this.content.push({type: value})
  }

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

  addFormContent(value: string, index: number) {
    const type = this.content[index].type
    const finalContent = {
      type: type,
      text: value,
      imageUrl: null
    }
    if (type === 'Image' || type === 'ImageText') {
      finalContent.imageUrl = this.contentImageUrl;
    }

    const content = this.blogForm.controls['content'].value
    content.push(finalContent)
    this.blogForm.controls['content'].patchValue(content)
    console.log(this.blogForm.getRawValue())
    alert('Added successfully!')
  }

  postImageUpload(image: any) {
    this.postImage = image.target.files[0] as File;
    const mimeType = this.postImage.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.postImage);
    reader.onload = () => {
      this.previewPostImage = reader.result;
    };

    const data = new FormData();
    data.append('image', this.postImage);

    this._store.dispatch(BlogActions.TRY_UPLOAD_BLOG_PICTURES({payload: data}))

    //todo toast here
  }

  contentImageUpload(image: any, index: number) {
    this.contentImage = image.target.files[0] as File;
    const mimeType = this.contentImage.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    // const reader = new FileReader();
    // reader.readAsDataURL(this.contentImage);
    // reader.onload = () => {
    //   this.previewPostImage = reader.result;
    // };
    const data = new FormData();
    data.append('image', this.contentImage);

    this._store.dispatch(BlogActions.TRY_UPLOAD_BLOG_PICTURES({payload: data}))
  }

}
