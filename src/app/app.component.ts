import { RAT } from './interfaces/rat.interface';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  dados: RAT = {};
  carregandoDados: boolean = false;

  // capturaDados(dados: any) {
  //   this.dados = dados;
  //   console.log('component');
  // }

  // capturaValorCarregando(habilita: boolean) {
  //   this.carregandoDados = habilita;
  // }
}
