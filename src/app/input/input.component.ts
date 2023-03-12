import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RAT } from '../interfaces/rat.interface';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, OnChanges {
  @Output() dadosInsercao = new EventEmitter<RAT>();
  @Input() carregando: boolean = true;

  selecao: FormGroup;
  dados: RAT = {};
  spinner: boolean = false;

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
    //this.servicos.ajustarMascara2('55588885');
  }

  ngOnChanges(alteracoes: SimpleChanges): void {
    console.log(alteracoes);
    if (
      alteracoes['carregando'].currentValue !==
        alteracoes['carregando'].previousValue &&
      alteracoes['carregando'].firstChange !== true
    ) {
      console.log(alteracoes);
      this.spinner = alteracoes['carregando'].currentValue;
    }
  }

  async capturaValores() {
    this.spinner = true;

    this.dados = {
      competencia: this.selecao.value.competencia,
      tipo: this.selecao.value.selecaoDagRat,
      valor: this.selecao.value.valor,
      ordem: this.selecao.value.ordem,
      observacao: this.selecao.value.observacao,
    };

    //console.log(this.dados);

    if (
      this.dados.competencia === '' ||
      this.dados.tipo === '' ||
      this.dados.valor === 0 ||
      this.dados.ordem === 0
    ) {
      this.spinner = false;
      alert('Existe algum campo vazio, verifique!');
    } else {
      this.dadosInsercao.emit(this.dados);
      this.spinner = false;
      alert('Dados Inseridos com sucesso.');
    }
  }

  verificaDados() {
    const dados = this.servicos.consultarParametros();
    if (dados.length === 0 || dados === 0) {
      alert('Primeiro cadastre os parâmetros para depois lançar as DAGs/RATs.');
    } else {
      console.log('Dados Carregados.');
    }
  }

  ajustarMascara() {
    let valorMascara = this.servicos.ajustarMascara(this.selecao.value.valor);
    this.selecao.controls['valor'].setValue(valorMascara);
  }

  capturaValorCarregando(habilita: boolean) {
    this.carregando = false;
    //this.spinner = this.carregando;
    //console.log('chegou aqui');
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
