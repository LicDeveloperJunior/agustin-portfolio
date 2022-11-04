import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faTrashCan, faPlus, faPencil } from '@fortawesome/free-solid-svg-icons';
import { ITrabajo } from 'src/app/modelos/ITrabajo';
import { TrabajoService } from 'src/app/servicios/api/trabajo.service';
import { LoginService } from 'src/app/servicios/login/login.service';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.less']
})
export class TrabajosComponent implements OnInit {
  public trabajos!: ITrabajo[];
  public editTrabajo?: ITrabajo;
  agregarIcon = faPlus;
  editarIcon = faPencil;
  eliminarIcon = faTrashCan;

  constructor(private trabajoService: TrabajoService,
    private loginService :LoginService) { }

  ngOnInit(): void {
    this.obtenerTrabajos();
  }

  public obtenerTrabajos() {
    this.trabajoService.obtenerTrabajos().subscribe({
      next: (response: ITrabajo[]) => {
        this.trabajos = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public agregarTrabajo(formHab: NgForm) {
    this.trabajoService.agregarTrabajo(formHab.value).subscribe({
      next: () => {
        formHab.reset();
        this.obtenerTrabajos();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public eliminarTrabajo(id: number) {
    this.trabajoService.eliminarTrabajo(id).subscribe({
      next: () => {
        this.obtenerTrabajos();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public editarTrabajo(formHab: NgForm) {
    this.trabajoService.actualizarTrabajo(formHab.value).subscribe({
      next: () => {
        formHab.reset();
        this.obtenerTrabajos();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  estaLogeado(): boolean {
    return this.loginService.estaLogeado();
  }
}
