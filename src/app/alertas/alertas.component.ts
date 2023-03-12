import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.scss'],
})
export class AlertasComponent implements OnInit {
  @Input() tipo: string = 'alerta';
  @Input() timeout: number = 4000;
  closed: boolean = false;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.closed = true;
    }, this.timeout);
  }
}
