import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnChanges, OnInit {
  @Input() dadosInsercao: any = {};
  dados: any;
  dadosStorage: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnChanges(alteracoes: SimpleChanges): void {
    if (
      alteracoes['dadosInsercao'].currentValue !==
        alteracoes['dadosInsercao'].previousValue &&
      alteracoes['dadosInsercao'].firstChange !== true
    ) {
      this.gravarDados();
    }
  }

  ngOnInit() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
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
            title: { text: 'Meta do Mês em %', display: true },
          },
        },
      });
    } else {
      alert('Não há valores para geração do gráfico.');
      // Tratar o caso em que ctx é nulo (por exemplo, mostrar uma mensagem de erro)
    }
  }

  lerDadosJson() {
    this.http.get('./assets/dados.json').subscribe((dados) => {
      this.dados = dados;
      console.log(this.dados);
    });
  }

  gravarDados() {
    let dadosLocais = []; /*[{
      competencia: "01/02/2023",
      tipo: "DAG",
      ordem: 123456,
      valor: 100.0,
      observacao: "testando"
    }, {
      competencia: "01/02/2023",
      tipo: "DAG",
      ordem: 654321,
      valor: 100.0,
      observacao: "testando123456"
    }]*/

    let retorno = this.consultarDados() || [];

    for (let i = 0; i < retorno.length; i++) {
      console.log(retorno[i]);
      dadosLocais.push(retorno[i]);
    }

    dadosLocais.push(this.dadosInsercao);
    localStorage.setItem('dados', JSON.stringify(dadosLocais));
  }

  consultarDados() {
    //console.log(JSON.parse(localStorage.getItem('dados') || ''))
    let objeto = JSON.parse(localStorage.getItem('dados') || '0');
    return objeto;
  }
}
