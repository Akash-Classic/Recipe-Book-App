import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGaurd implements CanActivate{
    constructor(private authService: AuthService,
               private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(take(1), map(user => {
           const isAuth = !user ? false : true;
           if(isAuth){
               return true;
           }
           return this.router.createUrlTree(['/auth'])
        }));
    }
}