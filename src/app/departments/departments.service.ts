import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Department } from "./department.model";
import { department_list } from "./departments.list";
import { sharedDataService } from "../sharedData.service";
import { User } from "../users/user.model";

@Injectable({ providedIn: 'root' })

export class DepartmentsService {
    department_list = department_list;

    private departmentListSubject = new BehaviorSubject<Department[]>(department_list);
    departmentList$ = this.departmentListSubject.asObservable();

    private currentDepartmentSubject = new BehaviorSubject<Department | undefined>(undefined);
    currentDepartment$ = this.currentDepartmentSubject.asObservable();

    private currentDepartmentUsersSubject = new BehaviorSubject<User[] | undefined>(undefined);
    currentDepartmentUsers$ = this.currentDepartmentUsersSubject.asObservable();

    constructor(private sharedDataService: sharedDataService) {
        const departments = localStorage.getItem('taskmanager_departments');

        if (departments) {
            this.departmentListSubject.next(JSON.parse(departments));
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
   * @returns sets current department to display in department detail component
   */
    setDepartmentToView(id: number) {
        const department = this.getDepartmentById(id);
        this.currentDepartmentSubject.next(department);

        if (department !== undefined) {
            const users = this.sharedDataService.getUsersFromDepartment(id);
            this.currentDepartmentUsersSubject.next(users);
        }
    }

    /**
     * 
     * @param name - name of the new department
     * 
     * retreives the departments from local storage, adds one,
     * and saves the new list to local storage
     * 
     */
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

    /**
     * 
     * @param departmentList 
     * 
     * replaces current list of departments in local storage with new one
     */
    saveDepartmentsToLocalStorage(departmentList: Department[]) {
        localStorage.setItem('taskmanager_departments', JSON.stringify(departmentList));
    }
}