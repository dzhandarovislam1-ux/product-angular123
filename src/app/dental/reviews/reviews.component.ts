import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { Icon } from '../shared/icon.component';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'fd-reviews',
  imports: [Icon, Reveal],
  template: `
    <section class="section">
      <div class="container">
        <div class="sec-head">
          <span>{{ t().reviews.label }}</span>
          <span class="sec-num">(08)</span>
        </div>
        <div class="head">
          <h2 class="sec-title" fdReveal>
            {{ t().reviews.title }}
            <span class="soft">{{ t().reviews.titleSoft }}</span>
          </h2>
          <div class="score" fdReveal>
            <strong>5.0</strong>
            <span class="stars">
              @for (s of stars; track $index) { <fd-icon name="star" /> }
            </span>
            <small>{{ t().reviews.source }}</small>
          </div>
        </div>

        <div class="grid">
          @for (r of t().reviews.items; track $index) {
            <figure class="review glass" [fdReveal]="$index * 90">
              <fd-icon name="quote" class="q" />
              <blockquote>{{ r.text }}</blockquote>
              <figcaption>
                <span class="av">{{ r.name.charAt(0) }}</span>
                <span>
                  <strong>{{ r.name }}</strong>
                  <small>{{ r.service }}</small>
                </span>
              </figcaption>
            </figure>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .head {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 24px;
      flex-wrap: wrap;
    }
    .score {
      display: grid;
      justify-items: end;
      gap: 4px;
      margin-bottom: clamp(32px, 5vw, 64px);
    }
    .score strong {
      font-size: 56px;
      font-weight: 300;
      line-height: 1;
    }
    .stars { display: flex; gap: 2px; color: #fff; }
    .score small { font-size: 11px; color: var(--text-mute); }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .review {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 26px;
      border-radius: var(--radius-lg);
    }
    .q { font-size: 28px; color: var(--accent); }
    blockquote {
      flex: 1;
      font-size: 15px;
      line-height: 1.65;
    }
    figcaption {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
    }
    .av {
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(160deg, #fff, var(--ice-300));
      color: var(--ink-800);
      font-weight: 600;
    }
    figcaption strong { display: block; font-weight: 500; font-size: 14px; }
    figcaption small { font-size: 12px; color: var(--text-mute); }
    @media (max-width: 960px) {
      .grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 560px) {
      .score { justify-items: start; margin-top: -16px; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Reviews {
  protected readonly t = inject(I18n).t;
  protected readonly stars = [1, 2, 3, 4, 5];
}
