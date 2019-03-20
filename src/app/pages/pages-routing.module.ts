import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { BuscadorVoosComponent } from './buscador-voos/buscador-voos.component';

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
        {
            path: 'buscador-voos',
            component: BuscadorVoosComponent,
        },
        {
            path: '',
            redirectTo: 'buscador-voos',
            pathMatch: 'full',
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}
