import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { BuscadorVoosModule } from './buscador-voos/buscador-voos.module';

// Componentes do tema
import {
  NbSidebarModule,
  NbLayoutModule,
  NbSidebarService,
  NbMenuModule
} from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    BuscadorVoosModule,
    PagesRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule
  ],
  declarations: [PagesComponent],
  providers: [NbSidebarService, NbMenuModule.forRoot().providers]
})
export class PagesModule { }
