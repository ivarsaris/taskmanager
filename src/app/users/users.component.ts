import { Component, inject } from '@angular/core';
import { users_list } from './users.list';
import { type User } from './user.model';
import { NgFor } from '@angular/common';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersService } from './users.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DetailedUserComponent } from './detailed-user/detailed-user.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, NewUserComponent, EditUserComponent, DetailedUserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  private usersService = inject(UsersService);
  private userListSubscription!: Subscription;

  users_list: User[] | undefined = undefined;

  ngOnInit() {
    this.userListSubscription = this.usersService.usersList$.subscribe(usersList => {
      this.users_list = usersList;
    });
  }

  setUserToView(id: number) {
    this.usersService.setUserToView(id);
  }
}
