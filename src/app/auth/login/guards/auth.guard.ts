import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, UrlSegment, RouterStateSnapshot, Router, CanMatch, CanActivate } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {

    constructor(private authService: AuthService,private router: Router, ){ }

    private checkAuthStatus(): boolean | Observable<boolean> {
      let tokenJ: any = { "tokken": localStorage.getItem("token") }
        return this.authService.checkAuthentication(tokenJ)
          .pipe(
            tap( isAuthenticated => {
              if ( !isAuthenticated ) {
                this.router.navigate(['./auth/login'])
              }
            }),
          )
    
      }
  
  
      canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
        return this.checkAuthStatus();
      }
    
      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        return this.checkAuthStatus();
      }
}