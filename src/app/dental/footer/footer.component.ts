import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { Icon } from '../shared/icon.component';
import { CLINIC, whatsappLink } from '../shared/clinic';

@Component({
  selector: 'fd-footer',
  imports: [Icon],
  template: `
    <footer>
      <div class="container">
        <div class="big" aria-hidden="true">F Dental Center</div>
        <div class="row">
          <p>{{ t().footer.tagline }}</p>
          <div class="socials">
            @for (s of clinic.socials; track s.label) {
              <a [href]="s.href" target="_blank" rel="noopener" class="glass" [attr.aria-label]="s.label">
                <fd-icon [name]="s.icon" />
              </a>
            }
            <a [href]="wa()" target="_blank" rel="noopener" class="glass" aria-label="WhatsApp">
              <fd-icon name="whatsapp" />
            </a>
          </div>
        </div>
        <div class="row bottom">
          <span>© {{ year }} {{ clinic.name }}. {{ t().footer.rights }}</span>
          <a [href]="clinic.phoneHref" dir="ltr">{{ clinic.phoneDisplay }}</a>
        </div>
      </div>
    </footer>
  `,
  styles: `
    footer {
      padding: 40px 0 28px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      overflow: hidden;
    }
    .big {
      font-size: clamp(44px, 11vw, 168px);
      font-weight: 500;
      line-height: 1;
      letter-spacing: -0.04em;
      white-space: nowrap;
      direction: ltr;
      text-align: center;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.02));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      margin-bottom: 32px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    p { color: var(--text-soft); font-size: 14px; }
    .socials { display: flex; gap: 8px; }
    .socials a {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      font-size: 20px;
      transition: transform 0.3s var(--ease);
    }
    .socials a:hover { transform: translateY(-3px); }
    .bottom {
      margin-top: 28px;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 12px;
      color: var(--text-mute);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly t = inject(I18n).t;
  protected readonly clinic = CLINIC;
  protected readonly year = new Date().getFullYear();
  protected readonly wa = () => whatsappLink(this.t().booking.whatsappMsg);
}
