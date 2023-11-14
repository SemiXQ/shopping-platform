import { Injectable } from '@angular/core';
import { UserLogin } from '../data/interfaces/userloginInterface';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../data/models/user';
import { LocalStorageService } from 'ngx-webstorage';
import { USER_URLS } from '../routes/route';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static readonly USER_KEY: string = "USER";

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

  getUserObservable(): Observable<User> {
    return this._userObservable;
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

