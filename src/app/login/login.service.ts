import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, mergeMap, tap } from 'rxjs/operators';

import { AuthService } from '../shared/services/auth/auth.service';
import { LoginResponse } from './login.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private authService: AuthService,
  ) { }

  logar(email: string, senha: string): Observable<LoginResponse> {
    if (email === 'teste@gmail.com' && senha === '123') {
      return of({
        usuario: {
          nome: 'Teste',
          sobrenome: 'Testado',
          email: 'teste@gmail.com',
        },
        token: 'aD12h3123523543fgdfg',
      })
        .pipe(
          delay(2000),
          tap(response => {
            this.authService.setUsuario(response.usuario);
            this.authService.setToken(response.token);
          })
        );
    }

    return timer(3000).pipe(
      mergeMap(() => throwError('Usuário ou senha incorretos.'))
    );
  }
}
