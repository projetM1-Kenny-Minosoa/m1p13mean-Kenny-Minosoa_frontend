import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <p><strong>Kenny Johary</strong> et <strong>Minosoa Randrianatoandro</strong></p>
      <p class="promo">Master I promotion 13</p>
    </footer>
  `,
  styles: [`
    .footer {
      text-align: center;
      padding: 20px;
      margin-top: 40px;
    }

    .promo {
      margin-top: 8px;
      font-size: 14px;
    }
  `]
})
export class FooterComponent {}