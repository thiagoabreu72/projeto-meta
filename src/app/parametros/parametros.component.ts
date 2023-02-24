import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Parametros } from '../interfaces/parametros.interface';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.scss'],
})
export class ParametrosComponent implements OnInit {
  selecao: FormGroup;
  parametros: Parametros = {};

  constructor() {
    this.selecao = new FormGroup({
      dataInicial: new FormControl({ value: '', disabled: false }),
      dataFinal: new FormControl({ value: '', disabled: false }),
      valor: new FormControl({ value: '', disabled: false }),
      percentual: new FormControl({ value: 0, disabled: false }),
    });
  }

  ngOnInit(): void {}

  capturaValores() {
    let dados = {
      dataInicial: this.selecao.value.dataInicial,
      dataFinal: this.selecao.value.dataFinal,
      valor: this.selecao.value.valor,
      percentual: this.selecao.value.percentual,
    };

    this.parametros = dados;
    this.gravarDados(dados);
  }

  gravarDados(dados: object) {
    let dadosLocais = [];
    dadosLocais.push(dados);
    localStorage.setItem('parametros', JSON.stringify(dadosLocais));
  }

  consultarDados() {
    //console.log(JSON.parse(localStorage.getItem('dados') || ''))
    let objeto = JSON.parse(localStorage.getItem('dados') || '0');
    return objeto;
  }
}
