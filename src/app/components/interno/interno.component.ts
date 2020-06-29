import { Component, OnInit } from '@angular/core';
import { InternoService } from 'src/app/services/interno.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-interno',
  templateUrl: './interno.component.html',
  styleUrls: ['./interno.component.css']
})
export class InternoComponent implements OnInit {
  showBuscarButton: boolean;
  constructor(private internoService : InternoService) { }
  curreninterno: any;
  ngOnInit(): void {
    this.showBuscarButton = true;
    this.curreninterno = {};
    this.curreninterno.runInterno = '';
    this.curreninterno.apellidosInterno = '';
    this.curreninterno.nombresInterno = '';

  }

    buscar() {
    const validResult = this.internoService.isValid(this.curreninterno);

    if (!validResult.ok) {
      console.error(`Hey, there is an error: ${validResult.message}`);
      return;
    }

    this.internoService.buscarRun(this.curreninterno.runInterno);
  }

}
