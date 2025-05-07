import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterProductsPipe } from '../../pipes/filter-products.pipe';
import { Product } from '../../models/product.interface';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterProductsPipe],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  private subscription: Subscription | null = null;

  // Filter properties with getters and setters
  private _filterText = '';
  private _filterCategory = '';
  private _showOutOfStock = true;

  get filterText(): string {
    return this._filterText;
  }

  set filterText(value: string) {
    this._filterText = value;
    this.applyFilters();
  }

  get filterCategory(): string {
    return this._filterCategory;
  }

  set filterCategory(value: string) {
    this._filterCategory = value;
    this.applyFilters();
  }

  get showOutOfStock(): boolean {
    return this._showOutOfStock;
  }

  set showOutOfStock(value: boolean) {
    this._showOutOfStock = value;
    this.applyFilters();
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadProducts(): void {
    this.subscription = this.http.get<Product[]>('assets/data/products.json')
      .subscribe({
        next: (data) => {
          this.products = data;
          this.filteredProducts = [...this.products];
          // Extract unique categories
          const categorySet = new Set<string>();
          this.products.forEach(product => categorySet.add(product.category));
          this.categories = Array.from(categorySet);
        },
        error: (err) => console.error('Error loading products:', err)
      });
  }

  applyFilters(): void {
    // Using our custom pipe to filter products
    const filterPipe = new FilterProductsPipe();
    this.filteredProducts = filterPipe.transform(
      this.products,
      this.filterText,
      this.filterCategory,
      this.showOutOfStock
    );
  }

  resetFilters(): void {
    this._filterText = '';
    this._filterCategory = '';
    this._showOutOfStock = true;
    this.filteredProducts = [...this.products];
  }
}
