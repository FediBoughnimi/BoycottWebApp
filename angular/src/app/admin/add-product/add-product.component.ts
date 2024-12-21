import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ImageProductService } from '../../services/image-product.service';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  scanning: boolean = false;
  selectedFile: File | null = null;
  selectedCategory: Category | null = null;
  categories: Category[] = [];
  selectedImage: string | null = null;
  product : Product ={
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
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageProductService: ImageProductService,
    private router: Router
  ) {}

  

  onSubmit() {
    if (this.selectedCategory) {
      this.productService.addProduct(this.product, this.selectedCategory.id).subscribe(
        (response) => {
          if (this.selectedFile) {
            this.imageProductService.uploadImage(this.selectedFile, response.id).subscribe(response => {
              console.log('Image uploaded successfully:', response);
            }, error => {
              console.error('Error uploading image:', error);
            });
          }
          console.log('Formation ajoutée avec succès', response);
          window.location.reload();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la formation', error);
        }
      );
    } else {
      console.error('Formateur non sélectionné ou formation invalide');
    }
  }

  ngOnInit() {
    this.loadCategory();
  }
  

  loadCategory() {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (error) => console.error('Erreur lors du chargement des catégories:', error)
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.loadImage(this.selectedFile);
  }

  loadImage(imageFile: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.selectedImage = event.target.result;
    };
    reader.readAsDataURL(imageFile);
  }

  startScan() {
    this.scanning = true;
    const scanner = new Html5QrcodeScanner(
      "scanner-container",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );
    scanner.render(this.onScanSuccess.bind(this), this.onScanFailure.bind(this));
  }

  onScanSuccess(decodedText: string) {
    this.product.barcode = decodedText;
    this.scanning = false;
  }

  onScanFailure(error: any) {
    console.warn(`Code scan error: ${error}`);
  }
}
