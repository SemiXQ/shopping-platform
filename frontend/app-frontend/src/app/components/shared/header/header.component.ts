import { Component } from '@angular/core';
import { User } from 'src/app/data/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  user!: User;
  constructor(private _userService: UserService) {
    this._userService.getUserObservable().subscribe(
      (user: User) => this.user = user
    );
  }

  logout() {
    this._userService.logout();
  }
}
