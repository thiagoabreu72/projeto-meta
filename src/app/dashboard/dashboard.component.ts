import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnChanges, OnInit {
  @Input() dadosInsercao: any = {};
  @Output() carregando = new EventEmitter<boolean>();
  dados: any;
  dadosStorage: any[] = [];
  percentual: number = 70;

  constructor(private http: HttpClient, private servicos: ServicosService) {}

  ngOnChanges(alteracoes: SimpleChanges): void {
    if (
      alteracoes['dadosInsercao'].currentValue !==
        alteracoes['dadosInsercao'].previousValue &&
      alteracoes['dadosInsercao'].firstChange !== true
    ) {
      let retorno: boolean = this.servicos.gravarDados(this.dadosInsercao);
      console.log(retorno);
      this.carregando.emit(retorno);
    }
  }

  ngOnInit() {
    const canvas = document.getElementById('myCanva') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [66, 34],
              backgroundColor: ['#6FED5C', '#FA7462'],
            },
          ],
        },
        options: {
          responsive: false,
          plugins: {
            title: { text: 'Conclusão da meta em %', display: true },
          },
        },
      });
    } else {
      alert('Não há valores para geração do gráfico.');
      // Tratar o caso em que ctx é nulo (por exemplo, mostrar uma mensagem de erro)
    }
  }

  // gravarDados() {
  //   let dadosLocais = [];
  //   let retorno = this.servicos.consultarDados() || [];

  //   for (let i = 0; i < retorno.length; i++) {
  //     //console.log(retorno[i]);
  //     dadosLocais.push(retorno[i]);
  //   }

  //   dadosLocais.push(this.dadosInsercao);
  //   localStorage.setItem('dados', JSON.stringify(dadosLocais));
  // }
}
