import { Component, signal } from '@angular/core';

interface StepCard {
  id: number;
  title: string;
  description: string;
  delayClass: string;
  iconType: 'map' | 'clock' | 'alert';
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent {
  readonly cards = signal<StepCard[]>([
    {
      id: 1,
      title: 'Строим по картам',
      description: 'Сверяем открытые картографические данные, привязки к крупным ориентирам, станциям метро и узловым развязкам Каира.',
      delayClass: 'ag-delay-100',
      iconType: 'map'
    },
    {
      id: 2,
      title: 'Добавляем буфер',
      description: 'Закладываем реалистичный запас времени на каирский трафик, ожидание транспорта и переходы, чтобы вы не опаздывали на уроки.',
      delayClass: 'ag-delay-200',
      iconType: 'clock'
    },
    {
      id: 3,
      title: 'Показываем риски',
      description: 'Открыто предупреждаем о возможных сложностях: где часто меняется тариф, где нет сдачи или сложный пешеходный переход.',
      delayClass: 'ag-delay-300',
      iconType: 'alert'
    }
  ]);
}

