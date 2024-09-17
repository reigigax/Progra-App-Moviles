import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  loadingVisible: boolean = false;
  warningVisible: boolean = false;

  errorStyle: string = 'msg-errorCredentials';
  msgError: string = '';

  mdl_nombreCompleto: string = '';
  mdl_usuario: string = '';
  mdl_correo: string = '';
  mdl_nueva_contrasena: string = '';
  mdl_validacion_contrasena: string = '';

  extras_nombreCompleto: string = '';
  extras_usuario: string = '';
  extras_correo: string = '';
  extras_contrasena: string = '';
  
  constructor(private router: Router) { }

  ngOnInit() {
    let extras = this.router.getCurrentNavigation()?.extras;

    if(extras?.state) {
     this.extras_nombreCompleto = extras.state["username"];
     this.extras_usuario = extras.state["user"];
     this.extras_correo = extras.state["email"];
     this.extras_contrasena = extras.state["pass"];

     this.mdl_nombreCompleto = this.extras_nombreCompleto;
     this.mdl_usuario = this.extras_usuario;
     this.mdl_correo = this.extras_correo;

     console.log("Datos Recopilados - Cambio de Clave")
    } else {
      console.log("No hay datos por el momentop... ;-;")
    }
  }

  cambioClaveNavigation() {
    this.loadingVisible = true;

    let extras: NavigationExtras = {
      state: {
        "username": this.extras_nombreCompleto,
        "user": this.extras_usuario,
        "email": this.extras_correo,
        "pass": this.mdl_nueva_contrasena,
      },
      replaceUrl:true
    }

    if(this.mdl_nueva_contrasena == this.mdl_validacion_contrasena) {
      if(this.mdl_nueva_contrasena != '' && this.mdl_validacion_contrasena != '') {
        this.msgError = 'Cambio de Clave relizado Exitosamente'
        this.errorStyle = 'contrasenaCambiada';
        this.warningVisible = true;

        console.log("Cambio de Clave relizado exitosamente");

        setTimeout(() => {
          this.router.navigate(['main-page'],extras)
        }, 1000);
      }
    } else {
      if(this.mdl_nueva_contrasena != this.mdl_validacion_contrasena) {
        setTimeout(() => {
          this.msgError = 'Las Contraseñas No Coinciden ._.';
          this.errorStyle = 'msg-errorCredentials';
          this.warningVisible = true;
          this.loadingVisible = false;

        }, 1000);

        console.log("Las contraseñas no coinciden ._.");
      }

      if(this.mdl_nueva_contrasena == '' && this.mdl_validacion_contrasena != '') {
        setTimeout(() => {
          this.msgError = 'Debe Rellenar el Campo "Nueva Contraseña" para Continuar';
          this.errorStyle = 'msg-errorCredentials';
          this.warningVisible = true;
          this.loadingVisible = false;
  
        }, 1000);

        console.log('Debe Rellenar el Campo "Nueva Contraseña" para Continuar');
      }
      if(this.mdl_validacion_contrasena == '' && this.mdl_nueva_contrasena != '') {
        
        setTimeout(() => {
          this.msgError = 'Debe Rellenar el Campo "Validar Contraseña" para Continuar';
          this.errorStyle = 'msg-errorCredentials';
          this.warningVisible = true;
          this.loadingVisible = false;
        
        }, 1000);

        console.log('Debe Rellenar el Campo "Validar Contraseña" para Continuar');
      }
    }
  }

  toMainPageNavigation() {
    this.loadingVisible = true;

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
      this.router.navigate(['main-page'],extras);
    }, 1000);

  }

}
