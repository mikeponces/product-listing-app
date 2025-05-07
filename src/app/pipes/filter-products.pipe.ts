import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.interface';

@Pipe({
  name: 'filterProducts',
  standalone: true
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: Product[], filterText: string, filterCategory: string,
    showOutOfStock: boolean): Product[] {
    if (!products) return [];

    return products.filter(product => {
      // Filter by text (name or description)
      const textMatch = !filterText ||
        product.name.toLowerCase().includes(filterText.toLowerCase()) ||
        product.description.toLowerCase().includes(filterText.toLowerCase());

      // Filter by category
      const categoryMatch = !filterCategory || product.category === filterCategory;

      // Filter by stock
      const stockMatch = showOutOfStock || product.inStock;

      return textMatch && categoryMatch && stockMatch;
    });
  }
}
