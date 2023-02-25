import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicosService {
  constructor() {}

  gravarDados(dadosInsercao: any) {
    let dadosLocais = [];
    let retorno = this.consultarDados() || [];

    for (let i = 0; i < retorno.length; i++) {
      dadosLocais.push(retorno[i]);
    }

    dadosLocais.push(dadosInsercao);
    localStorage.setItem('dados', JSON.stringify(dadosLocais));
  }

  consultarParametros() {
    let dados = JSON.parse(localStorage.getItem('parametros') || '0');
    return dados;
  }

  consultarDados() {
    let objeto = JSON.parse(localStorage.getItem('dados') || '0');
    return objeto;
  }

  // ajusta a máscara dos valores
  ajustarMascara(numero: number) {
    let novoValor: string;
    let valorConvertido: any;
    let teste: number;

    novoValor = numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    valorConvertido = novoValor.replace(/[^\d,.-]/g, '');
    teste = valorConvertido.parseFloat();
    console.log(valorConvertido);

    return valorConvertido;
  }
}
