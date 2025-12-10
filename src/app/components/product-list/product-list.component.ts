import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../../service/product';
import { CartService } from '../../service/cart';
import { Product } from '../../models/product.model';
import { CurrencyPipe, NgForOf, NgIf, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CurrencyPipe,NgIf, NgForOf, SlicePipe],
  standalone: true,
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    @Inject(ProductService) private productService: ProductService,
    @Inject(CartService) private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load products.';
        this.isLoading = false;
      }
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert('Added to cart');
  }
}
