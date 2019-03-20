import { Component, OnInit, Inject } from '@angular/core';
import { NbDialogRef, NB_DIALOG_CONFIG } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { IVooEscalado } from 'src/app/shared/shared.types';

@Component({
  selector: 'app-detalhes-voos',
  templateUrl: './detalhes-voos.component.html',
  styleUrls: ['./detalhes-voos.component.scss']
})
export class DetalhesVoosComponent implements OnInit {

  settings = {
    mode: 'external',
    hideSubHeader: true,
    columns: {
      voo: {
        title: 'Voo',
        type: 'string',
        filter: false,
      },
      origem: {
        title: 'Origem',
        type: 'string',
        filter: false,
      },
      destino: {
        title: 'Destino',
        type: 'number',
        filter: false,
      },
      data_saida: {
        title: 'Data',
        type: 'string',
        filter: false,
      },
      saida: {
        title: 'Saída',
        type: 'string',
        filter: false,
      },
      chegada: {
        title: 'Chegada',
        type: 'string',
        filter: false,
      },
      valorFormatado: {
        title: 'Valor',
        type: 'string',
        filter: false,
      }
    },
    noDataMessage: 'Nenhum voo encontrado',
    actions: {
      columnTitle: 'Ações',
      add: false,
      edit: false,
      delete: false
    }
  };

  sourceVoosEscalados: LocalDataSource = new LocalDataSource();

  constructor(private dialogRef: NbDialogRef<DetalhesVoosComponent>,
    @Inject(NB_DIALOG_CONFIG) public data: any) { }

  ngOnInit() {
    this.__setDataTable();
  }

  /**
   * @author Josiane Thaís
   * @since 03/2019
   * Prepara a lista de voos para serem exibidas no DataTable
   */
  private __setDataTable() {
    const listaVoos: Array<IVooEscalado> = [];

    for (const vooEscalado of this.data.voosEscalados) {
      listaVoos.push({
        'voo': vooEscalado.voo,
        'origem': vooEscalado.origem,
        'destino': vooEscalado.destino,
        'data_saida': this.__formatDateBr(vooEscalado.data_saida),
        'saida': vooEscalado.saida,
        'chegada': vooEscalado.chegada,
        'valorFormatado': 'R$ ' + vooEscalado.valor.toFixed(2).replace(".",",")
      })
    }
    
    this.sourceVoosEscalados.load(listaVoos);
  }

  /**
   * @author Josiane Thaís
   * @since 03/2019
   * Formatar string date para o padrão BR 
   */
  private __formatDateBr(date: string): string {
    let dateFormatBr: string;

    if (date) {
      const cols: Array<string> = date.split('-');
      dateFormatBr = cols[2] + '/' + cols[1] + '/' + cols[0];
    }

    return dateFormatBr;
  }

  /**
   * @author Josiane Thaís
   * @since 03/2019
   * Fechar o modal
   */
  public close() {
    this.dialogRef.close();
  }

}
