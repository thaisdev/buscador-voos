import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorVoosComponent } from './buscador-voos.component';
import { AeroportosService } from 'src/app/shared/services/aeroportos.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { VooService } from 'src/app/shared/services/voo.service';
import { DetalhesVoosComponent } from './detalhes-voos/detalhes-voos.component';
import { NbDialogModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NbDialogModule.forChild(),
  ],
  exports: [
    DetalhesVoosComponent
  ],
  declarations: [
    BuscadorVoosComponent, 
    DetalhesVoosComponent
  ],
  providers: [
    AeroportosService,
    VooService
  ],
  entryComponents: [DetalhesVoosComponent]
})
export class BuscadorVoosModule { }
