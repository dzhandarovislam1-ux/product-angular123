import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { Reveal } from '../shared/reveal.directive';

// Цены «от», EGP — в том же порядке, что и строки в словаре
const PRICES = [600, 800, 1600, 1500, 2500, 1500, 2000, 2300, 3200, 7500, 8500, 9000, 14000, 55000];

@Component({
  selector: 'fd-prices',
  imports: [Reveal],
  template: `
    <section class="section" id="prices">
      <div class="container">
        <div class="sec-head">
          <span>{{ t().prices.label }}</span>
          <span class="sec-num">(06)</span>
        </div>
        <div class="layout">
          <div>
            <h2 class="sec-title" fdReveal>
              {{ t().prices.title }}
              <span class="soft">{{ t().prices.titleSoft }}</span>
            </h2>
            <p class="note" fdReveal>{{ t().prices.note }}</p>
          </div>

          <ul class="table glass" fdReveal>
            @for (row of rows(); track $index) {
              <li>
                <span class="name">{{ row.name }}</span>
                <span class="dots" aria-hidden="true"></span>
                <span class="price">
                  <small>{{ t().prices.from }}</small> {{ row.price }} <small>{{ t().prices.currency }}</small>
                </span>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: `
    .layout {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 40px;
      align-items: start;
    }
    .note {
      max-width: 34ch;
      font-size: 13px;
      color: var(--text-soft);
      margin-top: -24px;
    }
    .table {
      list-style: none;
      padding: 8px 26px;
      border-radius: var(--radius-lg);
    }
    li {
      display: flex;
      align-items: baseline;
      gap: 12px;
      padding: 15px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.09);
      font-size: 15px;
    }
    li:last-child { border-bottom: 0; }
    .dots {
      flex: 1;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.18);
      transform: translateY(-4px);
    }
    .price {
      font-weight: 500;
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }
    small {
      font-size: 11px;
      font-weight: 300;
      color: var(--text-mute);
    }
    @media (max-width: 860px) {
      .layout { grid-template-columns: 1fr; gap: 0; }
      .note { margin: -16px 0 28px; }
    }
    @media (max-width: 520px) {
      .table { padding: 4px 16px; }
      li { font-size: 14px; }
      .dots { min-width: 8px; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Prices {
  private readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;
  protected readonly rows = computed(() => {
    const locale = this.i18n.lang() === 'ru' ? 'ru-RU' : 'en-US';
    const fmt = new Intl.NumberFormat(locale);
    return this.t().prices.rows.map((name, i) => ({ name, price: fmt.format(PRICES[i]) }));
  });
}
