import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  invalidLoginCredentials: boolean = false;
  @ViewChild('userEmailInput') userEmailInput !: ElementRef;
  @ViewChild('userPasswordInput') userPasswordInput !: ElementRef;

  constructor(private router: Router) { }

  loginUser() {
    if (this.userEmailInput.nativeElement.value === 'manager@taskmanager.com' && this.userPasswordInput.nativeElement.value == 'manager') {
      localStorage.setItem('taskmanager_rights', 'manager');
    } else if (this.userEmailInput.nativeElement.value === 'teamleader@taskmanager.com' && this.userPasswordInput.nativeElement.value == 'teamleader') {
      localStorage.setItem('taskmanager_rights', 'teamleader');
    } else if (this.userEmailInput.nativeElement.value === 'employee@taskmanager.com' && this.userPasswordInput.nativeElement.value == 'employee') {
      localStorage.setItem('taskmanager_rights', 'employee');
    } else {
      this.invalidLoginCredentials = true;
      return;
    }
    this.router.navigate(['tasks']);
  }
}
