import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faSearch, faShare } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { ImageCategoryService } from '../../services/image-category.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faSearch = faSearch;
  faShare = faShare;
  categories: Category[] = [];
  imageMap: Map<number, string> = new Map<number, string>();
  selectedFile: File | null = null;
  selectedImage: string | null = null;
  searchTerm: string = '';
  filteredCategory: Category[] = this.categories;


  showShareContainer = false;

  ngOnInit(): void {
    // Récupérer les catégories au démarrage
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      this.filteredCategory = this.categories;

      this.categories.forEach(category=>{
        this.imageCategoryService.getImageByCategoryId(category.id).subscribe(
          (response:any) => {
            this.imageMap.set(category.id, response);
          },
          (error) => {
            console.error('Failed to retrieve image:', error);
          }
        )
      })


    });
  }

  searchCategories() {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      // Utiliser 'includes' pour permettre la recherche partielle sans se soucier des majuscules/minuscules
      const foundCategories = this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase().trim()) // Recherche partielle sans distinction de casse
      );
  
      if (foundCategories.length > 0) {
        this.filteredCategory = foundCategories;
        console.log("Catégories trouvées :", foundCategories);
      } else {
        this.filteredCategory = []; // Si aucune catégorie n'est trouvée
        console.log("Aucune catégorie trouvée pour le terme :", this.searchTerm);
      }
    } else {
      // Si le champ de recherche est vide, afficher toutes les catégories
      this.filteredCategory = this.categories;
      console.log("Affichage de toutes les catégories.");
    }
    console.log("Catégories filtrées :", this.filteredCategory);
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

  constructor(private router: Router, private categoryService: CategoryService,private imageCategoryService : ImageCategoryService) {}

  toggleShareContainer() {
    this.showShareContainer = !this.showShareContainer;
  }

  navigateBack() {
    this.router.navigate(['/user']);
  }

  goToCategory(category: Category): void {
    this.router.navigate(['/user/products', category.id]);  // Fixing the path to match your route
}

  
  
}
