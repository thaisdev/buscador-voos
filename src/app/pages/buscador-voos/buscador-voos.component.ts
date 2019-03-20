import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IAeroporto, IVooEscalado, IVoo } from 'src/app/shared/shared.types';
import { AeroportosService } from 'src/app/shared/services/aeroportos.service';
import { VooService } from 'src/app/shared/services/voo.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { DetalhesVoosComponent } from './detalhes-voos/detalhes-voos.component';

@Component({
  selector: 'app-buscador-voos',
  templateUrl: './buscador-voos.component.html',
  styleUrls: ['./buscador-voos.component.scss'],
})
export class BuscadorVoosComponent implements OnInit {

  public formBusca: FormGroup = new FormGroup({
    aeroportoOrigem: new FormControl(null, Validators.required),
    aeroportoDestino: new FormControl(null, Validators.required),
    dataSaida: new FormControl(null, Validators.required)
  });

  public aeroportos: Array<IAeroporto>;
  public voos: any;
  public loading: boolean;

  settings = {
    mode: 'external',
    hideSubHeader: true,
    columns: {
      qtdVoos: {
        title: 'Voos Escalados',
        type: 'number',
        filter: false,
      },
      tempoTotalVooFormatado: {
        title: 'Tempo Total de Voo',
        type: 'string',
        filter: false,
        compareFunction: (direction: any, a: any, b: any) => {
          if (this.getMinutes(a) < this.getMinutes(b)) {
            return -1 * direction;
          }
          if (this.getMinutes(a) > this.getMinutes(b)) {
            return direction;
          }

          return 0;
      }
      },
      valorTotalFormatado: {
        title: 'Valor Total',
        type: 'string',
        filter: false,
        compareFunction: (direction: any, a: any, b: any) => {
            // Converting strings to floats
            let first = parseFloat(a.replace("R$ ", "").replace(",","."));
            let second = parseFloat(b.replace("R$ ", "").replace(",","."));

            if (first < second) {
                return -1 * direction;
            }
            if (first > second) {
                return direction;
            }
            return 0;
        }
      }
    },
    noDataMessage: 'Nenhum voo encontrado',
    actions: {
      columnTitle: 'Ações',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'verVoos', title: '<i class="nb-location"></i>' }
      ]
    }
  };

  sourceVoos: LocalDataSource = new LocalDataSource();

  constructor(private aeroportoService: AeroportosService, 
    private vooService: VooService,
    private dialogService: NbDialogService) { }

  ngOnInit() {
    this.setForm();
  }

  /**
   * @author Josiane Thaís
   * @since 03/2019
   * Lista as opções dos aeroportos nos campos de seleção
   */
  private async setForm() {
    this.formBusca.disable();

    try {
      this.aeroportos = <IAeroporto[]> await this.aeroportoService.getAll();
    } catch (err) {
      alert(err.message);
    }

    this.formBusca.enable();
  }

  /**
   * @author Josiane Thaís
   * @since 03/2019
   * Faz a busca  se o formulário for válido
   */
  public async buscar() {
    if (this.formBusca.valid) {
      const formValue: any = this.formBusca.value
      const params: any = {
        'from': formValue.aeroportoOrigem,
        'to': formValue.aeroportoDestino,
        'date': formValue.dataSaida.toISOString().substring(0, 10)
      }

      this.loading = true;
      try {
        this.voos = await this.vooService.getByDate(params);
        this.setDataTable();
      } catch (err) {
        alert(err.message);
      }
      this.loading = false;
    }
  }

  /**
   * @author Josiane Thaís
   * @since 03/2019
   * Prepara a lista de voos para serem exibidas no DataTable
   */
  private setDataTable() {
    const listaVoos: Array<IVoo> = [];

    // iteração do array de resposta da requisição
    for (const voo of this.voos) {
      // const voosEscalados: Array<IVooEscalado> = voo.voos;
      let valorTotal: number = 0;
      let tempoTotalVoo: number = 0;

      // iteção do array de voos escalados
      voo.voos.forEach(vooEscalado => {
        // somatório tempo total de voo
        tempoTotalVoo += this.calcTimeDiff(vooEscalado.saida, vooEscalado.chegada);
        // somatório valor total da viagem
        valorTotal += vooEscalado.valor;
      });

      // for (const vooEscalado of voosEscalados) {
      // }

      // adicionar na lista a ser carregada no DataTable
      listaVoos.push({
        'qtdVoos': voo.voos.length,
        'tempoTotalVooFormatado' : this.formatTotalTime(tempoTotalVoo),
        'valorTotalFormatado': 'R$ ' + valorTotal.toFixed(2).replace(".",","),
        'voosEscalados': voo.voos
      })
    }

    this.sourceVoos.load(listaVoos);
  }
  
  /**
   * @author Josiane Thaís 
   * @since 03/2019 
   * Calcula a diferença de minutos entre um horário e  outro
   */
  private calcTimeDiff(first: string, last: string): number {    
    return this.getMinutes(last) - this.getMinutes(first);
  }

  /**
   * @author Josiane Thaís
   * @since 03/2019
   * Retorna uma hora em minutos 
   */
  private getMinutes(hora: string) {
    const cols: Array<string> = hora.split(':');
    const totalMin: number = ( parseInt(cols[0], 10) * 60 ) + parseInt(cols[1], 10);
    return totalMin;
  }
  
  /**
   * @author Josiane Thaís
   * @since 03/2019
   * Formata os minutos para exibição no formato 'hh:mm'
   */
  private formatTotalTime(tempoTotalMin: number): string {
    const hours: number = Math.floor(tempoTotalMin / 60);
    const minutes: number = tempoTotalMin - (hours * 60);

    return ( hours ? hours : '00' ) + ':' + ( minutes ? minutes : '00');
  }
  
  /**
   * @author Josiane Thaís
   * @since 03/2019
   * Abrir modal para ver detalhes dos voos escalados 
   */
  public verVoos(event) {
    this.dialogService.open(DetalhesVoosComponent, {
      autoFocus: false,
      context: event
    });
  }

}
