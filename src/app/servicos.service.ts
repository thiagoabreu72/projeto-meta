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

    return false;
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
  ajustarMascara2(numero: string) {
    let anu: number;

    console.log(numero);
    anu = Number(numero);
    console.log(anu.toFixed(2));

    numero = anu.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    /*valorConvertido = novoValor.replace(/[^\d,.-]/g, '');
    teste = valorConvertido.parseFloat();*/
    console.log(anu);

    return numero;
  }

  // Ajusta a máscara de valores
  ajustarMascara(valor: string) {
    console.log(valor);
    if (valor == '0' || valor == '00' || valor == '0,00' || valor == '0,000') {
      valor = '0,00';
    } else {
      switch (valor.length) {
        case 0:
          '0,00';
          break;
        case 1:
          valor = '0,0' + valor;
          break;
        case 2:
          valor = '0,' + valor;
          break;
        case 3:
          {
            if (valor.indexOf(',') === 1 && valor.indexOf('0') === 0) {
              // console.log('entrou 1');
              valor = '0,0' + valor.substring(2);
            } else if (valor.indexOf(',') === 1) {
              let novo = valor.split(',');
              valor = '0,' + novo[0] + novo[1];
              // console.log('entrou 2');
            } else if (valor.indexOf(',') === 0) {
              // console.log('entrou 3');
              valor = '0' + valor.substring(0, 2);
            }
          }
          break;
        default:
          {
            if (valor.indexOf(',')) {
              let esquerda = valor.split(',');
              if (
                esquerda[0].substring(0, 1) == '0' &&
                esquerda[0].substring(1, 1) !== '0'
              )
                valor = esquerda[0].replace('0', '') + esquerda[1];
              else {
                valor = esquerda[0] + esquerda[1];
              }
            }
            let primeiraParte = valor;
            let segundaParte = valor;

            primeiraParte = primeiraParte.substring(0, valor.length - 2);
            segundaParte = segundaParte.substring(valor.length - 2);
            valor = primeiraParte + ',' + segundaParte;
          }
          break;
      }
    }

    return valor;
  }
}
