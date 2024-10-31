import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
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
  userAvatar: string | undefined = this.currentUserToEdit?.avatar;

  ngOnInit() {
    this.userSubscription = this.usersService.currentUserToEdit$.subscribe(user => {
      this.currentUserToEdit = user;
    })
    console.log(this.userAvatar);
  }

  setUserAvatar(avatur_url: string) {
    this.userAvatar = avatur_url;
  }

  editUser() {
    const department = this.userDepartmentInput.nativeElement.value || '';
    const position = this.userPositionInput.nativeElement.value || '';
    const avatar = this.userAvatar !== undefined ? this.userAvatar : this.currentUserToEdit!.avatar;

    const user: User = {
      id: this.currentUserToEdit!.id,
      name: this.userNameInput.nativeElement.value,
      avatar: avatar,
      department: department,
      position: position,
      status: 'active'
    }

    this.usersService.editOpenUser(user);
  }
}
