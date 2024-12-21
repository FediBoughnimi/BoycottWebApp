import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ImageProductService } from '../../services/image-product.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service'
import { Category } from 'src/app/models/category.model';
declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
    
    isEditing = false;
    showFullDescription: { [key: number]: boolean } = {};
    showShareContainer = false;
    showEditContainer = false ;
    imageMap: Map<number, string> = new Map<number, string>();
    currentProduct: Product | null = null;
    products: Product[] = [];
    categories: Category[] = [];
    selectedFile: File | null = null;
    productToUpdate : Product ={
      id: -1,
      name:'',
      barcode:'',
      brand: '',
      raison: '',
      alternative:'',
      alternativeSourceLink:'',
      category : {
        id: -1,
        name: '',
        description: ''
      }
    }
    constructor( private productService: ProductService,
      private imageProductService: ImageProductService,
      private categoryService : CategoryService) {}
  
    ngOnInit(): void {
      this.loadCategories();
      this.loadProducts();
    }
    loadCategories() {
      this.categoryService.getCategories().subscribe(data => {
        this.categories = data;
      }, error => {
        console.error('Erreur lors du chargement des categories:', error);
      });
    }
    
    loadProducts() {
      this.productService.getAllProducts().subscribe(
        (products) => {
          this.products = products;
  
          this.products.forEach(product => {
            this.imageProductService.getImageByProductId(product.id).subscribe(
              (response: any) => {
                this.imageMap.set(product.id, response);
              },
              (error) => {
                console.error('Failed to retrieve image for product', product.id, ':', error);
              }
            );
          });
        },
        (error) => {
          console.error('Error loading products:', error);
        }
      );
    }
    

    
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0] as File;
    }
    selectedImage: string | null = null;
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
    modifEvent() {
      if (this.productToUpdate.id !== -1) {
        this.productService.updateProduct(this.productToUpdate.id, this.productToUpdate, this.productToUpdate.category.id || -1).subscribe(
          (response: any) => {
            console.log('Formation mise à jour avec succès', response);
            if (this.selectedFile) {
              this.imageProductService.updateImage(this.selectedFile, response.id).subscribe(response => {
                console.log('Image updated successfully:', response);
              }, error => {
                console.error('Error updating image:', error);
              });
            }
            window.location.reload();
          },
          (error: any) => {
            console.error('Erreur lors de la mise à jour de la formation', error);
          }
        );
      }
    }
    editEtudiant(product: Product) {
      this.productToUpdate = { ...product };
      this.showEditContainer = !this.showEditContainer;
    }
  
    closeModif() {
      this.showEditContainer = !this.showEditContainer;
    }
    productToDelete! : Product;
    toggleShareContainer(product: Product) {
      this.showShareContainer = !this.showShareContainer;
      this.productToDelete = product;
    }
    
    
  
    deleteEvent() {
      this.productService.deleteProduct(this.productToDelete.id).subscribe(() => {
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
