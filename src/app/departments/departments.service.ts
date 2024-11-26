import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Department } from "./department.model";
import { department_list } from "./departments.list";
import { User } from "../users/user.model";
import { users_list } from "../users/users.list";
import { UsersService } from "../users/users.service";

@Injectable({providedIn: 'root'})

export class DepartmentsService {
    department_list = department_list;

    private departmentListSubject = new BehaviorSubject<Department[]>(department_list);
    departmentList$ = this.departmentListSubject.asObservable();

    private currentDepartmentToViewSubject = new BehaviorSubject<Department | undefined>(undefined);
    currentDepartmentToView$ = this.currentDepartmentToViewSubject.asObservable();

    private currentDepartmentToViewUsersSubject = new BehaviorSubject<User[] | undefined>(undefined);
    currentDepartmentToViewUsers$ = this.currentDepartmentToViewUsersSubject.asObservable();

    // usersList$: Observable<User[]>;

    constructor(private usersService: UsersService) {
        const departments = localStorage.getItem('taskmanager_departments');

        if (departments) {
            this.departmentListSubject.next(JSON.parse(departments));
        }

        // this.usersList$ = this.usersService.usersList$;
        // console.log(this.usersList$);
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
     */
    setDepartmentToView(id: number) {
        const department = this.getDepartmentById(id);
        this.currentDepartmentToViewSubject.next(department);

        if (department !== undefined) {
            // const users = this.getDepartmentUsers(id);
        }
    }

    // getDepartmentUsers(id: number) {
    //     return this.usersList$.find(user => user.department === id);
    // }

    createNewDepartment(name: string) {
        const departmentId = Math.max(...this.departmentListSubject.value.map(department => department.id)) + 1;
        
        const newDepartment: Department = {
            id: departmentId,
            name: name
        };

        const updatedDepartmentList = [...this.departmentListSubject.value, newDepartment];
        this.departmentListSubject.next(updatedDepartmentList);

        this.saveDepartmentsToLocalStorage(updatedDepartmentList);
    }

    saveDepartmentsToLocalStorage(departmentList: Department[]) {
        localStorage.setItem('taskmanager_departments', JSON.stringify(departmentList));
    }
}