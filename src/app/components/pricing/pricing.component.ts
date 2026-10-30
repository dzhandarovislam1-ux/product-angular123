import { Component, signal } from '@angular/core';

interface PricingTier {
  id: string;
  title: string;
  price: string;
  tag: string;
  description: string;
  features: string[];
  detailsNote: string;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  readonly selectedTierId = signal<string | null>(null);

  readonly tiers = signal<PricingTier[]>([
    {
      id: 'arrival',
      title: 'Базовый PDF: Прилёт и Быт',
      price: '500 ₽',
      tag: 'Офлайн-пакет №1',
      description: 'Для тех, кто прилетает впервые: от выхода из аэропорта до покупки сим-карты и базовой ориентировки в районах.',
      features: [
        'PDF-схемы маршрутов по картам + буфер на пробки',
        'Чек-лист первой недели и обмена валюты',
        'Сводка честных рисков при аренде и поездках в такси'
      ],
      detailsNote: 'Вы получаете набор PDF-файлов для сохранения на телефон. Доступ к файлам остаётся у вас без интернета.'
    },
    {
      id: 'study',
      title: 'Учебный PDF: Маршруты к марказам',
      price: '500 ₽',
      tag: 'Офлайн-пакет №2',
      description: 'Для студентов арабского языка, Корана и Сиры: логистика между учебными районами (Мадинат-Наср, Маади, Докки и др.).',
      features: [
        'Маршруты по картам с расчётом буфера в часы пик',
        'Ориентиры остановок, пересадок и станций метро',
        'Карта бытовой инфраструктуры рядом с учебными центрами'
      ],
      detailsNote: 'Только структурированные PDF-карточки маршрутов и текстовые памятки. Без личного сопровождения.'
    },
    {
      id: 'full',
      title: 'Полный комплект PDF-справочников',
      price: '800–900 ₽',
      tag: 'Оба пакета + словарь',
      description: 'Объединённый архив всех офлайн-материалов по быту, учебным маршрутам и базовым диалогам на египетском диалекте.',
      features: [
        'Все маршруты по картам + буфер на пробки + честные риски',
        'Карманный PDF-разговорник для транспорта и бытовых задач',
        'Памятка по продлению визы и правилам безопасности'
      ],
      detailsNote: 'Цена зависит от включения дополнительных районных схем. Все материалы поставляются как офлайн PDF-документы.'
    }
  ]);

  toggleDetails(id: string): void {
    this.selectedTierId.update(current => (current === id ? null : id));
  }
}

