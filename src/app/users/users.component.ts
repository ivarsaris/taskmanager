import { Component, inject } from '@angular/core';
import { users_list } from './users.list';
import { type User } from './user.model';
import { NgFor } from '@angular/common';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, NewUserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  private usersService = inject(UsersService);

  users_list = this.usersService.users_list;
}
