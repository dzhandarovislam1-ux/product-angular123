import { Component } from '@angular/core';
import { Header } from './dental/header/header.component';
import { Hero } from './dental/hero/hero.component';
import { About } from './dental/about/about.component';
import { Gallery } from './dental/gallery/gallery.component';
import { Services } from './dental/services/services.component';
import { Tech } from './dental/tech/tech.component';
import { Doctors } from './dental/doctors/doctors.component';
import { Prices } from './dental/prices/prices.component';
import { International } from './dental/intl/intl.component';
import { Reviews } from './dental/reviews/reviews.component';
import { Booking } from './dental/booking/booking.component';
import { Footer } from './dental/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, About, Gallery, Services, Tech, Doctors, Prices, International, Reviews, Booking, Footer],
  templateUrl: './app.html',
})
export class App {}
