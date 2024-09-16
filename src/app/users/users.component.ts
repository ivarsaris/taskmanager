import { Component } from '@angular/core';
import { users_list } from './users.list';
import { type User } from './user.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users_list = users_list;
}
