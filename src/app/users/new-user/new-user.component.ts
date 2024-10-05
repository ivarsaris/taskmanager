import { NgClass, NgFor } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../user.model';
import { users_list } from '../users.list';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent {
  avatar_images: Array<string> = ['https://avatar.iran.liara.run/public/39', 'https://avatar.iran.liara.run/public/40', 'https://avatar.iran.liara.run/public/41', 'https://avatar.iran.liara.run/public/42', 'https://avatar.iran.liara.run/public/43', 'https://avatar.iran.liara.run/public/44', 'https://avatar.iran.liara.run/public/45', 'https://avatar.iran.liara.run/public/46', 'https://avatar.iran.liara.run/public/47', 'https://avatar.iran.liara.run/public/48'];
  image_url: string = 'https://as2.ftcdn.net/v2/jpg/04/62/12/13/1000_F_462121328_LoZ2Pp4CNl0zM4iXttuiaD0CpbLYbyEk.jpg';
  selectedImageIndex: number | null = null;
  users_list = users_list;
  @ViewChild('userNameInput') userNameInput!: ElementRef;

  setNewUserAvatar(index: number) {
    this.selectedImageIndex = index;
  }

  createNewUser() {
    // get user with highest ID and add 1
    const userId = Math.max(...this.users_list.map(task => task.id)) + 1;
    const userName = this.userNameInput.nativeElement.value;
    const userAvatar = this.selectedImageIndex !== null ? this.avatar_images[this.selectedImageIndex!] : this.image_url;

    const newUser: User = {
      id: userId,
      name: userName,
      avatar: userAvatar
    }

    this.users_list.push(newUser);
  }
}
