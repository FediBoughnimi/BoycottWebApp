import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ImageCategoryService } from '../../services/image-category.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {
  productForm!: FormGroup;
  selectedFile: File | null = null;
  selectedImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private imageCategoryService: ImageCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Utilisation de "name" ici
      description: ['', [Validators.required, Validators.minLength(10)]],
      brandImage: [null, Validators.required],
      publish: [false]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;

    // Prévisualiser l'image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result; // Définir l'image à afficher
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile); // Lire le fichier sélectionné
    }
  }

  AjoutEvent(): void {
    if (this.productForm.valid) {
      // Ajouter la catégorie
      this.categoryService.addCategory(this.productForm.value).subscribe(newCategory => {
        if (this.selectedFile) {
          this.imageCategoryService.uploadImage(this.selectedFile, newCategory.id).subscribe(
            response => {
              console.log('Image uploaded successfully:', response);
            },
            error => {
              console.error('Error uploading image:', error);
            }
          );
        }
        window.location.reload();
        this.router.navigate([`admin/categories/list`]); // Recharger la page après l'ajout
      }, error => {
        console.error('Erreur', error);
      });
    }
  }
}
