import { Component, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-detailed-user',
  standalone: true,
  imports: [NgIf],
  templateUrl: './detailed-user.component.html',
  styleUrl: './detailed-user.component.scss'
})
export class DetailedUserComponent {

  private usersService = inject(UsersService);
  private userSubscription!: Subscription;
  currentUserToView: User | undefined = undefined;

  ngOnInit() {
    this.userSubscription = this.usersService.currentUserToView$.subscribe(user => {
      this.currentUserToView = user;
    });
  }
}
