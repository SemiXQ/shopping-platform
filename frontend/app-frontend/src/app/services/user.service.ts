import { Injectable } from '@angular/core';
import { UserLogin } from '../data/interfaces/userloginInterface';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../data/models/user';
import { LocalStorageService } from 'ngx-webstorage';
import { USER_URLS } from '../routes/route';
import { tap } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { SECRECT_KEY } from '../env/constants';
// import * as bcrypt from 'bcrypt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static readonly USER_KEY: string = "USER";
  // This key is used to avoid plaintext of password, not for auth
  static readonly ENCRYPT_KEY: string = SECRECT_KEY;

  private _userObservable: Observable<User>;
  private _userSubject = new BehaviorSubject<User>(this._getUserFromSessionStorage());

  constructor(private http: HttpClient, 
              private toastService: ToastrService,
              private sessionStorage: LocalStorageService) { 
    this._userObservable = this._userSubject.asObservable();
  }

  login(loginInfo: UserLogin): Observable<User> {
    return this.http.post<User>(USER_URLS.userLogin, loginInfo).pipe(
      tap({
        next: (userData: User) => {
          const fetchedUser = userData;
          this._setUserToSessionStorage(fetchedUser);
          this._userSubject.next(fetchedUser);
          this.toastService.success(
            'Welcome ' + userData.name + "!"
          );
        },
        error: (error) => {
          this.toastService.error(error, "Failed to login.");
        }
      })
    );
  }

  // The encrption (not salted hash) used here is to avoid plaintext of password
  // which is not the one used to verify user auth from DB
  encrytPwd(pwd: string | undefined): string {
    const saltRound: number = 10;
    if (pwd !== undefined) {
      const encrypted =  CryptoJS.AES.encrypt(pwd, UserService.ENCRYPT_KEY).toString();
      return encrypted;
    } else {
      return "";
    }
  }

  private _getUserFromSessionStorage(): User {
    const userJson = this.sessionStorage.retrieve(UserService.USER_KEY);
    if (userJson === undefined || userJson === null) {
      return new User();
    } else {
      return JSON.parse(userJson) as User;
    }
  }

  private _setUserToSessionStorage(user: User) {
    this.sessionStorage.store(UserService.USER_KEY, JSON.stringify(user));
  }
}

