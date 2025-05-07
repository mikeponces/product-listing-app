# Angular Essentials
`npm install -g @angular/cli`

## Data Binding and Pipes
### Property Binding
- Preferred over string interpolation `{{product.imageUrl}}`, since it can support non-string types like `number`.
- Angular also cleanses the data when using property binding.
- Also more efficient in terms of performance.
```html
<!-- square brackets denotes that the value is dynamic, not static -->
<img [src]='product.imageUrl'>
<input type='text' [disabled]='isDisabled' />
```

### Handling Events with Event Binding
- Fundamental for creating interactive applications. Enables components to react to user input.

```html
<!-- Event enclosed in parenthesis -->
<button (click)='toggleImage()'>
```

```ts
export class ListComponent {
    pageTitle: string = 'Product List';
    toggleImage(): void { ... }
}
```

### Handling inputs with two-way Binding
- Combination of data and method event binding.
- If the input value changes, the component value changes and vice versa.
- Requires the forms module.
```html
<input type='text' [(ngModel)]='listFilter' />
```

```ts
export class ListComponent {
    listFilter: string = 'cart';
}
```
### Transforming data with Pipes
- Transform bound properties before display
- Built-in pipes: date, number, decimal, percent, currency, json, etc.
- Custom pipes can also be created

`{{product.productCode | lowercase}}`

`{{product.price | currency: 'USD' : 'symbol' : '1.2-2'}}`

## More on Components
### Defining interfaces
- An interface is a specification identifying a related set of properties and methods.
- Can be used as a data type or feature set (with methods)
```ts
// (data) type
export interface IProduct {
    productId: number;
    productName: string;
    productCode: string;
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
}

// feature set
export interface DoTiming {
    count: number;
    start(index: number): void;
    stop(): void;
}

products: IProduct[] = [];

export class MyComponennt implements DoTiming {
    count: number = 0;
    start(index: number): void {
        // ...
    }
    stop(): void {
        // ...
    }
}
```

### Encapsulating component styles
- Templates sometimes require unique styles
- We can inline the styles directly into the HTML attributes (makes HTML dirty and complex)
- We can build an external stylesheet
- If you want styles to be shared, has to be under `styles.css`.

```ts
@Component({
    styles: ['thead {color: #337AB7;}']
})

@Component({
    styleUrls: ['./product-list.component.css]
})
```

### Using Lifecycle Hooks
1. Create
2. Render
3. Create and Render Children 
4. Process Changes 
5. Destroy

A lifecycle hook is an interface we implement to write code when a component lifecycle event occurs.

- `OnInit`: perform component initialization, such as retrieval of data
- `OnChanges`: perform action after change to input properties
- `OnDestroy`: perform cleanup

```ts
export class ProductListComponent implements OnInit {
    // ...
    ngOnInit(): void {
        console.log('In OnInit');
    }
}
```

### Building Custom Pipes
- Transform bound properties before display
- Implement `PipeTransform`, use `@Pipe`, and define under `declarations`

```ts
@Pipe({
    name: 'convertToSpaces'
})
export class ConvertToSpacesPipe implements PipeTransform {

    transform(value: string, character: string): string { ... }
}
```

### Getters and setters
- Allows control access to a class property
- Used when wanting to encapsulate logic
```ts
private amount: number = 0;

get amount(): number {
    return this.amount;
}

set amount(value: number) {
    this.amount = value;
}

```

### Filtering and arrow functions

```ts
products: IProduct[] = [...];

performFilter(): IProduct[] {
    return this.products.filter((product:IProduct) => product.productName.includes(this.listFilter));
}
```

## Nested Components
- It's template manages a fragment of a larger view
- It has a selector
### Using the Nested Component
```html
<body>
    <pm-root></pm-root>
</body>
```
### Building Nested Components
- Passing data to a nested component using `@Input`
- Passing data from a component using `@Output`
```ts
@Component({
    selector: 'pm-star',
})
export class StarComponent {
    @Input() rating: number;
    cropWidth: number;
    @Output notify: EventEmitter<string> = new EventEmitter<string>();
}
```
```ts
onClick() {
    this.notify.emit('clicked!');
}
```
```html
<td>
    <pm-star [rating]='product.starRating'
             (notify)='onNotify($event)'>
    </pm-star>
</td>
```