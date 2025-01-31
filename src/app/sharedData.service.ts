import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Department } from "./departments/department.model";
import { department_list } from "./departments/departments.list";
import { User } from "./users/user.model";
import { users_list } from "./users/users.list";

@Injectable({ providedIn: 'root' })

export class sharedDataService {
    department_list = department_list;
    private departmentListSubject = new BehaviorSubject<Department[]>(department_list);
    departmentList$ = this.departmentListSubject.asObservable();

    users_list = users_list;
    private usersListSubject = new BehaviorSubject<User[]>(users_list);
    usersList$ = this.usersListSubject.asObservable();

    constructor() {
        const departments = localStorage.getItem('taskmanager_departments');

        if (departments) {
            this.departmentListSubject.next(JSON.parse(departments));
        }

        const users = localStorage.getItem('taskmanager_users');

        if (users) {
            this.usersListSubject.next(JSON.parse(users));
        }
    }

    /**
     * 
     * @param id - id of the department
     * @returns department that matches the id
     */
    getDepartmentById(id: number) {
        const department = this.departmentListSubject.value.find(department => department.id === id);
        return department;
    }

    /**
     * 
     * @param id - id of the department
     * @returns users of the department
     */
    getUsersFromDepartment(id: number) {
        const users = this.usersListSubject.value.filter(user => user.department === id);
        return users;
    }
}