import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { ImageCategoryService } from '../../services/image-category.service';
// declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  imageMap: Map<number, string> = new Map<number, string>();
  selectedFile: File | null = null;
  selectedImage: string | null = null;
  categoryToUpdate: Category = { id: -1, name: '', description: '' };
  userToDelete!: Category;
  isModalOpen: boolean = false;
  showShareContainer = false;
  showEditContainer = false ;

  constructor(private categoryService: CategoryService, private imageCategoryService: ImageCategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      this.categories.forEach(category => {
        this.imageCategoryService.getImageByCategoryId(category.id).subscribe(
          (response: any) => {
            this.imageMap.set(category.id, response);
          },
          (error) => {
            console.error('Failed to retrieve image:', error);
          }
        );
      });
    });
  }

  loadImage(imageFile: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.selectedImage = event.target.result;
    };
    reader.readAsDataURL(imageFile);
  }

  getImageUrl(image: any): string {
    return 'data:' + image.type + ';base64,' + image.picByte;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  editEtudiant(category: Category) {
    this.categoryToUpdate = { ...category };
    this.showEditContainer = !this.showEditContainer;
  }

  modifEvent() {
    if (this.categoryToUpdate) {
      this.categoryService.updateCategory(this.categoryToUpdate.id, this.categoryToUpdate).subscribe(updatedCategory => {
        console.log('Category updated', updatedCategory);
        if (this.selectedFile) {
          this.imageCategoryService.updateImage(this.selectedFile, this.categoryToUpdate.id).subscribe(response => {
            console.log('Image updated successfully:', response);
          }, error => {
            console.error('Error updating image:', error);
          });
        }
        const index = this.categories.findIndex(category => category.id === updatedCategory.id);
        if (index !== -1) {
          this.categories[index] = updatedCategory;
        }
        
        this.closeModif();
        window.location.reload();
      }, error => {
        console.error('Error updating category:', error);
      });
    }
  }

  closeModif() {
    this.showEditContainer = !this.showEditContainer;
  }

  toggleShareContainer(category: Category) {
    this.showShareContainer = !this.showShareContainer;
    this.userToDelete = category;
  }

  

  deleteEvent() {
    this.categoryService.deleteCategory(this.userToDelete.id).subscribe(() => {
      window.location.reload();
      this.closeDelete();
    }, error => {
      console.error('Error deleting category:', error);
    });
  }

  closeDelete() {
    this.showShareContainer = !this.showShareContainer;
  }
}
