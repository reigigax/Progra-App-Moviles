import { Component, OnInit } from '@angular/core';
import { Navigation, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loadingVisible: boolean = false;
  warningVisible: boolean = false;
  ErrorCredenciales: boolean = true;

  errorStyle: string = 'msg-error';
  msgError: string = '';

  mdl_usuario: string = '';
  mdl_contrasena: string = '';

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

      console.log("Datos Recopilados - Login");
    } else {
      console.log("Sin datos por el Momentop... ;-;");
    }

    console.log(this.extras_usuario);
    console.log(this.extras_contrasena);
  }

  loginNavigation() {
    this.loadingVisible = true;

    let extras: NavigationExtras = {
      state: {
        "username": this.extras_nombreCompleto,
        "user": this.extras_usuario,
        "email":this.extras_correo,
        "pass": this.extras_contrasena,
      },
      replaceUrl:true
    }

    setTimeout(() => {
      if(this.mdl_usuario == this.extras_usuario && this.mdl_contrasena == this.extras_contrasena) {
        if(this.mdl_usuario != '' && this.mdl_contrasena != ''){
          this.router.navigate(['main-page'],extras);
        } else {
          this.msgError = 'Debe Rellenar los Campos para Continuar';
          this.errorStyle = 'msg-error';
          this.warningVisible = true;
          this.loadingVisible = false;

          console.log("Debe rellenar los campos para continuar");
        }
      } else {
        if(this.mdl_usuario == '' || this.mdl_contrasena == ''){
          this.msgError = 'Debe Rellenar los Campos para Continuar';
          this.errorStyle = 'msg-error';
          this.warningVisible = true;
          this.loadingVisible = false;

          console.log("Debe rellenar los campos para continuar");
        } else {
          this.msgError = 'Usuario o Contraseña Invalidos';
          this.warningVisible = true;
          this.loadingVisible = false;
          this.errorStyle = 'msg-errorCredentials';

          console.log("Usuario o Contraseña invalidos")
        }
      }

    }, 2000);

  }

  toRegisterNavigation() {
    this.loadingVisible = true;

    setTimeout(() => {
      let extras: NavigationExtras = {
        state: {
          "username": this.extras_nombreCompleto,
          "user": this.extras_usuario,
          "email":this.extras_correo,
          "pass": this.extras_contrasena,
        },
        replaceUrl:true
      }
      this.router.navigate(['register'],extras)

    }, 2000);
  }

}
