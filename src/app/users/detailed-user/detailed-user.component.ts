import { Component, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { Department } from '../../departments/department.model';

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

  private departmentSubscription!: Subscription;
  currentUserDepartment: Department | undefined = undefined;

  ngOnInit() {
    this.userSubscription = this.usersService.currentUserToView$.subscribe(user => {
      this.currentUserToView = user;
    });

    this.departmentSubscription = this.usersService.currentUserToViewDepartment$.subscribe(department => {
      this.currentUserDepartment = department;
    });
  }

  setUserToEdit(id: number) {
    this.usersService.setUserToEdit(id);
  }
}
