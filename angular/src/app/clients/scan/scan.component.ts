import { Component, OnInit } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Product } from '../../models/product.model';
import { ImageProductService } from '../../services/image-product.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
  public productInfoVisible: boolean = false;
  public errorVisible: boolean = false;
  public scanning: boolean = false;

  public productName: string = '';
  public productImage: string = ''; 
  public productReason: string = '';
  public productAlternative: string = '';
  
  products: Product[] = [];
  imageMap: Map<number, string> = new Map<number, string>();

  constructor(
    private productService: ProductService,
    private imageProductService: ImageProductService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;

      this.products.forEach((product) => {
        this.imageProductService.getImageByProductId(product.id).subscribe(
          (response: any) => {
            this.imageMap.set(product.id, response);
          },
          (error) => {
            console.error('Échec du chargement de l\'image pour le produit', product.id, ':', error);
          }
        );
      });
    });
  }

  startScan() {
    this.scanning = true; 
    const scanner = new Html5QrcodeScanner(
      'scanner-container',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(this.onScanSuccess.bind(this), this.onScanFailure.bind(this));
  }

  getImageUrl(image: any): string {
    return 'data:' + image.type + ';base64,' + image.picByte;
  }

  onScanSuccess(decodedText: string, decodedResult: any) {
    console.log('Scan réussi :', decodedText);
    
    this.fetchProductInfo(decodedText);

    this.scanning = false;
  }

  onScanFailure(error: any) {
    console.warn(`Erreur de scan : ${error}`);
  }

  fetchProductInfo(barcode: string) {
    const cleanedBarcode = barcode.trim().toLowerCase();
  
    const foundProduct = this.products.find(
      (product) => product.barcode.toString().trim().toLowerCase() === cleanedBarcode
    );
  
    if (foundProduct) {
      console.log('Produit trouvé :', foundProduct);
      this.productName = foundProduct.name;
      this.productReason = foundProduct.raison;
      this.productAlternative = foundProduct.alternative;;
  
     
        const productImageData = this.imageMap.get(foundProduct.id);
        if (productImageData) {
          this.productImage = this.getImageUrl(productImageData);
        } else {
          this.productImage = 'assets/example-product.jpg';
        }
      this.productInfoVisible = true;
      this.errorVisible = false;
    } else {
      console.log('Aucun produit trouvé pour le code-barres :', cleanedBarcode);
      this.productInfoVisible = false;
      this.errorVisible = true;
    }
  }
  
}
