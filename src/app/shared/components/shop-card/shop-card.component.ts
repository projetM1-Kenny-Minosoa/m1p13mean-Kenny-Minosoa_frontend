import { Input } from "@angular/core";

@Component({
  selector: 'app-shop-card',
  standalone: true,
  template: `
    <div style="border:1px solid #ddd; padding:10px;">
      <h3>{{shop?.name}}</h3>
      <button>Voir boutique</button>
    </div>
  `
})
export class ShopCardComponent {
  @Input() shop: any;
}

function Component(arg0: { selector: string; standalone: boolean; template: string; }): (target: typeof ShopCardComponent) => void | typeof ShopCardComponent {
    throw new Error("Function not implemented.");
}
