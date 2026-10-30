import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { Icon } from '../shared/icon.component';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'fd-intl',
  imports: [Icon, Reveal],
  template: `
    <section class="section">
      <div class="container">
        <div class="panel glass" fdReveal>
          <div class="sec-head">
            <span>{{ t().intl.label }}</span>
            <span class="sec-num">(07)</span>
          </div>
          <h2 class="sec-title">
            {{ t().intl.title }}
            <span class="soft">{{ t().intl.titleSoft }}</span>
          </h2>
          <div class="items">
            @for (item of t().intl.items; track $index) {
              <div class="item" [fdReveal]="$index * 80">
                <span class="ico"><fd-icon [name]="icons[$index]" /></span>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .panel {
      padding: clamp(24px, 4vw, 56px);
      border-radius: 32px;
      overflow: hidden;
      background:
        radial-gradient(60% 80% at 100% 0%, rgba(111, 242, 198, 0.25), transparent 60%),
        linear-gradient(135deg, var(--glass-a), var(--glass-b));
    }
    .sec-title { max-width: 22ch; }
    .items {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }
    .ico {
      display: grid;
      place-items: center;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      font-size: 22px;
      background: #fff;
      color: var(--ink-700);
      margin-bottom: 18px;
      box-shadow: 0 8px 24px rgba(111, 242, 198, 0.3);
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
    @media (max-width: 960px) {
      .items { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 520px) {
      .items { grid-template-columns: 1fr; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class International {
  protected readonly t = inject(I18n).t;
  protected readonly icons = ['plane', 'home', 'globe', 'whatsapp'];
}
