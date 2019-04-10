import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_VARIABLE } from '../app.constant';
import { ResLoginAccount } from 'app/main/auth/login/models/res-login.model';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  /**
   *
   */
  constructor(
    private _cookieService: CookieService,
    private _translateService: TranslateService,
  ) {

  }
  getAll(): object {
    const local = this._cookieService.getAll();
    return local;
  }
  getItem(key: string): string {
    let result = this._cookieService.get(key);
    return result ? result : null;
  }
  setItem(key: string, value: any, expireDate: Date = null): void {
    this._cookieService.set(key, value, expireDate);
  }
  removeItem(key: string): void {
    this._cookieService.delete(key);
  }
  clear(): void {
    this._cookieService.deleteAll();
  }

  logout(): void {
    this.clear();
    let currLanguage = this._translateService.currentLang;
    this.setItem('CURR_LANGUAGE', currLanguage);
  }
  getAccessToken(): string {
    return this.getItem(LOCAL_STORAGE_VARIABLE.access_token);
  }

  setAccessToken(accessToken: string, expireDate: Date): void {
    this.setItem(LOCAL_STORAGE_VARIABLE.access_token, accessToken, expireDate);
  }

  getPermissions(): string[] {
    return JSON.parse(this.getItem(LOCAL_STORAGE_VARIABLE.permissions));
  }

  setPermissions(permissions: string[], expireDate: Date): void {
    this.setItem(LOCAL_STORAGE_VARIABLE.permissions, JSON.stringify(permissions), expireDate);
  }

  getLogStatus(): string {
    return this.getItem(LOCAL_STORAGE_VARIABLE.is_logged_in);
  }

  setLogStatus(bool: boolean, expireDate: Date): void {
    this.setItem(LOCAL_STORAGE_VARIABLE.is_logged_in, bool, expireDate);
  }


  getUser(): ResLoginAccount {
    var item = this.getItem(LOCAL_STORAGE_VARIABLE.account)
    return JSON.parse(item);
  }

  retrieveObject(key: string): any {
    return JSON.parse(this.getItem(key));
  }

  storeObject(key: string, object: Object, expireDate: Date): void {
    return this.setItem(key, JSON.stringify(object), expireDate);
  }
}
