import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { I18n } from '../i18n/i18n.service';
import { Icon } from '../shared/icon.component';
import { Reveal } from '../shared/reveal.directive';
import { CLINIC, whatsappLink } from '../shared/clinic';

@Component({
  selector: 'fd-booking',
  imports: [Icon, Reveal],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Booking {
  protected readonly t = inject(I18n).t;
  protected readonly clinic = CLINIC;
  protected readonly sent = signal(false);
  protected readonly today = new Date().toISOString().slice(0, 10);
  protected readonly whatsapp = computed(() => whatsappLink(this.t().booking.whatsappMsg));
  // Ссылка на карту — константа из clinic.ts
  protected readonly mapUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(CLINIC.mapEmbed);

  // Демо: заявка никуда не отправляется, просто показываем подтверждение
  submit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    this.sent.set(true);
    form.reset();
  }
}
