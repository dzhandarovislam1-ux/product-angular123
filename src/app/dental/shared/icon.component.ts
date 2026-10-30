import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { inject } from '@angular/core';

// Простые линейные иконки (24×24, stroke = currentColor)
const PATHS: Record<string, string> = {
  arrow: '<path d="M7 17 17 7M9 7h8v8"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  star: '<path fill="currentColor" stroke="none" d="m12 2.8 2.8 5.7 6.3.9-4.55 4.43 1.07 6.27L12 17.1l-5.62 2.97 1.07-6.27L2.9 9.4l6.3-.9z"/>',
  implant: '<path d="M7 4c0-1 1-1.5 2-1.5h6c1 0 2 .5 2 1.5v2.5H7z"/><path d="M8 6.5h8M9 9.5h6M9.5 12.5h5M10 15.5h4M10.7 18.5h2.6M12 21v0"/>',
  veneer: '<path d="M6.5 4C4 4 3 6.3 3.3 9c.4 3.5 1.3 6 2 9 .4 1.8 2 1.8 2.3 0l.9-4.3c.3-1.4 2.7-1.4 3 0l.9 4.3c.3 1.8 1.9 1.8 2.3 0 .7-3 1.6-5.5 2-9C17 6.3 16 4 13.5 4 11.8 4 11 5 10 5S8.2 4 6.5 4z"/><path d="M19 3l.6 1.4L21 5l-1.4.6L19 7l-.6-1.4L17 5l1.4-.6z"/>',
  braces: '<rect x="3" y="8" width="5" height="8" rx="1.5"/><rect x="9.5" y="8" width="5" height="8" rx="1.5"/><rect x="16" y="8" width="5" height="8" rx="1.5"/><path d="M2 12h20"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z"/>',
  crown: '<path d="M4 8l4 3 4-6 4 6 4-3-1.5 10h-13z"/><path d="M6 21h12"/>',
  child: '<circle cx="12" cy="7" r="3.5"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7"/><path d="M10.5 6.5h0M13.5 6.5h0"/>',
  root: '<path d="M7 3c-2.5 0-3.5 2-3 5 .5 3 2 4.5 2.5 8 .3 2.5 1 5 2 5s1.2-2.5 1.5-4.5c.3-1.5 1-2.5 2-2.5s1.7 1 2 2.5c.3 2 .5 4.5 1.5 4.5s1.7-2.5 2-5c.5-3.5 2-5 2.5-8 .5-3-.5-5-3-5-1.7 0-2.6 1-5 1S8.7 3 7 3z"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
  scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M4 12h16"/>',
  cube: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12 4 7.5M12 12v9"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14c1 1.5 2.4 2.3 4 2.3s3-.8 4-2.3M9 9.5h0M15 9.5h0"/>',
  lab: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 15h9"/>',
  shield: '<path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  plane: '<path d="M2.5 13.5l19-8-5.5 15-4-6.5z"/><path d="M12 14l9.5-8.5"/>',
  home: '<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/>',
  pin: '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  quote: '<path fill="currentColor" stroke="none" d="M4 18v-5.5C4 8.4 6 6 10 5.5v2.6c-2 .5-3 1.8-3 4h3V18zm10 0v-5.5c0-4.1 2-6.5 6-7v2.6c-2 .5-3 1.8-3 4h3V18z"/>',
  whatsapp: '<path d="M4 20l1.3-4A8.5 8.5 0 1 1 8.4 19z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .8a5 5 0 0 1-2.7-2.7l.8-1-1-2z"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7h0"/>',
  facebook: '<path d="M14 21v-7.5h2.5l.5-3h-3V8.8c0-.9.4-1.5 1.6-1.5H17V4.6c-.3 0-1.2-.1-2.3-.1-2.4 0-3.7 1.4-3.7 3.9v2.1H8.5v3H11V21"/>',
  tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.5 2.7 2.3 4.5 5 4.8"/>',
  snapchat: '<path d="M12 3.5c3 0 4.8 2.2 4.8 5v2.3l1.9-.6c.6 0 .8.7.3 1l-2 1.2c.6 1.7 1.9 3 3.5 3.5-.4 1-1.6 1.2-2.7 1.4l-.4 1.4-2-.2c-1 .1-2 1.5-3.4 1.5s-2.4-1.4-3.4-1.5l-2 .2-.4-1.4c-1.1-.2-2.3-.4-2.7-1.4 1.6-.5 2.9-1.8 3.5-3.5l-2-1.2c-.5-.3-.3-1 .3-1l1.9.6V8.5c0-2.8 1.8-5 4.8-5z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.7 5.5 3.7 9s-1.2 6.5-3.7 9c-2.5-2.5-3.7-5.5-3.7-9S9.5 5.5 12 3z"/>',
  tooth: '<path d="M7.5 3.5C5 3.5 3.8 5.5 4.2 8.3c.4 2.8 1.6 4.2 2 7 .4 2.8 1 5.2 2.1 5.2s1.3-2.4 1.6-4.3c.2-1.4.9-2.2 2.1-2.2s1.9.8 2.1 2.2c.3 1.9.5 4.3 1.6 4.3s1.7-2.4 2.1-5.2c.4-2.8 1.6-4.2 2-7 .4-2.8-.8-4.8-3.3-4.8-1.8 0-2.6.9-4.5.9S9.3 3.5 7.5 3.5z"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19.5c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14c2.6.1 4.5 1.9 4.5 4.5"/>',
  card: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/>',
};

@Component({
  selector: 'fd-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'fd-icon', 'aria-hidden': 'true' },
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.stroke-width]="stroke()"
    stroke-linecap="round" stroke-linejoin="round" [innerHTML]="svg()"></svg>`,
  styles: `
    :host { display: inline-flex; width: 1.25em; height: 1.25em; flex: none; }
    svg { width: 100%; height: 100%; }
  `,
})
export class Icon {
  private readonly sanitizer = inject(DomSanitizer);
  readonly name = input.required<string>();
  readonly stroke = input(1.5);
  // Пути заданы статически в этом файле, поэтому bypass безопасен
  readonly svg = computed(() => this.sanitizer.bypassSecurityTrustHtml(PATHS[this.name()] ?? ''));
}
