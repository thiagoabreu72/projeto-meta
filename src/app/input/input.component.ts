import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RAT } from '../interfaces/rat.interface';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Output() dadosInsercao = new EventEmitter<RAT>();
  selecao: FormGroup;
  dados: RAT = {};

  constructor(public servicos: ServicosService) {
    this.selecao = new FormGroup({
      competencia: new FormControl({ value: '', disabled: false }),
      selecaoDagRat: new FormControl({ value: 'RAT', disabled: false }),
      valor: new FormControl({ value: '', disabled: false }),
      ordem: new FormControl({ value: '', disabled: false }),
      observacao: new FormControl({ value: '', disabled: false }),
    });
  }

  ngOnInit(): void {
    this.verificaDados();
    this.servicos.ajustarMascara(5000);
  }

  async capturaValores() {
    this.dados = {
      competencia: this.selecao.value.competencia,
      tipo: this.selecao.value.selecaoDagRat,
      valor: this.selecao.value.valor,
      ordem: this.selecao.value.ordem,
      observacao: this.selecao.value.observacao,
    };

    if (
      this.dados.competencia === '' ||
      this.dados.tipo === '' ||
      this.dados.valor === 0 ||
      this.dados.ordem === 0
    ) {
      alert('Existe algum campo vazio, verifique!');
    } else {
      this.dadosInsercao.emit(this.dados);
    }
  }

  verificaDados() {
    const dados = this.servicos.consultarParametros();
    if (dados.length === 0) {
      alert('Primeiro cadastre os parâmetros para depois lançar as DAGs/RATs.');
    } else {
      console.log(dados);
    }
  }

  teste() {
    let valorMascara = this.servicos.ajustarMascara(this.selecao.value.valor);
    alert(valorMascara);
    this.selecao.controls['valor'].setValue(valorMascara);
  }

  // teste2() {
  //   let valorMonetario = this.servicos.ajustarMascara(this.selecao.value.valor); // valor com máscara, ex: "R$ 265,00"
  //   console.log(valorMonetario);
  //   let valorNumerico = parseFloat(
  //     valorMonetario.replace(/[^\d,.-]/g, '').replace(',', '.')
  //   ); // valor numérico, ex: 265.00
  //   this.selecao.controls['valor'].setValue(valorNumerico);
  // }
}
