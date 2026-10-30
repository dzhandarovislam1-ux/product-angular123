import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { I18n, Lang } from '../i18n/i18n.service';
import { Icon } from '../shared/icon.component';

@Component({
  selector: 'fd-header',
  imports: [Icon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;
  protected readonly scrolled = signal(false);
  protected readonly open = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.open.set(false);
  }

  setLang(lang: Lang): void {
    this.i18n.lang.set(lang);
  }

  toggle(): void {
    this.open.update((v) => !v);
  }

  close(): void {
    this.open.set(false);
  }
}
