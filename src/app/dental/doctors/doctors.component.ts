import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'fd-doctors',
  imports: [Reveal],
  template: `
    <section class="section" id="doctors">
      <div class="container">
        <div class="sec-head">
          <span>{{ t().doctors.label }}</span>
          <span class="sec-num">(05)</span>
        </div>
        <h2 class="sec-title" fdReveal>
          {{ t().doctors.title }}
          <span class="soft">{{ t().doctors.titleSoft }}</span>
        </h2>

        <div class="grid">
          @for (d of t().doctors.items; track $index) {
            <article class="doc glass" [class.lead]="$index === 0" [fdReveal]="($index % 4) * 80">
              <div class="avatar">
                <img [src]="'images/doctors/' + photos[$index] + '.webp'" [alt]="d.name" loading="lazy" />
              </div>
              <div class="info">
                <h3>{{ d.name }}</h3>
                <p class="role">{{ d.role }}</p>
                <p class="meta">{{ d.meta }}</p>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    .doc {
      display: flex;
      flex-direction: column;
      gap: 18px;
      padding: 14px 14px 20px;
      border-radius: var(--radius-lg);
      transition: transform 0.45s var(--ease), border-color 0.45s;
    }
    .doc:hover {
      transform: translateY(-6px);
      border-color: rgba(255, 255, 255, 0.4);
    }
    .avatar {
      position: relative;
      aspect-ratio: 4 / 4.4;
      border-radius: 16px;
      overflow: hidden;
      background: linear-gradient(180deg, #f4fbf8, #dcefe8);
    }
    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 12%;
      transition: transform 0.8s var(--ease);
    }
    .doc:hover .avatar img { transform: scale(1.05); }
    .avatar::after {
      content: '';
      position: absolute;
      inset: auto 0 0;
      height: 30%;
      background: linear-gradient(0deg, rgba(111, 242, 198, 0.25), transparent);
    }
    .info { padding-inline: 6px; }
    h3 {
      font-size: 17px;
      font-weight: 500;
      line-height: 1.3;
      margin-bottom: 4px;
    }
    .role {
      font-size: 13px;
      color: var(--text-soft);
      margin-bottom: 10px;
    }
    .meta {
      display: inline-block;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 99px;
      background: rgba(111, 242, 198, 0.14);
      color: var(--accent);
    }
    @media (max-width: 1080px) {
      .grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 520px) {
      .doc { flex-direction: row; align-items: center; padding: 12px; }
      .avatar { width: 84px; flex: none; aspect-ratio: 1; }

      .grid { grid-template-columns: 1fr; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Doctors {
  protected readonly t = inject(I18n).t;
  // Порядок совпадает со списком врачей в словаре
  protected readonly photos = ['vadim', 'mahmoud', 'essam', 'mona', 'amr', 'eman-badr', 'eman-mohamed', 'ahmed'];
}
