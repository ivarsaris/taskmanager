import { NgIf } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { sharedDataService } from '../sharedData.service';

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

  private sharedDataService = inject(sharedDataService);
  private loggedInUserSubscription!: Subscription;
  logged_in_user: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.loggedInUserSubscription = this.sharedDataService.loggedInUser$.subscribe(loggedInUser => {
      this.logged_in_user = loggedInUser;
    });
  }

  loginUser() {
    this.sharedDataService.loginUser();
  }
}
