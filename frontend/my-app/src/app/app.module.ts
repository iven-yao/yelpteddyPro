import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TestComponent } from './test/test.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { BookingComponent } from './booking/booking.component';

const appRoutes: Routes = [
  { path: 'search', component:SearchComponent, pathMatch:'full'},
  { path: 'booking', component: BookingComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    TestComponent,
    SearchComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
