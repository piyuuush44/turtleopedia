export class Blog {
  _id: string;
  title: string;
  image_url: string;
  is_top: boolean;
  slug_url: string;
  handle: string;
  description: string;
  category: string[];
  tags: string[];
  content: Array<{ type: string, text: string, image_url: string }>;
  images: {
    default: boolean,
    id: string,
    url: string,
    type: string
  }[];

  /**
   * Constructor
   *
   * @param blog
   */
  constructor(blog?) {
    blog = blog || {};
    this._id = blog._id || null;
    this.title = blog.title || '';
    this.image_url = blog.image_url || '';
    this.is_top = blog.is_top || false;
    this.slug_url = blog.slug_url || '';
    this.description = blog.description || '';
    this.category = blog.categories || [];
    this.tags = blog.tags || [];
    this.images = blog.images || [];
    this.content = blog.contact || [];

  }

  // /**
  //  * Add category
  //  *
  //  * @param {MatChipInputEvent} event
  //  */
  // addCategory(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //
  //   // Add category
  //   if (value) {
  //     this.category.push(value);
  //   }
  //
  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }
  //
  // /**
  //  * Remove category
  //  *
  //  * @param category
  //  */
  // removeCategory(category): void {
  //   const index = this.category.indexOf(category);
  //
  //   if (index >= 0) {
  //     this.category.splice(index, 1);
  //   }
  // }
  //
  // /**
  //  * Add tag
  //  *
  //  * @param {MatChipInputEvent} event
  //  */
  // addTag(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //
  //   // Add tag
  //   if (value) {
  //     this.tags.push(value);
  //   }
  //
  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }
  //
  // /**
  //  * Remove tag
  //  *
  //  * @param tag
  //  */
  // removeTag(tag): void {
  //   const index = this.tags.indexOf(tag);
  //
  //   if (index >= 0) {
  //     this.tags.splice(index, 1);
  //   }
  // }
}
