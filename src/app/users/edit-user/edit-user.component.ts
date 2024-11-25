import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NgFor, NgClass, NgIf, CommonModule } from '@angular/common';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { Observable, Subscription } from 'rxjs';
import { user_statuses } from '../user.info.list';
import { user_roles } from '../user.info.list';
import { Department } from '../../departments/department.model';
import { DepartmentsService } from '../../departments/departments.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {

  private usersService = inject(UsersService);
  private userSubscription!: Subscription;
  currentUserToEdit: User | undefined = undefined;
  
  avatar_images: Array<string> = ['https://avatar.iran.liara.run/public/39', 'https://avatar.iran.liara.run/public/40', 'https://avatar.iran.liara.run/public/41', 'https://avatar.iran.liara.run/public/42', 'https://avatar.iran.liara.run/public/43', 'https://avatar.iran.liara.run/public/44', 'https://avatar.iran.liara.run/public/45', 'https://avatar.iran.liara.run/public/46', 'https://avatar.iran.liara.run/public/47', 'https://avatar.iran.liara.run/public/48'];
  @ViewChild('userNameInput') userNameInput!: ElementRef;
  @ViewChild('userDepartmentInput') userDepartmentInput!: ElementRef;
  @ViewChild('userPositionInput') userPositionInput!: ElementRef;
  @ViewChild('userStatusInput') userStatusInput!: ElementRef;
  @ViewChild('userEmailInput') userEmailInput!: ElementRef;
  @ViewChild('userRoleInput') userRoleInput!: ElementRef;
  userAvatar: string | undefined = this.currentUserToEdit?.avatar;
  user_statuses = user_statuses;
  user_roles = user_roles;
  
  private departmentService = inject(DepartmentsService);
  private departmentSubscription!: Subscription;
  departmentList: Department[] | undefined = undefined;

  ngOnInit() {
    this.userSubscription = this.usersService.currentUserToEdit$.subscribe(user => {
      this.currentUserToEdit = user;
    });
    this.departmentSubscription = this.departmentService.departmentList$.subscribe(departmentList => {
      this.departmentList = departmentList;
    });
  }

  setUserAvatar(avatur_url: string) {
    this.userAvatar = avatur_url;
  }

  editUser() {
    const name = this.userNameInput.nativeElement.value || '';
    const department = Number(this.userDepartmentInput.nativeElement.value) || 0;
    const position = this.userPositionInput.nativeElement.value || '';
    const avatar = this.userAvatar !== undefined ? this.userAvatar : this.currentUserToEdit!.avatar;
    const status = this.userStatusInput.nativeElement.value || '';
    const email = this.userEmailInput.nativeElement.value || '';
    const role = this.userRoleInput.nativeElement.value || '';

    const user: User = {
      id: this.currentUserToEdit!.id,
      name: name,
      avatar: avatar,
      department: department,
      position: position,
      status: status,
      email: email,
      role: role
    }

    this.usersService.editOpenUser(user);
  }
}
