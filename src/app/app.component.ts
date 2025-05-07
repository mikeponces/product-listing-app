import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductListComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'product-listing-app';
}
