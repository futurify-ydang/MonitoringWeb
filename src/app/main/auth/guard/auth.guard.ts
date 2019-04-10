import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, CanActivateChild, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from 'app/common/login.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
    constructor(
        private router: Router,
        private loginService: LoginService,
    ) {
    }


    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
      }
    
    canLoad(route: Route): boolean {
        const url = `/${route.path}`;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        // if (this.loginService.isLoggedIn()) {
        //     return true;
        // }

        this.loginService.redirectUrl = url;
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let active = false;
        if (this.loginService.isLoggedIn()) {
            // check if route is restricted by role
            if (route.data.roles && !this.loginService.hasPermission(route.data.roles)) {
                // role note authorized so redirect to home page
                this.router.navigate(['/my-profile/detail']);
                active = false;
            }

            // authorized so return true
            active = true;
        }
        else{
            // this.router.navigate(['/auth/login']);
            active = false;
        }      
        console.log(active);
        return false;
    }
}
