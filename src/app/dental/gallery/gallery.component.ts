import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'fd-gallery',
  imports: [Reveal],
  template: `
    <section class="section" id="clinic">
      <div class="container">
        <div class="sec-head">
          <span>{{ t().gallery.label }}</span>
          <span class="sec-num">(02)</span>
        </div>
        <h2 class="sec-title" fdReveal>
          {{ t().gallery.title }}
          <span class="soft">{{ t().gallery.titleSoft }}</span>
        </h2>

        <div class="grid">
          @for (p of photos; track p; let i = $index) {
            <figure class="ph" [class]="'ph ph-' + i" [fdReveal]="(i % 3) * 80">
              <img [src]="'images/clinic/' + p + '.webp'" [alt]="t().gallery.captions[i]" loading="lazy" />
              <figcaption>{{ t().gallery.captions[i] }}</figcaption>
            </figure>
          }
        </div>

        <figure class="team" fdReveal>
          <img src="images/clinic/team.webp" [alt]="t().gallery.team" loading="lazy" />
          <figcaption class="glass">{{ t().gallery.team }}</figcaption>
        </figure>
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 220px;
      gap: 12px;
    }
    .ph {
      position: relative;
      margin: 0;
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--glass-border);
    }
    .ph-0 { grid-column: span 2; grid-row: span 2; }
    .ph-1, .ph-4, .ph-5 { grid-column: span 2; }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.8s var(--ease);
    }
    .ph:hover img { transform: scale(1.05); }
    .ph figcaption {
      position: absolute;
      inset: auto 12px 12px;
      width: fit-content;
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
      color: #052019;
      background: rgba(239, 253, 248, 0.88);
      -webkit-backdrop-filter: blur(8px);
      backdrop-filter: blur(8px);
    }
    .team {
      position: relative;
      margin: 12px 0 0;
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--glass-border);
      aspect-ratio: 16 / 7;
    }
    .team img { object-position: center 30%; }
    .team::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg, rgba(4, 22, 18, 0.7), transparent 45%);
    }
    .team figcaption {
      position: absolute;
      z-index: 1;
      inset: auto 20px 20px;
      width: fit-content;
      padding: 12px 20px;
      border-radius: 999px;
      font-weight: 600;
    }
    @media (max-width: 860px) {
      .grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 160px; }
      .ph-0 { grid-row: span 2; }
      .team { aspect-ratio: 4 / 3; }
      .team figcaption { font-size: 13px; padding: 8px 14px; inset: auto 12px 12px; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Gallery {
  protected readonly t = inject(I18n).t;
  // Порядок совпадает с подписями в словаре
  protected readonly photos = ['facade', 'reception', 'cabinet-logo', 'lobby', 'lab', 'cbct'];
}
