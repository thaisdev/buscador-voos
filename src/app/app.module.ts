import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { NbThemeModule, NbDatepickerModule, NbDialogModule } from '@nebular/theme';
import { ThemeModule } from './@theme/theme.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    NbThemeModule.forRoot({ name: 'corporate' }),
    FormsModule,
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
