import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modalmensaje',
  templateUrl: './modalmensaje.component.html',
  styleUrls: ['./modalmensaje.component.css']
})
export class ModalmensajeComponent implements OnInit {

  @Input() alias;
  @Input() nombrejugador;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

}
