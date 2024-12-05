import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {Department} from "./departments/department.model";
import { department_list } from "./departments/departments.list";

@Injectable({providedIn: 'root'})

export class sharedDataService {
    department_list = department_list;

    private departmentListSubject = new BehaviorSubject<Department []>(department_list);
    departmentList$ = this.departmentListSubject.asObservable();

    constructor() {
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
}