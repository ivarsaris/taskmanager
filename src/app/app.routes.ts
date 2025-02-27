import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';
import { DepartmentsComponent } from './departments/departments.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'tasks',
        component: TasksComponent,
    },
    {
        path: 'users',
        component: UsersComponent,
    },
    {
        path: 'departments',
        component: DepartmentsComponent,
    }
];
