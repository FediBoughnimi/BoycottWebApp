import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { ReviewService } from 'src/app/services/reviews.service';
import { ContactMessageService } from '../../services/contact-admin.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
  numberOfProducts: number = 0;
  numberOfCategories: number = 0;
  numberOfReviews: number = 0;
  numberOfContacs: number = 0;

  constructor(
    private ProductService: ProductService,
    private CategoryService: CategoryService,
    private ReviewService: ReviewService,
    private ContactService: ContactMessageService
  ) {}
  ngOnInit(): void {
    this.getDashboardData();
  }
  getDashboardData(){
    this.ProductService.getAllProducts().subscribe(data => {
      this.numberOfProducts = data.length;
    });
    this.CategoryService.getCategories().subscribe(data => {
      this.numberOfCategories = data.length;
    });
    this.ReviewService.getAllReviews().subscribe(data => {
      this.numberOfReviews = data.length;
    });
    this.ContactService.getMessages().subscribe(data => {
      this.numberOfContacs = data.length;
    });
  }


}
