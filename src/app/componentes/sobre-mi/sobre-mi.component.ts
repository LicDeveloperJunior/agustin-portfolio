import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/modelos/IUsuario';
import { UsuarioService } from 'src/app/servicios/api/usuario.service';
import { faPencil, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { IHabilidad } from 'src/app/modelos/IHabilidad';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.less']
})
export class SobreMiComponent implements OnInit {
  edit = faPencil;
  remove = faTrashCan;
  add = faPlus;

  public usuario?: IUsuario;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  public obtenerUsuario() {
    this.usuarioService.obtenerUsuario().subscribe({
      next: (response: IUsuario | undefined) => {
        this.usuario = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    })
  }

  public calcularEdad(fechaNac: string) {
    const hoy: Date = new Date();
    const fechaNacimiento: Date = new Date(fechaNac);
    let edad: number = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes: number = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    return edad;
  }
}
