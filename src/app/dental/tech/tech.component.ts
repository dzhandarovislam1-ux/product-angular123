import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { Icon } from '../shared/icon.component';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'fd-tech',
  imports: [Icon, Reveal],
  template: `
    <section class="section">
      <div class="container">
        <div class="sec-head">
          <span>{{ t().tech.label }}</span>
          <span class="sec-num">(04)</span>
        </div>
        <div class="layout">
          <h2 class="sec-title" fdReveal>
            {{ t().tech.title }}
            <span class="soft">{{ t().tech.titleSoft }}</span>
          </h2>
          <ul class="list">
            @for (item of t().tech.items; track $index) {
              <li [fdReveal]="$index * 60">
                <span class="ico"><fd-icon [name]="icons[$index]" /></span>
                <div>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.text }}</p>
                </div>
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
      grid-template-columns: 1fr 1.4fr;
      gap: 40px;
      align-items: start;
    }
    .sec-title {
      position: sticky;
      top: 110px;
    }
    .list {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0 32px;
    }
    li {
      display: flex;
      gap: 16px;
      padding: 24px 0;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
    }
    .ico {
      font-size: 26px;
      color: var(--accent);
      padding-top: 2px;
    }
    h3 {
      font-size: 17px;
      font-weight: 500;
      margin-bottom: 6px;
    }
    p {
      font-size: 13px;
      color: var(--text-soft);
    }
    @media (max-width: 860px) {
      .layout { grid-template-columns: 1fr; gap: 0; }
      .sec-title { position: static; }
    }
    @media (max-width: 560px) {
      .list { grid-template-columns: 1fr; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tech {
  protected readonly t = inject(I18n).t;
  protected readonly icons = ['cube', 'scan', 'cpu', 'smile', 'lab', 'shield'];
}
