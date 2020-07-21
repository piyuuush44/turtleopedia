import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
import {ActivatedRoute, Router} from '@angular/router';
import {map, startWith} from "rxjs/operators";
import {MatAutocompleteSelectedEvent, MatAutocomplete} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {Observable} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-saveblog',
  templateUrl: './saveblog.component.html',
  styleUrls: ['./saveblog.component.css']
})
export class SaveblogComponent implements OnInit, OnDestroy {


  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


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
    private router: Router,
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
          this.tags = [];
          this.allTags = [];
          this.currentEditBlog.content.forEach((valueFound, index) => {
            if (valueFound.type === 'Image' || valueFound.type === 'ImageText') {
              this.previewContentImage[index] = valueFound.imageUrl;
            }
            this.content.push(valueFound);
          });
          this.tags = this.currentEditBlog.tags ? this.currentEditBlog.tags : [];
          this.allTags = this.currentEditBlog.tags ? this.currentEditBlog.tags : [];
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

    this.filteredTags = this.blogFormControls.tags.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this.filterTags(tag) : this.allTags.slice()));

  }

  get blogFormControls() {
    return this.blogForm.controls;
  }

  onSubmit() {
    this.saveBlog();
    this.router.navigate(['/blog/list']);
  }

  saveBlog() {
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
    const content = this.blogForm.controls.content.value;

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
        } else {
          finalContent.imageUrl = content[index].imageUrl;
        }
      } else {
        finalContent.imageUrl = this.contentImageUrl;
      }
    }


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

  downshiftContent(index: number) {
    if (index === (this.content.length - 1)) {
      return;
    }
    const finalIndex = index + 1;

    const data = this.content[index];
    this.content.splice(index, 1);
    this.content.splice(finalIndex, 0, data);
    this.blogForm.controls.content.patchValue(this.content);
  }

  upshiftContent(index: number) {
    if (index === 0) {
      return;
    }
    const finalIndex = index - 1;

    const data = this.content[index];

    this.content.splice(index, 1);
    this.content.splice(finalIndex, 0, data);
    this.blogForm.controls.content.patchValue(this.content);
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags = Object.assign([], this.tags);
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.blogForm.controls.tags.setValue(this.tags);
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.blogForm.controls.tags.setValue(this.tags);

  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    this.tags = Object.assign([], this.tags);
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.blogForm.controls.tags.setValue(this.tags);
  }

  private filterTags(value: string): string[] {
    return this.allTags.filter(tag => tag.toLowerCase().indexOf(value) === 0);
  }


  ngOnDestroy() {
    this.content = null;
    this.blogForm = null;
    this.blog = null;
    this.contentImageUrl = null;
    this.previewContentImage = null;
    this.currentEditBlog = null;
  }
}
