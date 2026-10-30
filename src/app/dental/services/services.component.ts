import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { Icon } from '../shared/icon.component';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'fd-services',
  imports: [Icon, Reveal],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  protected readonly t = inject(I18n).t;
  protected readonly icons = ['implant', 'veneer', 'braces', 'sparkle', 'crown', 'child', 'root', 'drop'];
}
