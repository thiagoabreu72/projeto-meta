import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RAT } from '../interfaces/rat.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Output() dadosInsercao = new EventEmitter<RAT>();
  selecao: FormGroup;
  dados: RAT = {};

  constructor() {
    this.selecao = new FormGroup({
      competencia: new FormControl({ value: '', disabled: false }),
      selecaoDagRat: new FormControl({ value: '', disabled: false }),
      valor: new FormControl({ value: '', disabled: false }),
      ordem: new FormControl({ value: '', disabled: false }),
      observacao: new FormControl({ value: '', disabled: false })
    })
  }

  ngOnInit(): void {
  }

  capturaValores() {
    this.dados = {
      competencia: this.selecao.value.competencia,
      tipo: this.selecao.value.selecaoDagRat,
      valor: this.selecao.value.valor,
      ordem: this.selecao.value.ordem,
      observacao: this.selecao.value.observacao
    }

    if ((this.dados.competencia === '') ||
      (this.dados.tipo === '') ||
      (this.dados.valor === 0) ||
      (this.dados.ordem === 0)) {
      alert('Existe algum campo vazio, verifique!')
    } else {

      this.dadosInsercao.emit(this.dados);

    }
  }

}

