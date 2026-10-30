import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { Icon } from '../shared/icon.component';

@Component({
  selector: 'fd-hero',
  imports: [Icon],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly t = inject(I18n).t;
}
