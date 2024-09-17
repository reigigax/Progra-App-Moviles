import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  warningVisibleRegistro: boolean = false;
  loadingPage: boolean = false;

  msgStyle: string = 'msg-errorCredentials';
  errorMsg: string = '';

  extras_nombreCompleto: string = '';
  extras_usuario: string = '';
  extras_correo: string = '';
  extras_contrasena: string = '';

  mdl_nombreCompleto: string = '';
  mdl_usuario: string = '';
  mdl_correo: string = '';
  mdl_contrasena: string = '';

  constructor(private router:Router) { }

  ngOnInit() {
    let extras = this.router.getCurrentNavigation()?.extras;

    if(extras?.state) {
      this.extras_nombreCompleto = extras.state["username"];
      this.extras_usuario = extras.state["user"];
      this.extras_correo = extras.state["email"];
      this.extras_contrasena = extras.state["pass"];
      console.log("Datos Recopilados - Register");
    } else {
      console.log("Sin datos por el momentop... ;-;");
    }
  }

  registerNavigation() {
    let extras: NavigationExtras = {
      state: {
        "username": this.mdl_nombreCompleto,
        "email":this.mdl_correo,
        "user": this.mdl_usuario,
        "pass": this.mdl_contrasena,
      },
      replaceUrl:true
    }

    if(this.mdl_usuario == '' || this.mdl_contrasena =='' || this.mdl_nombreCompleto == '' || this.mdl_correo == ''){
      this.errorMsg = 'Debe Rellenar los Campos para Continuar';
      this.msgStyle = 'msg-errorCredentials';
      this.warningVisibleRegistro = true;

      console.log("Debe Rellenar los Campos para Continuar")
    } else {
      this.errorMsg = 'Cuenta Creada Exitosamente';
      this.msgStyle = 'cuentaCreada';
      this.warningVisibleRegistro = true;
      this.loadingPage = true;
      
      setTimeout(() => {
        console.log("Cuenta Creada Exitosamente")
      
        this.router.navigate(['login'], extras)
      }, 2000);

    }
  }

  backToLoginNavigation() {
    let extras: NavigationExtras = {
      state: {
        "username": this.extras_nombreCompleto,
        "email":this.extras_correo,
        "user": this.extras_usuario,
        "pass": this.extras_contrasena,
      },
      replaceUrl:true
    }

    this.router.navigate(['login'],extras)
  }
}
