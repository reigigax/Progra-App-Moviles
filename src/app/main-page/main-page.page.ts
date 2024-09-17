import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {

  isModalOpen = false;
  msgVisible: boolean = false;
  loadingPage: boolean = false;

  msgBienvenida: string = 'Bienvenido de Vuelta';

  extras_nombreCompleto: string = '';
  extras_usuario: string = '';
  extras_correo: string = '';
  extras_contrasena: string = '';

  constructor(private router: Router) { }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
    this.msgVisible = true;

    let extras = this.router.getCurrentNavigation()?.extras;

    if(extras?.state) {
      this.extras_nombreCompleto = extras.state["username"];
      this.extras_usuario = extras.state["user"];
      this.extras_correo = extras.state["email"];
      this.extras_contrasena = extras.state["pass"];

      console.log("Datos Recopilados - Pagina Principal");
    } else {
      console.log("Sin datos por el Momentop... ;-;");
    }

    setTimeout(() => {
      this.msgVisible = false;
    }, 5000);

  }

  cambiarClaveNavigation() {
    this.loadingPage = true;

    let extras: NavigationExtras = {
      state: {
        "username": this.extras_nombreCompleto,
        "user": this.extras_usuario,
        "email": this.extras_correo,
        "pass": this.extras_contrasena,
      },
      replaceUrl:true
    }
    setTimeout(() => {
      this.router.navigate(['change-password'],extras)
    }, 1000);
}

  cerrarSesionNavigation() {
    this.loadingPage = true;

    let extras: NavigationExtras = {
      state: {
        "username": this.extras_nombreCompleto,
        "user": this.extras_usuario,
        "email": this.extras_correo,
        "pass": this.extras_contrasena,
      },
      replaceUrl:true
    }

    setTimeout(() => {
      this.router.navigate(['login'],extras)
    }, 2000);
  }

}
