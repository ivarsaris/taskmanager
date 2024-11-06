import { NgClass, NgFor } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { User } from '../user.model';
import { users_list } from '../users.list';
import { TasksService } from '../../tasks/tasks.service';
import { UsersService } from '../users.service';
import { user_statuses } from '../user.info.list';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent {

  private usersService = inject(UsersService);

  avatar_images: Array<string> = ['https://avatar.iran.liara.run/public/39', 'https://avatar.iran.liara.run/public/40', 'https://avatar.iran.liara.run/public/41', 'https://avatar.iran.liara.run/public/42', 'https://avatar.iran.liara.run/public/43', 'https://avatar.iran.liara.run/public/44', 'https://avatar.iran.liara.run/public/45', 'https://avatar.iran.liara.run/public/46', 'https://avatar.iran.liara.run/public/47', 'https://avatar.iran.liara.run/public/48'];
  image_url: string = 'https://as2.ftcdn.net/v2/jpg/04/62/12/13/1000_F_462121328_LoZ2Pp4CNl0zM4iXttuiaD0CpbLYbyEk.jpg';
  selectedImageIndex: number | null = null;
  users_list = users_list;
  user_statuses = user_statuses;
  @ViewChild('userNameInput') userNameInput!: ElementRef;
  @ViewChild('userStatusInput') userStatusInput!: ElementRef;
  @ViewChild('userDepartmentInput') userDepartmentInput!: ElementRef;
  @ViewChild('userPositionInput') userPositionInput!: ElementRef;
  @ViewChild('userEmailInput') userEmailInput!: ElementRef;
  @ViewChild('userRoleInput') userRoleInput!: ElementRef;

  setNewUserAvatar(index: number) {
    this.selectedImageIndex = index;
  }

  createNewUser() {
    // get user with highest ID and add 1
    const userId = Math.max(...this.users_list.map(task => task.id)) + 1;
    const userName = this.userNameInput.nativeElement.value || '';
    const userStatus = this.userStatusInput.nativeElement.value;
    const userDepartment = this.userDepartmentInput.nativeElement.value || ''
    const userPosition = this.userPositionInput.nativeElement.value || '';
    const userEmail = this.userEmailInput.nativeElement.value || '';
    const userRole = this.userRoleInput.nativeElement.value || '';
    const userAvatar = this.selectedImageIndex !== null ? this.avatar_images[this.selectedImageIndex!] : this.image_url;

    const newUser: User = {
      id: userId,
      name: userName,
      avatar: userAvatar,
      status: userStatus || 'active',
      department: userDepartment,
      position: userPosition,
      email: userEmail,
      role: userRole
    }

    this.usersService.createNewUser(newUser);
  }
}
