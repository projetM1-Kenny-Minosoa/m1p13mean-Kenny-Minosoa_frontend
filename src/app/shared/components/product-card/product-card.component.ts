import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="border:1px solid #ccc; padding:10px;">
      <h3>{{product?.name}}</h3>
      <p>{{product?.price}} Ar</p>
      <button>Acheter</button>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product: any;
}