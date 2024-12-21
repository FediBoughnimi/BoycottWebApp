import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faMicrophone,faSearch, faShare } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ImageProductService } from '../../services/image-product.service';
import { VoiceRecognitionService } from '../../services/voice-recognition.service';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faSearch = faSearch;
  faShare = faShare;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faMicrophone = faMicrophone;

  transcription: string = ''; // Texte reconnu par la reconnaissance vocale
  recognitionActive: boolean = false;
  selectedImage: string | null = null;
  searchTerm: string = '';
  currentPage = 1;
  showShareContainer = false;
  products: Product[] = [];
  imageMap: Map<number, string> = new Map<number, string>();
  productsPerPage: number = 6;
  filteredProduct: Product[] = [];  // Use filteredProduct for the filtered list of products

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private imageProductService: ImageProductService,
    private voiceRecognitionService: VoiceRecognitionService // Nouveau service

  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProduct = this.products; // Initially show all products
        this.products.forEach(product => {
          this.imageProductService.getImageByProductId(product.id).subscribe(
            (response: any) => {
              this.imageMap.set(product.id, response);
            },
            (error) => {
              console.error('Failed to retrieve image for product', product.id, ':', error);
            }
          )
        })
      }
    );
  }
  startVoiceRecognition(): void {
    if (this.recognitionActive) {
      this.stopVoiceRecognition();
      return;
    }
  
    this.voiceRecognitionService.startRecognition().subscribe({
      next: (transcript) => {
        this.transcription = transcript;
        this.searchTerm = transcript; // Remplir le champ de recherche
        this.searchProduct(); // Exécuter la recherche
        this.recognitionActive = false;
      },
      error: (error) => {
        console.error('Erreur lors de la reconnaissance vocale :', error);
        this.recognitionActive = false;
      },
    });
  
    this.recognitionActive = true; // Active l'état de reconnaissance
  }
  
  stopVoiceRecognition(): void {
    this.voiceRecognitionService.stopRecognition();
    this.recognitionActive = false; // Désactive l'état de reconnaissance
  }
  searchProduct() {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const foundProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase().trim())
      );

      if (foundProducts.length > 0) {
        this.filteredProduct = foundProducts;  // Update filteredProduct to show only matching products
        console.log("Produits trouvés :", foundProducts);
      } else {
        this.filteredProduct = [];  // If no products found
        console.log("Aucun produit trouvé pour le terme :", this.searchTerm);
      }
    } else {
      this.filteredProduct = this.products;  // If no search term, show all products
      console.log("Affichage de tous les produits.");
    }

    console.log("Produits filtrés :", this.filteredProduct);
  }

  getImageUrl(image: any): string {
    return 'data:' + image.type + ';base64,' + image.picByte;
  }

  get currentProducts() {
    const indexOfLastProduct = this.currentPage * this.productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - this.productsPerPage;
    return this.filteredProduct.slice(indexOfFirstProduct, indexOfLastProduct);  // Use filteredProduct for pagination
  }

  get pageNumbers() {
    return Array.from({ length: Math.ceil(this.filteredProduct.length / this.productsPerPage) }, (_, i) => i + 1);
  }

  paginate(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  selectedProduct!: Product;

  toggleShareContainer(product: Product) {
    this.showShareContainer = !this.showShareContainer;
    this.selectedProduct = product;
  }

  closeDelete() {
    this.showShareContainer = !this.showShareContainer;
  }

  handleShare() {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Lien copié dans le presse-papiers !');
    }).catch(err => {
      console.error('Erreur lors de la copie : ', err);
      alert('Échec de la copie du lien.');
    });
  }

  handleAlternative(product: Product): void {
    const productItem = document.getElementById(`product-${product.name}`);
    if (productItem) {
      productItem.classList.toggle('flip');
    }
  }

  goBack() {
    this.router.navigate(['/user']);
  }

  trackByProductName(index: number, product: Product): string {
    return product.name;
  }
}
