import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnChanges {

  @Input() dadosInsercao: any = {};
  dados: any;
  dadosStorage: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnChanges(alteracoes: SimpleChanges): void {
    if ((alteracoes['dadosInsercao'].currentValue !== alteracoes['dadosInsercao'].previousValue)
      && alteracoes['dadosInsercao'].firstChange !== true) {

      this.gravarDados();
    }
  }

  lerDadosJson() {
    this.http.get('./assets/dados.json').subscribe(dados => {
      this.dados = dados;
      console.log(this.dados);
    })
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

      console.log(retorno[i])
      dadosLocais.push(retorno[i]);
    }

    dadosLocais.push(this.dadosInsercao);
    localStorage.setItem('dados', JSON.stringify(dadosLocais));

  }

  consultarDados() {
    //console.log(JSON.parse(localStorage.getItem('dados') || ''))
    let objeto = JSON.parse(localStorage.getItem('dados') || '0')
    return objeto;
  }

}
