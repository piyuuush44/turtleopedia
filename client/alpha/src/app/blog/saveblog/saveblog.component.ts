import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlogService} from '../blog.service';
import {Blog} from '../models/blog.model';
import * as BlogActions from '../store/blog.actions';
import {select, Store} from '@ngrx/store';
import {BlogState} from '../store/blog.reducer';
import {
  blogStateContentImageUrlSelector,
  blogStateImageUrlSelector,
  blogStateEditableBlogSelector
} from '../store/blog.selector';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-saveblog',
  templateUrl: './saveblog.component.html',
  styleUrls: ['./saveblog.component.css']
})
export class SaveblogComponent implements OnInit {
  public Editor = DecoupledEditor;
  blog = new Blog();
  blogForm: FormGroup;

  content = [];
  contentImageUrl = null;
  previewContentImage = [];
  postImage: File = null;
  contentImage: File = null;
  previewPostImage: any = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
  currentIndex: number;
  id: string;
  editMode = false;
  currentEditBlog: Blog;

  isContentImageEdited = [];

  constructor(
    private blogService: BlogService,
    private formBuilder: FormBuilder,
    private store: Store<BlogState>,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    // initial configs for blog form
    this.currentIndex = 0;
    this.content.push({type: 'Text', addButton: false});
    this.blogForm = this.createBlogForm();

    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.store.dispatch(BlogActions.TRY_FETCH_BLOG_BY_ID({payload: this.id}));
        this.editMode = true;
      }
    });
    this.store.pipe(select(blogStateEditableBlogSelector)).subscribe(
      value => {
        if (value) {
          this.currentEditBlog = value;
          this.blog = new Blog(this.currentEditBlog);

          this.content = [];
          this.currentEditBlog.content.forEach((valueFound, index) => {
            if (valueFound.type === 'Image' || valueFound.type === 'ImageText') {
              this.previewContentImage[index] = valueFound.imageUrl;
            }
            this.content.push(value);
          });
          this.previewPostImage = this.currentEditBlog.image_url;
          this.blogForm = this.createBlogForm();
        }
      }
    );

    this.store.pipe(select(blogStateImageUrlSelector)).subscribe(
      value => {
        this.previewPostImage = value;
        this.blogForm.controls.image_url.patchValue(value);
      }
    );

    this.store.pipe(select(blogStateContentImageUrlSelector)).subscribe(
      value => {
        this.contentImageUrl = value;
      }
    );
  }

  get blogFormControls() {
    return this.blogForm.controls;
  }

  onSubmit() {
    let action;
    if (this.blogForm.invalid) {
      return;
    }
    const value = this.blogForm.getRawValue();
    if (this.editMode) {
      action = BlogActions.UPDATE_BLOG({payload: {blog: value, id: this.id}});
    } else {
      action = BlogActions.SAVE_BLOG({payload: value});
    }
    this.store.dispatch(action);
  }

  addContent(value: string) {
    this.content.push({type: value});
  }

  createBlogForm(): FormGroup {
    return this.formBuilder.group({
      title: [this.blog.title, Validators.required],
      image_url: [this.blog.image_url, Validators.required],
      is_top: [this.blog.is_top],
      slug_url: [this.blog.slug_url, Validators.required],
      feature_content: [this.blog.feature_content, Validators.required],
      category: [this.blog.category, Validators.required],
      tags: [this.blog.tags],
      content: [this.blog.content, Validators.required]
    });
  }

  addFormContent(value: string, index: number) {
    const type = this.content[index].type;
    const finalContent = {
      type,
      text: value,
      imageUrl: null
    };
    if (type === 'Image' || type === 'ImageText') {
      if (this.editMode) {
        const editIndex = this.isContentImageEdited.findIndex(value1 => value1 === index);
        if (editIndex > -1) {
          finalContent.imageUrl = this.contentImageUrl;
        }
      } else {
        finalContent.imageUrl = this.contentImageUrl;
      }
    }

    const content = this.blogForm.controls.content.value;

    if (this.editMode) {
      content[index] = finalContent;
    } else {
      content.push(finalContent);
    }

    this.blogForm.controls.content.patchValue(content);
    alert('Added successfully!');
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

    this.store.dispatch(BlogActions.TRY_UPLOAD_BLOG_PICTURES({payload: data}));
    // todo toast here
  }

  contentImageUpload(image: any, index: number) {
    this.currentIndex = index;
    this.contentImage = image.target.files[0] as File;
    const mimeType = this.contentImage.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.contentImage);
    reader.onload = () => {
      this.previewContentImage[index] = reader.result;
    };
    const data = new FormData();
    data.append('image', this.contentImage);

    this.store.dispatch(BlogActions.TRY_UPLOAD_BLOG_CONTENT_PICTURES({payload: data}));

    if (this.editMode) {
      this.isContentImageEdited.push(this.currentIndex);
    }
  }

  deleteContent(index: number) {
    this.content.splice(index, 1);
    this.blogForm.controls.content.patchValue(this.content);
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
}
