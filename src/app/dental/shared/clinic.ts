/** Контакты клиники (не зависят от языка). */
export const CLINIC = {
  name: 'F Dental Center',
  phoneDisplay: '+20 101 234 5678',
  phoneHref: 'tel:+201012345678',
  whatsappNumber: '201012345678',
  mapEmbed: 'https://maps.google.com/maps?q=42%20Babel%20St%2C%20Dokki%2C%20Giza%2C%20Egypt&z=16&output=embed',
  mapLink: 'https://maps.google.com/?q=42+Babel+St,+Dokki,+Giza,+Egypt',
  socials: [
    { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/f.dental.center/' },
    { icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/F.Dental.Center/' },
    { icon: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@f.dental.center' },
    { icon: 'snapchat', label: 'Snapchat', href: 'https://www.snapchat.com/add/fdental1center' },
  ],
};

export function whatsappLink(message: string): string {
  return `https://wa.me/${CLINIC.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
