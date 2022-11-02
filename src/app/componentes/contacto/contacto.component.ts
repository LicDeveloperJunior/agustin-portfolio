import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faMobileScreenButton, faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { IUsuario } from 'src/app/modelos/IUsuario';
import { UsuarioService } from 'src/app/servicios/api/usuario.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.less']
})
export class ContactoComponent implements OnInit {
  usuario?:IUsuario;
  telef = faMobileScreenButton;
  lugar = faLocationDot;
  email = faEnvelope;
  constructor(private usuarioService :UsuarioService) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  public obtenerUsuario() {
    this.usuarioService.obtenerUsuario().subscribe({
      next:(response :IUsuario) => {
        this.usuario = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

}
