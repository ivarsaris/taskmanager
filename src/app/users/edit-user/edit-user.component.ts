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
  selectedImageIndex: number | null = null;
  @ViewChild('userNameInput') userNameInput!: ElementRef;

  ngOnInit() {
    this.userSubscription = this.usersService.currentUserToEdit$.subscribe(user => {
      this.currentUserToEdit = user;
    })
  }

  setUserAvatar(index: number) {
    this.selectedImageIndex = index;
  }

  /**
   * TO DO:
   * make avatar selectable, including current avatar
   */
  editUser() {
    const user: User = {
      id: this.currentUserToEdit!.id,
      name: this.userNameInput.nativeElement.value,
      avatar: this.currentUserToEdit!.avatar
    }

    this.usersService.editOpenUser(user);
  }
}
