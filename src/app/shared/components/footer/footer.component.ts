import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,   
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <p>RANDRIA HARISON Kenny Johary et RANDRIANATOANDRO Minosoa</p>
      <p>Master I promotion 13</p>
      <p>©2026</p>
    </footer>
  `,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {}