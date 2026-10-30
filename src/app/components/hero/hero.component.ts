import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly isLoading = signal<boolean>(false);

  onActionClick(): void {
    if (this.isLoading()) return;
    this.isLoading.set(true);

    setTimeout(() => {
      this.isLoading.set(false);
      const pricingEl = document.getElementById('pricing-section');
      pricingEl?.scrollIntoView({ behavior: 'smooth' });
    }, 900);
  }
}

